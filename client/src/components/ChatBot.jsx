import { useState } from "react";

const templates = {
  default: "Focus on measurable outcomes in every bullet point.",
  summary: "Write a 3-line summary with role, years, strengths, and target domain.",
  project: "Add one AI/ML or full-stack project with impact metrics and deployment link.",
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me for resume tips like: improve summary, projects, or action verbs." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    const lower = input.toLowerCase();
    const reply =
      lower.includes("summary") ? templates.summary : lower.includes("project") ? templates.project : templates.default;
    setMessages((prev) => [...prev, userMessage, { from: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div className="glass-card p-4">
      <h3 className="font-semibold">AI Resume Assistant</h3>
      <div className="mt-3 h-52 space-y-2 overflow-y-auto rounded-lg bg-slate-100/60 p-3 dark:bg-slate-800/40">
        {messages.map((m, idx) => (
          <p key={idx} className={m.from === "bot" ? "text-brand-700 dark:text-brand-300" : "text-slate-700 dark:text-slate-200"}>
            <strong>{m.from === "bot" ? "AI" : "You"}:</strong> {m.text}
          </p>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="input" placeholder="Ask resume question..." />
        <button onClick={send} className="rounded-xl bg-brand-600 px-4 text-white">Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
