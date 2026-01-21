import React from "react";

export default function CoverLetterTemplate({ data }) {
  const profile = data.profile;
  const cl = data.coverLetter;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="print-page mx-auto bg-white p-8 text-[14px] leading-7 font-serif">
      {/* Date */}
      <div className="mb-8 text-right text-[13px] text-gray-600">
        <p>{formattedDate}</p>
      </div>

      {/* Recipient Address */}
      <div className="mb-6">
        {cl.recipientName && <p className="font-semibold text-[14px]">{cl.recipientName}</p>}
        {cl.recipientTitle && <p className="text-[13px]">{cl.recipientTitle}</p>}
        {cl.companyName && <p className="text-[13px]">{cl.companyName}</p>}
      </div>

      {/* Greeting */}
      <p className="mb-4 text-[14px]">
        Dear {cl.recipientName ? cl.recipientName : "Hiring Manager"},
      </p>

      {/* Body */}
      <div className="mb-4 whitespace-pre-wrap text-[13px] text-gray-800 leading-relaxed">
        {cl.content}
      </div>

      {/* Closing */}
      <div className="mt-8">
        <div className="text-[14px]">
          <p className="font-semibold">{profile.fullName}</p>
          {profile.email && <p className="text-[13px] text-gray-600">{profile.email}</p>}
          {profile.phone && <p className="text-[13px] text-gray-600">{profile.phone}</p>}
          {profile.location && <p className="text-[13px] text-gray-600">{profile.location}</p>}
        </div>
      </div>
    </div>
  );
}