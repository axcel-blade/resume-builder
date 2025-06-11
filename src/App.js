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
    <form className="space-y-6 overflow-y-auto max-h-screen pr-4">
      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
        <input type="text" placeholder="Name" className="input w-full mb-2" onChange={(e) => updateField('contact', 'name', e.target.value)} />
        <input type="text" placeholder="Phone" className="input w-full mb-2" onChange={(e) => updateField('contact', 'phone', e.target.value)} />
        <input type="email" placeholder="Email" className="input w-full mb-2" onChange={(e) => updateField('contact', 'email', e.target.value)} />
        <input type="text" placeholder="Address" className="input w-full" onChange={(e) => updateField('contact', 'address', e.target.value)} />
      </section>

      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Profile Info</h2>
        <textarea rows="3" placeholder="Profile Summary" className="input w-full" onChange={(e) => setFormData({ ...formData, profile: e.target.value })} />
      </section>

      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        {experiences.map((exp, idx) => (
          <textarea key={idx} rows="3" placeholder={`Experience #${idx + 1}`} className="input w-full mb-2" onChange={(e) => handleArrayChange(setExperiences, idx, e.target.value)} />
        ))}
        <button type="button" onClick={() => addSection(setExperiences)} className="text-blue-600">+ Add Experience</button>
      </section>

      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        {educations.map((edu, idx) => (
          <textarea key={idx} rows="3" placeholder={`Education #${idx + 1}`} className="input w-full mb-2" onChange={(e) => handleArrayChange(setEducations, idx, e.target.value)} />
        ))}
        <button type="button" onClick={() => addSection(setEducations)} className="text-blue-600">+ Add Education</button>
      </section>

      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Achievements</h2>
        {achievements.map((ach, idx) => (
          <textarea key={idx} rows="2" placeholder={`Achievement #${idx + 1}`} className="input w-full mb-2" onChange={(e) => handleArrayChange(setAchievements, idx, e.target.value)} />
        ))}
        <button type="button" onClick={() => addSection(setAchievements)} className="text-blue-600">+ Add Achievement</button>
      </section>

      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Skills and Abilities</h2>
        {skills.map((skill, idx) => (
          <textarea key={idx} rows="2" placeholder={`Skill or Ability #${idx + 1}`} className="input w-full mb-2" onChange={(e) => handleArrayChange(setSkills, idx, e.target.value)} />
        ))}
        <button type="button" onClick={() => addSection(setSkills)} className="text-blue-600">+ Add Skill</button>
      </section>

      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">References</h2>
        <textarea rows="2" placeholder="References (optional)" className="input w-full" onChange={(e) => setFormData({ ...formData, references: e.target.value })} />
      </section>
    </form>
  );
}