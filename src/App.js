import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import GeneratePDF from "./components/GeneratePDF";
import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({});

  return (
    <div className="p-6 grid md:grid-cols-2 gap-8">
      <ResumeForm formData={formData} setFormData={setFormData} />
      <div>
        <ResumePreview formData={formData} />
        <GeneratePDF />
      </div>
    </div>
  );
}
