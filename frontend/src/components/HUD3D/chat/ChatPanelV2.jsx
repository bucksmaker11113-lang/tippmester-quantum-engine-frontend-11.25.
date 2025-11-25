import React, { useEffect, useRef, useState } from "react";
import "./chatpanelv2.css";

export default function ChatPanelV2() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const ws = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws/chat");

    ws.current.onmessage = (event) => {
      const msg = event.data;
      setMessages((prev) => [...prev, { sender: "other", text: msg }]);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (text.trim() === "") return;

    ws.current.send(text);
    setMessages((prev) => [...prev, { sender: "me", text }]);
    setText("");
  };

  return (
    <div className="chat-holo-panel">
      <h2 className="chat-holo-title">💬 Chat Panel</h2>

      <div className="chat-holo-messages" ref={containerRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.sender === "me" ? "chat-bubble me-bubble" : "chat-bubble other-bubble"
            }
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-holo-input-row">
        <input
          className="chat-holo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Írj üzenetet..."
        />

        <button className="chat-holo-send" onClick={sendMessage}>
          Küldés
        </button>
      </div>
    </div>
  );
}
