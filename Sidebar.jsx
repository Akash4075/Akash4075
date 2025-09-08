import React, { useState } from "react";

function Sidebar({
  onNavigate,
  selected,
  chatHistory,
  user,
  onDeleteChat,
  theme,
  accentColor,
  onLogout,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const menu = [
    { id: "new-chat", label: "New chat", icon: "➕" },
    { id: "search-chats", label: "Search chats", icon: "🔍" },
    { id: "library", label: "Library", icon: "📚" },
    { id: "sora", label: "Sora", icon: "🎬" },
    { id: "gpts", label: "GPTs", icon: "🪄" },
    { id: "imggen", label: "image generator", icon: "🖼️" },
  ];

  const filteredChats = chatHistory.filter((chat) =>
    chat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside
      style={{
        width: "300px",
        height: "100vh",
        background: theme === "dark" ? "#111" : "#fff",
        color: theme === "dark" ? "#eee" : "#222",
        borderRight: theme === "dark" ? "1px solid #222" : "1px solid #eee",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 99,
        justifyContent: "space-between", // Push footer to bottom
      }}
    >
      <div>
        <div
          style={{
            padding: "22px 18px 10px 22px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              background: accentColor,
              color: "#fff",
              fontWeight: "800",
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 21,
            }}
          >
            AI
          </span>
          <span style={{ fontWeight: 700, fontSize: "1.3rem", color: accentColor }}>
            ChatGPT
          </span>
        </div>

        <nav style={{ marginBottom: 12 }}>
          {menu.map((item) => {
            // Special styling for 'New chat' when selected and dark theme
            const isSelected = selected === item.id;
            let backgroundColor = "transparent";
            let color = theme === "dark" ? "#eee" : "#222";

            if (isSelected) {
              backgroundColor = theme === "dark" ? "#444" : "#eaf0f9";
              color = theme === "dark" && item.id === "new-chat" ? "#fff" : color;
            }

            if (!isSelected && item.id === "new-chat" && theme === "dark") {
              // Make "New chat" button readable in dark mode even when not selected
              color = "#bbb";
            }

            return (
              <button
                key={item.id}
                style={{
                  background: backgroundColor,
                  border: "none",
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 22px",
                  fontSize: 17,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  cursor: "pointer",
                  color: color,
                }}
                onClick={() => onNavigate(item.id)}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "0 22px 10px" }}>
          <input
            type="text"
            placeholder="Search chats"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 15,
              background: theme === "dark" ? "#222" : "#fff",
              color: theme === "dark" ? "#eee" : "#222",
            }}
          />
        </div>

        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            padding: "0 16px",
          }}
        >
          <div
            style={{
              marginBottom: 5,
              fontWeight: 700,
              fontSize: 15,
              color: theme === "dark" ? "#999" : "#666",
            }}
          >
            Chats
          </div>
          {filteredChats.map((chat) => (
            <div
              key={chat}
              style={{
                marginBottom: 5,
                padding: "8px 10px",
                borderRadius: 8,
                cursor: "pointer",
                backgroundColor:
                  selected === chat
                    ? theme === "dark"
                      ? "#333"
                      : "#eaf0f9"
                    : "transparent",
                color: theme === "dark" ? "#eee" : "#111",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  fontSize: 16,
                  textAlign: "left",
                  cursor: "pointer",
                  flexGrow: 1,
                  color: "inherit",
                }}
                onClick={() => onNavigate(chat)}
              >
                {chat}
              </button>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#f44336",
                  fontSize: 18,
                  cursor: "pointer",
                  marginLeft: 5,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete chat "${chat}"?`)) {
                    onDeleteChat(chat);
                  }
                }}
                title="Delete chat"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* User Info and Settings Button Footer */}
      <div
        style={{
          padding: 15,
          borderTop: theme === "dark" ? "1px solid #333" : "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme === "dark" ? "#111" : "#fff",
          position: "relative",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <div
            style={{
              background: accentColor,
              color: "#fff",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {user.initials}
          </div>
          <div style={{ color: theme === "dark" ? "#eee" : "#222" }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: theme === "dark" ? "#ccc" : "#555" }}>
              {user.plan}
            </div>
          </div>
        </div>

        {/* Settings Button */}
        <button
          onClick={() => onNavigate("settings")}
          style={{
            background: "transparent",
            border: "none",
            color: theme === "dark" ? "#aaa" : "#444",
            fontSize: 22,
            cursor: "pointer",
            marginLeft: 3,
            padding: 4,
          }}
          title="Settings"
        >
          ⚙
        </button>

        {/* Logout Dropdown */}
        {profileOpen && (
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              left: "15px",
              background: theme === "dark" ? "#222" : "#fff",
              border: theme === "dark" ? "1px solid #444" : "1px solid #ddd",
              borderRadius: 6,
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              zIndex: 999,
              minWidth: 140,
            }}
          >
            <button
              onClick={onLogout}
              style={{
                background: "transparent",
                border: "none",
                color: "red",
                padding: "10px 14px",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
