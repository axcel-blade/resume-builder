import React from "react";
import { SectionCard, Label, Text, TextArea, IconButton } from "./SharedInputs";

const uid = () => (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2));

export default function ProfileEditor({ data, set }) {
    const p = data.profile;

    // 🔗 --- link handlers ---
    const addLink = () =>
        set({
        links: [...data.links, { id: uid(), label: "", url: "" }],
        });

    const updateLink = (i, patch) =>
        set({
        links: data.links.map((l, idx) => (idx === i ? { ...l, ...patch } : l)),
        });

    const removeLink = (i) =>
        set({
        links: data.links.filter((_, idx) => idx !== i),
        });

    const handleKey = (e, i) => {
        if (e.key === "Enter") {
        e.preventDefault();
        if (i === data.links.length - 1) addLink();
        }
    };

    // --- render ---
    return (
        <SectionCard title="Profile">
        <div className="grid grid-cols-2 gap-3">
            <div>
            <Label>Full Name</Label>
            <Text
                value={p.fullName}
                onChange={(v) => set({ profile: { ...p, fullName: v } })}
            />
            </div>
            <div>
            <Label>Title</Label>
            <Text
                value={p.title}
                onChange={(v) => set({ profile: { ...p, title: v } })}
            />
            </div>
            <div>
            <Label>Email</Label>
            <Text
                value={p.email}
                onChange={(v) => set({ profile: { ...p, email: v } })}
            />
            </div>
            <div>
            <Label>Phone</Label>
            <Text
                value={p.phone}
                onChange={(v) => set({ profile: { ...p, phone: v } })}
            />
            </div>
            <div>
            <Label>Location</Label>
            <Text
                value={p.location}
                onChange={(v) => set({ profile: { ...p, location: v } })}
            />
            </div>
            <div>
            <Label>Website</Label>
            <Text
                value={p.website}
                onChange={(v) => set({ profile: { ...p, website: v } })}
            />
            </div>
        </div>

        <div className="mt-3">
            <Label>Summary</Label>
            <TextArea
            value={p.summary}
            onChange={(v) => set({ profile: { ...p, summary: v } })}
            />
        </div>

        {/* 🔗 Embedded link editor */}
        <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
            <Label>Profile Links</Label>
            <IconButton onClick={addLink}>+ Add</IconButton>
            </div>
            {data.links?.length > 0 ? (
            <div className="space-y-2">
                {data.links.map((l, i) => (
                <div key={l.id} className="grid grid-cols-5 items-center gap-2">
                    <Text
                    value={l.label}
                    onChange={(v) => updateLink(i, { label: v })}
                    onKeyDown={(e) => handleKey(e, i)}
                    placeholder="Label (e.g. LinkedIn)"
                    />
                    <Text
                    value={l.url}
                    onChange={(v) => updateLink(i, { url: v })}
                    onKeyDown={(e) => handleKey(e, i)}
                    placeholder="URL (e.g. linkedin.com/in/janedoe)"
                    className="col-span-3"
                    />
                    <IconButton title="Remove" onClick={() => removeLink(i)}>
                    ✕
                    </IconButton>
                </div>
                ))}
            </div>
            ) : (
            <p className="text-xs text-gray-400 italic">
                No links added. Click “+ Add” to create one.
            </p>
            )}
        </div>
        </SectionCard>
    );
}