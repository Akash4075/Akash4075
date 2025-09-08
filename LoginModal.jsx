// src/components/LoginModal.jsx
import React, { useState } from "react";

export default function LoginModal({ onLogin, onSignup, onSkip }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold mb-4">Welcome back</h2>
        <p className="mb-6 text-gray-600">
          Log in or sign up to get smarter responses, upload files and images, and more.
        </p>

        <button
          className="w-full bg-black text-white py-2 rounded-xl mb-3 hover:bg-gray-800"
          onClick={() => onLogin(email, password)}
        >
          Log in
        </button>

        <button
          className="w-full border border-gray-400 py-2 rounded-xl mb-3 hover:bg-gray-100"
          onClick={onSignup}
        >
          Sign up for free
        </button>

        <button
          className="text-sm text-gray-500 hover:underline"
          onClick={onSkip}
        >
          Stay logged out
        </button>
      </div>
    </div>
  );
}
