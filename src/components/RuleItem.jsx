"use client";
// Rule Item Component
import { useState } from "react";

export default function RuleItem({ title, content }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rule-item">
      <h3 onClick={() => setOpen(!open)}>{title}</h3>
      {open && <p>{content}</p>}
    </div>
  );
}
