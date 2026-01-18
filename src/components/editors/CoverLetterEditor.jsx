import React from "react";
import { SectionCard, Label, Text, TextArea } from "../SharedInputs";

export default function CoverLetterEditor({ data, set }) {
  const cl = data.coverLetter;

  return (
    <div className="space-y-4">
      <SectionCard title="Cover Letter Details">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Company Name</Label>
            <Text
              value={cl.companyName}
              onChange={(v) => set({ coverLetter: { ...cl, companyName: v } })}
              placeholder="e.g., TechCorp Inc."
            />
          </div>
          <div>
            <Label>Job Title</Label>
            <Text
              value={cl.jobTitle}
              onChange={(v) => set({ coverLetter: { ...cl, jobTitle: v } })}
              placeholder="e.g., Senior Developer"
            />
          </div>
          <div>
            <Label>Recipient Name</Label>
            <Text
              value={cl.recipientName}
              onChange={(v) => set({ coverLetter: { ...cl, recipientName: v } })}
              placeholder="e.g., John Smith"
            />
          </div>
          <div>
            <Label>Recipient Title</Label>
            <Text
              value={cl.recipientTitle}
              onChange={(v) => set({ coverLetter: { ...cl, recipientTitle: v } })}
              placeholder="e.g., Hiring Manager"
            />
          </div>
        </div>
        <div className="mt-3">
          <Label>Letter Content</Label>
          <TextArea
            value={cl.content}
            onChange={(v) => set({ coverLetter: { ...cl, content: v } })}
            rows={10}
            placeholder="Write your cover letter here..."
          />
        </div>
      </SectionCard>
    </div>
  );
}