export default function ResumePreview({ formData }) {
    return (
        <div id="resume" className="p-4 bg-white shadow rounded">
        <h1 className="text-xl font-bold">{formData.name}</h1>
        <p className="text-gray-600">{formData.profile}</p>
        {/* Continue rendering other sections */}
        </div>
    );
}
