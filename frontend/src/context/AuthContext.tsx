import React, { useState, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
export type ContextType = {
	handleLogin: (username: string, password: string) => Promise<void>;
	handleLogout: () => void;
	token: string | null;
	setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthContext = createContext<ContextType | null>(null);
export default AuthContext;

interface DecodedToken {
	useremail: string;
	userrole: string;
	userid: number;
	// Add more properties if necessary
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [token, setToken] = useState<string | null>(null);

	const navigate = useNavigate();

	const handleLogin = async (username: string, password: string) => {
		try {
			// Construct request body
			const requestBody = new URLSearchParams();
			requestBody.append('grant_type', 'password');
			requestBody.append('username', username);
			requestBody.append('password', password);
			// requestBody.append('scope', '');
			// requestBody.append('client_id', 'string');
			// requestBody.append('client_secret', 'string');

			// Make API request
			const response = await fetch("http://127.0.0.1:8000/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: requestBody,
			});
			const data = await response.json();

			// Handle response
			if (response.ok) {
				const token = data.access_token; // Assuming your API returns an access token
				const payload: DecodedToken = jwtDecode(token);
				localStorage.setItem("token", token); // Save token securely in local storage

				// Assuming you have a function to determine user role based on the token
				const userRole = payload.userrole;

				// Based on user role, redirect to appropriate page
				if (userRole === "Faculty") {
					navigate("/faculty_dashboard");
				} else if (userRole === "Student") {
					navigate("/dashboard");
				} else if (userRole === "Admin") {
					navigate("/admin_dashboard");
				} else {
					// Handle unknown or unauthorized roles
					throw "Unknown user role";
				}
			} else {
				throw data.detail || "An error occurred during login.";
			};
		} catch (error) {
			console.error("Error:", error);
			throw ("An error occurred during login. Please try again later.");
		}
	}
	
	const handleLogout = () => {
		// Clear token from local storage and reset state
		localStorage.removeItem("token");
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ handleLogin, handleLogout, token, setToken }}>
			{children}
		</AuthContext.Provider>	
	)
}
