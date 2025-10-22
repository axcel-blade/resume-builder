import React, { useState } from "react";
import { IconButton } from "./SharedInputs";

export default function BulletsEditor({ items = [], onChange }) {
    const [val, setVal] = useState("");
    const add = () => {
        if (!val.trim()) return;
        onChange([...(items || []), val.trim()]);
        setVal("");
    };
    const del = (i) => onChange(items.filter((_, idx) => idx !== i));
    const up = (i) => i > 0 && onChange(items.map((x, idx) => (idx === i - 1 ? items[i] : idx === i ? items[i - 1] : x)));
    const dn = (i) => i < items.length - 1 && onChange(items.map((x, idx) => (idx === i + 1 ? items[i] : idx === i ? items[i + 1] : x)));

    return (
        <div>
        <div className="flex gap-2">
            <input
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Add bullet and press +"
            />
            <IconButton onClick={add}>+ Add</IconButton>
        </div>
        <ul className="mt-2 space-y-2">
            {items?.map((b, i) => (
            <li key={i} className="flex items-start justify-between gap-2">
                <span className="text-sm text-gray-700">• {b}</span>
                <span className="space-x-1">
                <IconButton title="Up" onClick={() => up(i)}>↑</IconButton>
                <IconButton title="Down" onClick={() => dn(i)}>↓</IconButton>
                <IconButton title="Remove" onClick={() => del(i)}>✕</IconButton>
                </span>
            </li>
            ))}
        </ul>
        </div>
    );
}