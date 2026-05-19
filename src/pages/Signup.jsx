import { useState } from "react";
import { useFirebase } from "../context/Firebase";

function Signup() {
	const { signup } = useFirebase();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSignup = async (e) => {
		e.preventDefault();
		setMessage("");
		setLoading(true);

		try {
			await signup(email, password);
			setMessage("Signup successful");
			setEmail("");
			setPassword("");
			alert("Signup successful");
		} catch (error) {
			setMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2>Signup Page</h2>
			<form onSubmit={handleSignup}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit" disabled={loading}>
					{loading ? "Creating account..." : "Sign Up"}
				</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}

export default Signup;

