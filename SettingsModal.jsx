import React, { useState } from "react";

function SettingsModal({
  onClose,
  theme,
  setTheme,
  accentColor,
  setAccentColor,
  language,
  setLanguage,
  user,                 // from App.jsx
  onDeleteAllChats,     // ✅ clears chats
  onDeleteAccount,      // ✅ new prop
}) {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: theme === "dark" ? "#181818" : "#fff",
          color: theme === "dark" ? "#f0f0f0" : "#222",
          borderRadius: 20,
          padding: 32,
          width: 400,
          minWidth: 340,
          boxShadow:
            theme === "dark"
              ? "0 0 18px #111"
              : "0 0 12px rgba(0,0,0,0.10)",
          transition: "background 0.2s, color 0.2s",
        }}
      >
        {/* Tabs */}
        <div style={{ display: "flex", marginBottom: 22 }}>
          {["General", "Profile", "About"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "10px 0",
                background: activeTab === tab ? "#ececec" : "transparent",
                color: activeTab === tab ? "#222" : "#555",
                fontWeight: 600,
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                marginRight: tab !== "About" ? 6 : 0,
                transition: "background 0.3s, color 0.3s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* General Settings */}
        {activeTab === "General" && (
          <>
            <label style={{ display: "block", marginBottom: 14 }}>
              Theme:
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{ marginLeft: 10, padding: 5, fontSize: 16 }}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </label>

            <label style={{ display: "block", marginBottom: 14 }}>
              Accent Color:
              <select
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                style={{ marginLeft: 10, padding: 5, fontSize: 16 }}
              >
                <option value="default">Default</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="red">Red</option>
              </select>
            </label>

            <label style={{ display: "block" }}>
              Language:
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ marginLeft: 10, padding: 5, fontSize: 16 }}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="kn">Kannada</option>
              </select>
            </label>
          </>
        )}

        {/* Profile */}
        {activeTab === "Profile" && (
          <>
            <div style={{ marginBottom: 18, fontWeight: 600, fontSize: 18 }}>
              Profile
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Name:</strong> {user?.name || "Unknown"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Initials:</strong> {user?.initials || "-"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Email:</strong> {user?.email || "Not Provided"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Plan:</strong> {user?.plan || "Free"}
            </div>

            {/* Actions */}
            <button
              style={{
                padding: "10px 24px",
                borderRadius: 7,
                fontSize: 15,
                background: "#374eee",
                color: "#fff",
                border: "none",
                marginTop: 12,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Export Data
            </button>

            <button
              onClick={onDeleteAllChats} // ✅ delete all chats
              style={{
                padding: "10px 24px",
                borderRadius: 7,
                fontSize: 15,
                background: "#f44336",
                color: "#fff",
                border: "none",
                marginTop: 12,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Delete All Chats
            </button>

            <button
              onClick={onDeleteAccount} // ✅ now wired
              style={{
                padding: "10px 24px",
                borderRadius: 7,
                fontSize: 15,
                background: "#f44336",
                color: "#fff",
                border: "none",
                marginTop: 12,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Delete Account
            </button>
          </>
        )}

        {/* About */}
        {activeTab === "About" && (
          <div>
            <h3>About</h3>
            <p>This is your AI chat platform inspired by DeepSeek-style UI.</p>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            marginTop: 24,
            padding: "10px 25px",
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            backgroundColor: "#374eee",
            color: "#fff",
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
