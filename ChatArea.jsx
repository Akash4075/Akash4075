import React, { useState, useRef, useEffect } from "react";

function ChatArea({ messages, onSendMessage, theme }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const empty = messages.length === 0;

  return (
    <div
      style={{
        flexGrow: 1,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: theme === "dark" ? "#121212" : "#fff",
        padding: "0 48px",
        boxSizing: "border-box",
        minWidth: 0,
      }}
    >
      {empty ? (
        <div style={{ width: "100%", padding: "56px 0 24px 0" }}>
          <h1
            style={{
              fontSize: "2.6rem",
              fontWeight: 600,
              color: theme === "dark" ? "#eee" : "#222",
              textAlign: "left",
              margin: 0,
            }}
          >
            What's on your mind?
          </h1>
        </div>
      ) : (
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            width: "100%",
            paddingTop: 32,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {messages.map((msg, idx) => {
            const isUser = msg.sender !== "Bot"; // assuming bot is AI replies
            return (
              <div
                key={idx}
                style={{
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  background: isUser ? "#e3f2fd" : "#f2f2f2",
                  color: "#222",
                  padding: "16px 30px",
                  borderRadius: "14px",
                  fontSize: 18,
                  maxWidth: "60vw",
                  boxShadow: "0 1px 6px rgba(100,120,180,0.09)",
                }}
              >
                {msg.text}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div
        style={{
          width: "100%",
          padding: "16px 0",
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: theme === "dark" ? "#181818" : "#f7f7fa",
          borderRadius: 30,
          boxShadow:
            theme === "dark"
              ? "0 2px 12px rgba(20,20,20,0.7)"
              : "0 2px 12px rgba(90,110,170,0.07)",
        }}
      >
        <span style={{ fontSize: 24, color: theme === "dark" ? "#eee" : "#333" }}>＋</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          style={{
            flexGrow: 1,
            border: "none",
            outline: "none",
            fontSize: 18,
            background: "transparent",
            color: theme === "dark" ? "#eee" : "#222",
            padding: "8px 4px",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            border: "none",
            background: "#374eee",
            borderRadius: "50%",
            padding: 10,
            cursor: "pointer",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          📶
        </button>
      </div>
    </div>
  );
}

export default ChatArea;
