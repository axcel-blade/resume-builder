/* src/apps/cover-letter/services/buildCoverLetter.js */

const toneOpeners = {
  professional: "I am writing to express my interest in the",
  confident: "I am excited to apply for the",
  friendly: "I would love to be considered for the",
};

const toneClosers = {
  professional: "Thank you for your time and consideration.",
  confident: "I am confident I can deliver meaningful impact from day one.",
  friendly: "Thank you for reviewing my application, and I hope to connect soon.",
};

const sanitize = (value, fallback) => {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

const formatLongDate = () =>
  new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function buildCoverLetter(formData) {
  const name = sanitize(formData.fullName, "Your Name");
  const email = sanitize(formData.email, "your.email@example.com");
  const phone = sanitize(formData.phone, "+61 400 123 456");
  const jobTitle = sanitize(formData.jobTitle, "target position");
  const company = sanitize(formData.companyName, "your company");
  const recipientName = sanitize(formData.recipientName, "Hiring Manager");
  const recipientTitle = sanitize(formData.recipientTitle, "Human Resources Manager");
  const companyAddress = sanitize(formData.companyAddress, "Company Address");
  const skills = sanitize(formData.topSkills, "relevant skills and experience");
  const achievements = sanitize(formData.achievements, "a track record of measurable results");
  const whyCompany = sanitize(
    formData.whyCompany,
    "your mission and product direction strongly align with my interests",
  );
  const tone = formData.tone || "professional";

  const opener = toneOpeners[tone] || toneOpeners.professional;
  const closer = toneClosers[tone] || toneClosers.professional;
  const addressLines = companyAddress
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const salutationName = recipientName.split(" ").slice(-1)[0] || "Hiring Manager";
  const salutationPrefix = recipientName.toLowerCase().startsWith("mr")
    || recipientName.toLowerCase().startsWith("mrs")
    || recipientName.toLowerCase().startsWith("ms")
    || recipientName.toLowerCase().startsWith("dr")
    || recipientName.toLowerCase().startsWith("prof")
    ? recipientName.split(" ").slice(0, -1).join(" ")
    : "";
  const salutation = salutationPrefix
    ? `Dear ${salutationPrefix} ${salutationName}`
    : `Dear ${recipientName}`;
  const subjectLine = `RE: ${jobTitle} position`;

  return `${name}
${email}
${phone}

${formatLongDate()}

${recipientName}
${recipientTitle}
${addressLines.join("\n")}

${salutation}

${subjectLine}

${opener} ${jobTitle} role at ${company}. I believe my background in ${skills} makes me a strong fit for this opportunity.

I am highly motivated to contribute to ${company}. ${whyCompany}. My professional focus and experience align strongly with the outcomes your team expects in this role.

In my previous work, I delivered outcomes such as ${achievements}. These experiences strengthened my specialist and transferable skills, including communication, teamwork, and delivering quality work under deadlines.

Please find my resume attached. I would welcome the opportunity to discuss my suitability for this role in an interview.

${closer}

Yours sincerely,
${name}
${email}`;
}
