import React, { useState } from "react";
import { SectionCard, IconButton, Chip } from "./SharedInputs";

export default function SkillsEditor({ data, set }) {
    const [val, setVal] = useState("");
    const add = () => { if (!val.trim()) return; set({ skills: [...data.skills, val.trim()] }); setVal(""); };
    const remove = (i) => set({ skills: data.skills.filter((_, idx) => idx !== i) });

    return (
        <SectionCard title="Skills">
        <div className="flex gap-2">
            <input
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Add a skill and press +"
            />
            <IconButton onClick={add}>+ Add</IconButton>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
            <Chip key={i} onRemove={() => remove(i)}>{s}</Chip>
            ))}
        </div>
        </SectionCard>
    );
}