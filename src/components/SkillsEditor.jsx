import React, { useState } from "react";
import { SectionCard, IconButton, Chip } from "./SharedInputs";

function SkillCategoryEditor({ label, skills, onChange }) {
  const [val, setVal] = useState("");

  const add = () => {
    if (!val.trim()) return;
    onChange([...skills, val.trim()]);
    setVal("");
  };

  const remove = (i) => onChange(skills.filter((_, idx) => idx !== i));

  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold mb-2">{label}</h4>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={`Add a ${label.toLowerCase()} skill`}
        />
        <IconButton onClick={add}>+ Add</IconButton>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <Chip key={i} onRemove={() => remove(i)}>
            {s}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default function SkillsEditor({ data, set }) {
  const update = (category, newList) =>
    set({
      skills: { ...data.skills, [category]: newList },
    });

  const { hard = [], soft = [], transferable = [], technical = [] } = data.skills || {};

  return (
    <SectionCard title="Skills">
      <SkillCategoryEditor
        label="Hard Skills"
        skills={hard}
        onChange={(list) => update("hard", list)}
      />
      <SkillCategoryEditor
        label="Soft Skills"
        skills={soft}
        onChange={(list) => update("soft", list)}
      />
      <SkillCategoryEditor
        label="Transferable Skills"
        skills={transferable}
        onChange={(list) => update("transferable", list)}
      />
      <SkillCategoryEditor
        label="Technical Skills"
        skills={technical}
        onChange={(list) => update("technical", list)}
      />
    </SectionCard>
  );
}