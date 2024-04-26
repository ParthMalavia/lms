import React, { useState, useEffect, useContext } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	Checkbox,
	Container,
	FormControlLabel,
	TextField,
	Typography,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";
import { loginlogo } from "../assets/images";
import { checkBoxChecked } from "../assets/images";
import { checkBox } from "../assets/images";
import Header from "../components/header";
import { useNavigate } from 'react-router-dom';
import AuthContext, {ContextType} from "../context/AuthContext";
function CheckboxDefault() {
	return <img src={checkBox} alt="checkbox" />;
}
function CheckboxChecked() {
	return <img src={checkBoxChecked} alt="checkbox" />;
}

interface User {
	username: string;
	password: string;
}

interface DecodedToken {
	useremail: string;
	userrole: string;
	userid: number;
	// Add more properties if necessary
}

const Login: React.FC = () => {
	const [user, setUser] = useState<User>({ username: "", password: "" });
	const [error, setError] = useState<string>("");

	const { handleLogin, token, setToken }: ContextType = useContext(AuthContext) as ContextType;
	// ? - for navigation to another page
	const navigate = useNavigate();
	useEffect(() => {
		// Check if token exists in local storage (assuming it's saved securely after login)
		const savedToken = localStorage.getItem("token");
		if (savedToken) {
			setToken(savedToken);
			// Optionally, you can redirect the user to a dashboard or home page
			navigate('dashboard');
		}
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	// NOTE: If you are using AI to generate code, Atlease take a look at the code
	// If it is not being used, remove it
	const sendAuthenticatedRequest = async () => {
		try {
			const response = await fetch("your-api-endpoint/data", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`, // Include token in request headers
				},
			});

			if (response.ok) {
				// Handle successful response
				const data = await response.json();
				console.log("Data:", data);
			} else {
				// Handle unauthorized or other errors
				console.error("Error:", response.statusText);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<>
			<Helmet>
				<title>Login | Go-Canvas</title>
			</Helmet>
			<Header></Header>
			<section className="login-wrapper">
				<Card>
					<CardContent>
						<Box mt={5}>
							<Box>
								{error && (
									<Typography variant="body1" color="error">
										{error}
									</Typography>
								)}
								<div className="login-banner">
									<div className="sign-up">
										<h6>Welcome Back !</h6>
										<p>Please Log In to continue</p>
									</div>
									<div className="login-logo">
										<img src={loginlogo} alt="company" />
									</div>
								</div>
								<form
									className="login-form"
									onSubmit={(e) => {
										e.preventDefault();
										handleLogin(user.username, user.password)
											.catch((err: Error) => setError(err.toString()));
									}}
								>
									<TextField
										fullWidth
										label="Username"
										name="username"
										value={user.username}
										onChange={handleInputChange}
										margin="normal"
										variant="standard"
									/>
									<TextField
										fullWidth
										label="Password"
										type="password"
										name="password"
										value={user.password}
										onChange={handleInputChange}
										margin="normal"
										variant="standard"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checkedIcon={<CheckboxChecked />}
												icon={<CheckboxDefault />}
											/>
										}
										label="Keep me signed in"
									/>
									<Button
										variant="contained"
										type="submit"
										className="btn-primary"
									>
										Login
									</Button>
									<div style={{ textAlign: "center" }}>
										<a href="#" className="forgot">
											Forgot your password?
										</a>
									</div>
								</form>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</section>
		</>
	);
};

export default Login;
