import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import SettingsModal from "./components/SettingsModal";
import Login from "./components/Login";
import "./App.css";

const accentColors = {
  default: "#10A37F",
  blue: "#3B82F6",
  green: "#22C55E",
  red: "#EF4444",
  purple: "#8B5CF6",
};

function App() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selected, setSelected] = useState("new-chat");

  const [theme, setTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState("default");
  const [language, setLanguage] = useState("en");

  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ Apply theme + accent
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty(
      "--accent-color",
      accentColors[accentColor]
    );
  }, [theme, accentColor]);

  // ✅ Auto-create "Chat 1" when user logs in
  useEffect(() => {
    if (user && chats.length === 0) {
      const id = Date.now().toString();
      const firstChat = { id, title: "Chat 1", messages: [] };
      setChats([firstChat]);
      setActiveChatId(id);
      setSelected("Chat 1");
    }
  }, [user, chats.length]);

  // ✅ Auto-select first chat after creation
  useEffect(() => {
    if (chats.length > 0 && selected === "new-chat") {
      setSelected(chats[0].title);
      setActiveChatId(chats[0].id);
    }
  }, [chats, selected]);

  const handleNavigate = (item) => {
    if (item === "settings") {
      setSettingsOpen(true);
      return;
    }
    setSelected(item);
    if (item === "new-chat") {
      const id = Date.now().toString();
      setChats([
        ...chats,
        { id, title: `Chat ${chats.length + 1}`, messages: [] },
      ]);
      setActiveChatId(id);
    } else {
      const chat = chats.find((c) => c.title === item);
      if (chat) setActiveChatId(chat.id);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: user ? user.name : "Guest", text };
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );

    try {
      const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, language }),
      });
      const data = await res.json();

      const botReply = {
        sender: "Bot",
        text: data.botReply || "Sorry, no response",
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, botReply] }
            : chat
        )
      );
    } catch (error) {
      console.error("Error calling backend:", error);
    }
  };

  const handleDeleteChat = (title) => {
    setChats((prev) => {
      const filtered = prev.filter((chat) => chat.title !== title);
      if (activeChatId === prev.find((c) => c.title === title)?.id) {
        setActiveChatId(filtered.length ? filtered[0].id : null);
      }
      return filtered;
    });
  };

  // ✅ Delete ALL chats
  const handleDeleteAllChats = () => {
    setChats([]);
    setActiveChatId(null);
    setSelected("new-chat");
  };

  // ✅ Delete Account (clear everything and go back to login)
  const handleDeleteAccount = () => {
    setUser(null);
    localStorage.removeItem("user");
    setChats([]);
    setActiveChatId(null);
    setSelected("new-chat");
  };

  // ✅ Login + Logout
  const handleLogin = (username) => {
    const newUser = {
      initials: username[0].toUpperCase(),
      name: username,
      plan: "Free",
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setChats([]);
    setActiveChatId(null);
    setSelected("new-chat");
  };

  const chatHistory = chats.map((c) => c.title);
  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages ?? [];

  return (
    <div style={{ height: "100vh" }}>
      {user ? (
        <div
          style={{
            display: "flex",
            height: "100vh",
            backgroundColor: theme === "light" ? "#f5f5f5" : "#121212",
            color: theme === "light" ? "#222" : "#eee",
          }}
        >
          <Sidebar
            onNavigate={handleNavigate}
            onDeleteChat={handleDeleteChat}
            selected={selected}
            chatHistory={chatHistory}
            user={user}
            accentColor={accentColors[accentColor]}
            theme={theme}
            onLogout={handleLogout}
          />
          <main
            style={{
              marginLeft: 300,
              flexGrow: 1,
              minHeight: "100vh",
              backgroundColor: theme === "light" ? "#fff" : "#1e1e1e",
              color: theme === "light" ? "#222" : "#eee",
              overflowY: "auto",
            }}
          >
            <ChatArea
              messages={messages}
              onSendMessage={handleSendMessage}
              theme={theme}
              accentColor={accentColors[accentColor]}
            />
            {settingsOpen && (
              <SettingsModal
                onClose={() => setSettingsOpen(false)}
                theme={theme}
                setTheme={setTheme}
                accentColor={accentColor}
                setAccentColor={setAccentColor}
                language={language}
                setLanguage={setLanguage}
                user={user}
                onDeleteAllChats={handleDeleteAllChats}
                onDeleteAccount={handleDeleteAccount} // ✅ hooked here
              />
            )}
          </main>
        </div>
      ) : (
        <Login
          onLogin={handleLogin}
          onSkip={() =>
            setUser({ name: "Guest", initials: "G", plan: "Free" })
          }
        />
      )}
    </div>
  );
}

export default App;
