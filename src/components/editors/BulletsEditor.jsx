import React, { useState } from "react";
import { IconButton } from "../SharedInputs";

export default function BulletsEditor({ items = [], onChange }) {
  const [val, setVal] = useState("");

  const add = () => {
    if (!val.trim()) return;
    onChange([...(items || []), val.trim()]);
    setVal("");
  };

  const del = (i) => onChange(items.filter((_, idx) => idx !== i));

  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Add bullet and press Enter"
        />
        <IconButton onClick={add}>+ Add</IconButton>
      </div>

      <ul className="mt-2 space-y-2">
        {items?.map((b, i) => (
          <li
            key={i}
            className="flex justify-between gap-2 break-words whitespace-pre-wrap rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700"
          >
            <span className="flex-1 text-gray-800 leading-snug">{b}</span>
            <IconButton onClick={() => del(i)}>✕</IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
}