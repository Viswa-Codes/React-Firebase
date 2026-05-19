import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "../firebase";
//iMPLEMENT SIGIN WITH GOOGLE
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const FirebaseContext = createContext(null);

export function FirebaseProvider({ children }) {
	const [user, setUser] = useState(null);
	const [authLoading, setAuthLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setAuthLoading(false);
		});

		return unsubscribe;
	}, []);

	const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
	const signin = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

	const logout = () => signOut(auth);

	const value = useMemo(
		() => ({
			user,
			authLoading,
			signup,
			signin,
			logout,
            signInWithGoogle,
		}),
		[user, authLoading]
	);

	return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}

export function useFirebase() {
	const context = useContext(FirebaseContext);

	if (!context) {
		throw new Error("useFirebase must be used inside FirebaseProvider");
	}

	return context;
}
