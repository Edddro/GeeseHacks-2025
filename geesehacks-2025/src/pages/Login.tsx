import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate("/account");
        }
    }, [loggedIn, navigate]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@uwaterloo\.ca$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let errors: string[] = [];

        if (!validateEmail(email)) {
            errors.push("email");
            setEmailError("Please enter a valid email address ending with @uwaterloo.ca");
        } else {
            setEmailError("");
        }

        if (!password) errors.push("password");

        setFormErrors(errors);

        if (errors.length === 0) {
            // Proceed with form submission
            setLoggedIn(true);
        }
    };

    return (
        <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-md">
                <button
                    className="mb-6 flex items-center"
                    onClick={() => window.location.href = "/signup"}
                >
                    <ArrowLeft className="h-6 w-6 mr-2" />
                    Proceed to Sign Up
                </button>

                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img src="./assets/logo.png" alt="Logo" className="h-12 w-24" />
                    </div>
                    <h1 className="text-2xl font-semibold">Log In</h1>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="example@uwaterloo.ca"
                            className={`w-full p-2 border rounded ${formErrors.includes("email") ? "border-red-500" : ""}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className={`w-full p-2 border rounded ${formErrors.includes("password") ? "border-red-500" : ""}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-200 hover:bg-blue-300 h-11">
                        Log In
                    </button>
                    {formErrors.length > 0 && (
                        <p className="text-red-500 text-sm mt-2">{formErrors.length} required fields still remaining</p>
                    )}
                </form>
            </div>
        </div>
    );
}
