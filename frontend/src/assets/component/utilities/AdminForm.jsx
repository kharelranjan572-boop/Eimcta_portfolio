import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const Admin_Form = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const UN = "Portfolio_=Eimcta*"
    const handlenavigate = () => {
        navigate('/')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === UN) {
            navigate('/Adminfeature'); 
        } else {
            alert("Incorrect password"); 
        }
    };




    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white
          w-[380px]
          rounded-2xl
          shadow-[0_20px_50px_rgba(0,0,0,0.25)]
          p-8
          animate-[fadeScale_0.4s_ease-out]
        "
                style={{
                    fontFamily: "Arial Narrow, Arial, sans-serif",
                }}
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                        <span className="text-2xl text-amber-600">🔐</span>
                    </div>
                    <h2 className="text-2xl font-bold text-amber-600">
                        Admin Login
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Restricted access area
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-amber-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="
                w-full
                px-4 py-2.5
                rounded-lg
                border border-gray-300
                focus:outline-none
                focus:border-amber-500
                focus:ring-2
                focus:ring-amber-200
                transition
              "
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="
              w-full
              bg-amber-500
              hover:bg-amber-600
              text-white
              py-2.5
              rounded-lg
              font-semibold
              transition
              shadow-md
            "
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer */}
                <button
                    onClick={handlenavigate}
                    className="mt-5 block mx-auto text-sm text-gray-500 hover:text-amber-600 transition"
                >
                    Cancel
                </button>
            </div>

            {/* Inline animation */}
            <style>
                {`
          @keyframes fadeScale {
            from {
              opacity: 0;
              transform: scale(0.92);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
            </style>
        </div>
    );
};

export default Admin_Form;
