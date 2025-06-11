export default function ResumeForm({ formData, setFormData }) {
  return (
    <form className="space-y-4">
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Profile Summary:</label>
        <textarea
          rows="4"
          value={formData.profile || ""}
          onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
          className="border p-2 w-full"
        />
      </div>
      {/* Add more sections as needed */}
    </form>
  );
}
