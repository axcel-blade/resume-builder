import React, { useState } from "react";

export default function ResumeForm({ formData, setFormData }) {
  const [experiences, setExperiences] = useState([""]);
  const [educations, setEducations] = useState([""]);
  const [achievements, setAchievements] = useState([""]);
  const [skills, setSkills] = useState([""]);

  const updateField = (section, key, value) => {
    const updatedSection = { ...formData[section], [key]: value };
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleArrayChange = (setter, index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addSection = (setter) => setter((prev) => [...prev, ""]);

  return (
    <form className="space-y-4 overflow-y-auto max-h-screen pr-2">
      <h2 className="text-lg font-bold">Contact Details</h2>
      <input type="text" placeholder="Name" className="input" onChange={(e) => updateField('contact', 'name', e.target.value)} />
      <input type="text" placeholder="Phone" className="input" onChange={(e) => updateField('contact', 'phone', e.target.value)} />
      <input type="email" placeholder="Email" className="input" onChange={(e) => updateField('contact', 'email', e.target.value)} />
      <input type="text" placeholder="Address" className="input" onChange={(e) => updateField('contact', 'address', e.target.value)} />

      <h2 className="text-lg font-bold">Profile Info</h2>
      <textarea rows="3" placeholder="Profile Summary" className="input" onChange={(e) => setFormData({ ...formData, profile: e.target.value })} />

      <h2 className="text-lg font-bold">Experience</h2>
      {experiences.map((exp, idx) => (
        <textarea key={idx} rows="3" placeholder={`Experience #${idx + 1}`} className="input" onChange={(e) => handleArrayChange(setExperiences, idx, e.target.value)} />
      ))}
      <button type="button" onClick={() => addSection(setExperiences)} className="text-blue-600">+ Add Experience</button>

      <h2 className="text-lg font-bold">Education</h2>
      {educations.map((edu, idx) => (
        <textarea key={idx} rows="3" placeholder={`Education #${idx + 1}`} className="input" onChange={(e) => handleArrayChange(setEducations, idx, e.target.value)} />
      ))}
      <button type="button" onClick={() => addSection(setEducations)} className="text-blue-600">+ Add Education</button>

      <h2 className="text-lg font-bold">Achievements</h2>
      {achievements.map((ach, idx) => (
        <textarea key={idx} rows="2" placeholder={`Achievement #${idx + 1}`} className="input" onChange={(e) => handleArrayChange(setAchievements, idx, e.target.value)} />
      ))}
      <button type="button" onClick={() => addSection(setAchievements)} className="text-blue-600">+ Add Achievement</button>

      <h2 className="text-lg font-bold">Skills and Abilities</h2>
      {skills.map((skill, idx) => (
        <textarea key={idx} rows="2" placeholder={`Skill or Ability #${idx + 1}`} className="input" onChange={(e) => handleArrayChange(setSkills, idx, e.target.value)} />
      ))}
      <button type="button" onClick={() => addSection(setSkills)} className="text-blue-600">+ Add Skill</button>

      <h2 className="text-lg font-bold">References</h2>
      <textarea rows="2" placeholder="References (optional)" className="input" onChange={(e) => setFormData({ ...formData, references: e.target.value })} />
    </form>
  );
}