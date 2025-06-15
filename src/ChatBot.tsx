import React, { useState } from "react";
import Header from "./Header";

export default function ChatWithMia() {
  const [messages, setMessages] = useState([
    { sender: "mia", text: "Hallo! Ich bin Mia. Wie kann ich dir helfen?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "mia", text: "Das ist interessant! Ich helfe dir gerne weiter." },
      ]);
    }, 500);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <Header />

      <main className="flex-grow p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xs px-4 py-2 rounded-lg text-white ${
                msg.sender === "mia"
                  ? "bg-purple-700 self-start"
                  : "bg-purple-300 text-black self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Nachricht an Mia..."
            className="flex-1 border border-purple-300 rounded-md px-4 py-2 mr-2"
          />
          <button
            onClick={handleSend}
            className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800"
          >
            Senden
          </button>
        </div>
      </main>
    </div>
  );
}
