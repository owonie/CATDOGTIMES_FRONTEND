import React, { useState, useEffect } from "react";
import "./Direct.css";

const DirectMessage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/messages/${recipient}`);
      const data = await res.json();
      setMessages(data);
    }
    fetchData();
  }, [recipient]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      text: input,
      sender: 1,
      // sender: loggedInUser.id,
      recipient,
    };
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    const data = await res.json();
    setMessages([...messages, data]);
    setInput("");
  };

  return (
    <div className="direct-message">
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} placeholder="Enter message" />
        <button type="submit">Send</button>
      </form>
      {messages.map((message) => (
        <div key={message.id} className="message">
          <img src={message.sender.profileImageUrl} alt={message.sender.username} />
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default DirectMessage;
