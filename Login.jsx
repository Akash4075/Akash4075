import React, { useState } from "react";

function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #f9fafb, #eef1f5)"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px 50px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "350px"
        }}
      >
        {/* Logo */}
        <div
          style={{
            background: "#10A37F",
            color: "#fff",
            fontWeight: "bold",
            width: 60,
            height: 60,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 26,
            margin: "0 auto 20px"
          }}
        >
          AI
        </div>

        {/* Title */}
        <h2
          style={{
            marginBottom: 20,
            fontSize: "1.6rem",
            fontWeight: "700",
            color: "#111"
          }}
        >
          Welcome to ChatGPT
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 14px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "15px",
              outline: "none"
            }}
          />
          <button
            type="submit"
            style={{
              background: "#10A37F",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.2s ease"
            }}
            onMouseOver={(e) => (e.target.style.background = "#0d8467")}
            onMouseOut={(e) => (e.target.style.background = "#10A37F")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
