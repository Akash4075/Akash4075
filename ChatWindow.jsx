import React from "react";

function ChatWindow() {
  return (
    <section style={{ flex: 1, background: "#f8faff", minHeight: "100vh", padding: "60px 0", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
      <div style={{
        width: "550px",
        background: "#fff",
        borderRadius: "18px",
        minHeight: "320px",
        boxShadow: "0 2px 18px rgba(60,72,101,0.07)",
        padding: "32px 28px"
      }}>
        <div style={{ marginBottom: "20px" }}>
          <span style={{ color: "#374eee", fontWeight: "600" }}>🤖 Welcome! Ask anything...</span>
        </div>
        <div style={{
          position: "fixed",
          left: "50%",
          bottom: "40px",
          transform: "translateX(-50%)",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(90,110,170,0.09)",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          width: "370px"
        }}>
          <input
            placeholder="Ask anything..."
            style={{ flex: 1, padding: "12px", borderRadius: "6px", border: "1px solid #ccd5e6", fontSize: "15px", marginRight: "12px" }}
          />
          <button style={{
            background: "#374eee",
            border: "none",
            borderRadius: "8px",
            padding: "7px 18px",
            color: "#fff",
            fontWeight: 700,
            fontSize: "18px",
            cursor: "pointer"
          }}>Send</button>
        </div>
      </div>
    </section>
  );
}

export default ChatWindow;
