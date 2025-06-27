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
        {
          sender: "mia",
          text: "Das ist interessant! Ich helfe dir gerne weiter.",
        },
      ]);
    }, 500);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col">
        {/* Nachrichtenbereich */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-3xl">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-md px-6 py-4 rounded-2xl ${
                msg.sender === "mia"
                  ? "bg-[#573A6F] text-white self-start"
                  : "bg-purple-300 text-black self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Sticky Eingabefeld */}
        <div className="sticky bottom-0 bg-purple-50 p-4 border-t border-purple-200">
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Nachricht an Mia..."
              className="flex-1 border border-purple-300 rounded-md px-6 py-4 text-3xl mr-4"
            />
            <button
              onClick={handleSend}
              className="bg-[#573A6F] text-white text-3xl px-6 py-4 rounded-md hover:bg-purple-800"
            >
              Senden
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
