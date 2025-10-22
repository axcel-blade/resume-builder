import React from "react";
import { SectionCard, Label, Text, TextArea } from "./SharedInputs";

export default function ProfileEditor({ data, set }) {
    const p = data.profile;
    return (
        <SectionCard title="Profile">
        <div className="grid grid-cols-2 gap-3">
            <div><Label>Full Name</Label><Text value={p.fullName} onChange={(v) => set({ profile: { ...p, fullName: v } })} /></div>
            <div><Label>Title</Label><Text value={p.title} onChange={(v) => set({ profile: { ...p, title: v } })} /></div>
            <div><Label>Email</Label><Text value={p.email} onChange={(v) => set({ profile: { ...p, email: v } })} /></div>
            <div><Label>Phone</Label><Text value={p.phone} onChange={(v) => set({ profile: { ...p, phone: v } })} /></div>
            <div><Label>Location</Label><Text value={p.location} onChange={(v) => set({ profile: { ...p, location: v } })} /></div>
            <div><Label>Website</Label><Text value={p.website} onChange={(v) => set({ profile: { ...p, website: v } })} /></div>
        </div>
        <div className="mt-3"><Label>Summary</Label><TextArea value={p.summary} onChange={(v) => set({ profile: { ...p, summary: v } })} /></div>
        </SectionCard>
    );
}