import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
    const interests = ["Food", "Music", "Art", "Game", "Workout", "Pets", "Walk", "Coffee", "Others"];
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [school, setSchool] = useState("");
    const [major, setMajor] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("Goosling");
    const [yearOfStudy, setYearOfStudy] = useState("1");
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@uwaterloo\.ca$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let errors: string[] = [];

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address ending with @uwaterloo.ca");
            errors.push("email");
        } else {
            setEmailError("");
        }

        if (!password) errors.push("password");
        if (!name) errors.push("name");
        if (!school) errors.push("school");
        if (!major) errors.push("major");
        if (!yearOfStudy) errors.push("yearOfStudy");

        setFormErrors(errors);

        if (errors.length === 0) {
            // Save user data to localStorage and navigate to account page
            const userData = {
                email,
                major,
                school,
                interests: selectedInterests,
                yearOfStudy,
            };
            localStorage.setItem("user", JSON.stringify(userData));

            // Navigate to account page with state
            navigate("/account");
        }
    };

    return (
        <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-md">
                <button
                    className="mb-6 flex items-center"
                    onClick={() => window.location.href = "/login"}
                >
                    <ArrowLeft className="h-6 w-6 mr-2" />
                    Proceed to Log In
                </button>

                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img src="./assets/logo.png" alt="Logo" className="h-12 w-24" />
                    </div>
                    <h1 className="text-2xl font-semibold">Finish Signing Up</h1>
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

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className={`w-full p-2 border rounded ${formErrors.includes("name") ? "border-red-500" : ""}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="school" className="block text-sm font-medium mb-1">
                            School
                        </label>
                        <input
                            id="school"
                            type="text"
                            className={`w-full p-2 border rounded ${formErrors.includes("school") ? "border-red-500" : ""}`}
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="major" className="block text-sm font-medium mb-1">
                            Major
                        </label>
                        <input
                            id="major"
                            type="text"
                            className={`w-full p-2 border rounded ${formErrors.includes("major") ? "border-red-500" : ""}`}
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="year" className="block text-sm font-medium mb-1">
                            Year of Study
                        </label>
                        <select
                            id="year"
                            className={`w-full p-2 border rounded ${formErrors.includes("yearOfStudy") ? "border-red-500" : ""}`}
                            value={yearOfStudy}
                            onChange={(e) => setYearOfStudy(e.target.value)}
                        >
                            <option value="1">First Year</option>
                            <option value="2">Second Year</option>
                            <option value="3">Third Year</option>
                            <option value="4">Fourth Year</option>
                            <option value="5">Fifth Year</option>
                            <option value="6">Graduate Student</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Choose your interests</label>
                        <div className="flex flex-wrap gap-2">
                            {interests.map((interest) => (
                                <button
                                    key={interest}
                                    type="button"
                                    onClick={() => {
                                        setSelectedInterests((prev) =>
                                            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
                                        );
                                    }}
                                    className={`px-4 py-1.5 rounded-full bg-gray-100 text-sm hover:bg-gray-200 transition-colors ${
                                        selectedInterests.includes(interest) ? "bg-red-200" : ""
                                    }`}
                                >
                                    {interest}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-200 hover:bg-blue-300 h-11">
                        Sign up!
                    </button>

                    {formErrors.length > 0 && (
                        <p className="text-red-500 text-sm mt-2">
                            {formErrors.length} required fields still remaining
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
