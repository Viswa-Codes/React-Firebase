import { useState } from "react";
import { useFirebase } from "../context/Firebase";

export default function Signin() {
	const { signin, signInWithGoogle } = useFirebase();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const onChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await signin(formData.email, formData.password);
            // alert("Sign in successful!");
		} catch (err) {
			setError(err.message || "Sign in failed");
		} finally {
			setLoading(false);
		}
	};

	return (
            <>
				<h1 className="text-2xl font-semibold mb-6 text-center">Sign In</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						id="email"
						type="email"
						placeholder="Email"
						className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
						value={formData.email}
						onChange={onChange}
						required
					/>

					<input
						id="password"
						type="password"
						placeholder="Password"
						className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
						value={formData.password}
						onChange={onChange}
						required
					/>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
					>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>

				{error && <p className="text-red-600 text-sm mt-4">{error}</p>}
				<button
					onClick={signInWithGoogle}
					className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mt-4"
				>
					Sign in with Google
				</button>
		    </>
	);
}