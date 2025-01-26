import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
    const [user, setUser] = useState<any>(null);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editedValue, setEditedValue] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    const handleEditClick = (field: string, value: string) => {
        setEditingField(field);
        setEditedValue(value);
    };

    const handleSaveClick = (field: string) => {
        if (user) {
            const updatedUser = { ...user, [field]: editedValue };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setEditingField(null);
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center mb-6">Account Information</h1>

                <div className="space-y-6">
                    {[
                        { label: "Email", field: "email" },
                        { label: "School", field: "school" },
                        { label: "Major", field: "major" },
                        { label: "Year of Study", field: "yearOfStudy" }
                    ].map(({ label, field }) => (
                        <div key={field} className="flex justify-between items-center border-b pb-3">
                            <p className="font-medium text-lg">{label}:</p>
                            {editingField === field ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={editedValue}
                                        onChange={(e) => setEditedValue(e.target.value)}
                                        className="border rounded-lg p-2 w-48"
                                    />
                                    <button
                                        onClick={() => handleSaveClick(field)}
                                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <p className="text-gray-700">{user[field]}</p>
                                    <button
                                        onClick={() => handleEditClick(field, user[field])}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="border-b pb-3">
                        <p className="font-medium text-lg mb-2">Interests:</p>
                        <div className="flex flex-wrap gap-2">
                            {user.interests.map((interest: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-1 rounded-full text-white bg-blue-500 text-sm"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}