import React from "react";

export default function TemplateSidebar({ data }) {
  const accent = data.meta.accent;
  const profile = data.profile;

  // Render content blocks
  const renderSidebar = (paddingTop = "20px", paddingBottom = "60px") => (
    <aside 
      className="w-[30%] bg-gray-50"
      style={{ 
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        boxSizing: "border-box",
        margin: 0,
        backgroundColor: "#f9fafb",
      }}
    >
      {/* Name & Title */}
      <div style={{ pageBreakInside: "avoid", marginBottom: "12px" }}>
        <h1 className="text-xl font-bold leading-tight m-0" style={{ color: accent }}>
          {profile.fullName}
        </h1>
        <p className="text-[12px] text-gray-700 m-0 mt-1">{profile.title}</p>
      </div>

      {/* Personal Details */}
      <div style={{ pageBreakInside: "avoid", marginBottom: "12px" }}>
        <h3 className="text-[12px] font-semibold mb-1 m-0" style={{ color: accent }}>
          PERSONAL DETAILS
        </h3>
        <ul className="text-[11.5px] text-gray-700 leading-[1.3] m-0 p-0 list-none">
          {profile.phone && <li style={{ margin: 0 }}>{profile.phone}</li>}
          {profile.email && <li style={{ margin: 0 }}>{profile.email}</li>}
          {profile.location && <li style={{ margin: 0 }}>{profile.location}</li>}
          {profile.website && <li style={{ margin: 0 }}>{profile.website}</li>}
        </ul>
      </div>

      {/* Profile Links */}
      {data.links?.length > 0 && (
        <div style={{ pageBreakInside: "avoid", marginBottom: "12px" }}>
          <h3 className="text-[12px] font-semibold mb-1 m-0" style={{ color: accent }}>
            LINKS
          </h3>
          <ul className="text-[11.5px] text-gray-700 leading-[1.3] m-0 p-0 list-none">
            {data.links.map((l) => (
              <li key={l.id} style={{ pageBreakInside: "avoid", marginBottom: "4px", margin: 0 }}>
                <div className="font-medium text-[11px] m-0">{l.label}</div>
                <a
                  href={l.url.startsWith("http") ? l.url : `https://${l.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-600 break-all text-[11px]"
                >
                  {l.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      {data.skillGroups?.length > 0 && (
        <div style={{ marginTop: "12px" }}>
          <h3 className="text-[12px] font-semibold mb-1 m-0" style={{ color: accent }}>
            SKILLS
          </h3>
          {data.skillGroups.map((g, idx) => (
            <div 
              key={g.id} 
              style={{ 
                pageBreakInside: "avoid",
                marginBottom: idx < data.skillGroups.length - 1 ? "8px" : "0",
                margin: 0
              }}
            >
              <p className="font-semibold text-[12px] text-gray-800 m-0">{g.title}</p>
              {g.bullets?.length > 0 && (
                <ul className="list-disc text-[11.5px] text-gray-700 leading-[1.3] m-0 p-0" style={{ paddingLeft: "16px" }}>
                  {g.bullets.map((b, i) => (
                    <li key={i} className="text-[11px]" style={{ margin: 0 }}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </aside>
  );

  const renderMainContent = (paddingTop = "20px", paddingBottom = "60px") => (
    <main 
      className="flex-1"
      style={{ 
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        boxSizing: "border-box",
        margin: 0,
      }}
    >
      {/* Summary */}
      {profile.summary && (
        <div style={{ pageBreakInside: "avoid", marginBottom: "16px" }}>
          <h3
            className="mb-2 text-xs font-semibold uppercase tracking-wider m-0"
            style={{ color: accent, pageBreakAfter: "avoid" }}
          >
            SUMMARY
          </h3>
          <div className="text-[12.5px] text-gray-800 whitespace-pre-wrap break-words leading-[1.4]">
            {profile.summary}
          </div>
        </div>
      )}

      {/* Employment */}
      {data.experience?.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <h3
            className="mb-2 text-xs font-semibold uppercase tracking-wider m-0"
            style={{ color: accent, pageBreakAfter: "avoid" }}
          >
            EMPLOYMENT HISTORY
          </h3>
          <div>
            {data.experience.map((e, idx) => (
              <div 
                key={e.id} 
                style={{ 
                  pageBreakInside: "avoid",
                  marginBottom: idx < data.experience.length - 1 ? "12px" : "0",
                }}
              >
                <div className="font-semibold text-[12.5px] m-0">
                  {e.role}
                  {e.company && (
                    <span className="text-gray-600 font-normal"> | {e.company}</span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 mb-1 m-0">
                  {e.start} - {e.end || "Present"} {e.location && `| ${e.location}`}
                </div>
                {e.bullets?.length > 0 && (
                  <ul className="list-disc text-[12px] text-gray-700 leading-[1.4] m-0 p-0" style={{ paddingLeft: "20px", marginTop: "4px" }}>
                    {e.bullets.map((b, i) => (
                      <li key={i} className="text-[11.5px]" style={{ margin: 0, marginBottom: "2px" }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <h3
            className="mb-2 text-xs font-semibold uppercase tracking-wider m-0"
            style={{ color: accent, pageBreakAfter: "avoid" }}
          >
            EDUCATION
          </h3>
          <div>
            {data.education.map((e, idx) => (
              <div 
                key={e.id} 
                style={{ 
                  pageBreakInside: "avoid",
                  marginBottom: idx < data.education.length - 1 ? "12px" : "0",
                }}
              >
                <div className="font-semibold text-[12.5px] m-0">
                  {e.degree}
                  {e.school && (
                    <span className="text-gray-600 font-normal"> | {e.school}</span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 mb-1 m-0">
                  {e.start} - {e.end} {e.location && `| ${e.location}`}
                </div>
                {e.bullets?.length > 0 && (
                  <ul className="list-disc text-[12px] text-gray-700 leading-[1.4] m-0 p-0" style={{ paddingLeft: "20px", marginTop: "4px" }}>
                    {e.bullets.map((b, i) => (
                      <li key={i} className="text-[11.5px]" style={{ margin: 0, marginBottom: "2px" }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <h3
            className="mb-2 text-xs font-semibold uppercase tracking-wider m-0"
            style={{ color: accent, pageBreakAfter: "avoid" }}
          >
            PROJECTS
          </h3>
          <div>
            {data.projects.map((p, idx) => (
              <div 
                key={p.id} 
                style={{ 
                  pageBreakInside: "avoid",
                  marginBottom: idx < data.projects.length - 1 ? "12px" : "0",
                }}
              >
                <div className="font-semibold text-[12.5px] m-0">{p.title}</div>
                <div className="text-[11px] text-gray-500 mb-1 m-0">
                  {p.organization} | {p.start} - {p.end}
                </div>
                {p.bullets?.length > 0 && (
                  <ul className="list-disc text-[12px] text-gray-700 leading-[1.4] m-0 p-0" style={{ paddingLeft: "20px", marginTop: "4px" }}>
                    {p.bullets.map((b, i) => (
                      <li key={i} className="text-[11.5px]" style={{ margin: 0, marginBottom: "2px" }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {data.achievements?.length > 0 && (
        <div>
          <h3
            className="mb-2 text-xs font-semibold uppercase tracking-wider m-0"
            style={{ color: accent, pageBreakAfter: "avoid" }}
          >
            ACHIEVEMENTS
          </h3>
          <div>
            {data.achievements.map((a, idx) => (
              <div 
                key={a.id} 
                style={{ 
                  pageBreakInside: "avoid",
                  marginBottom: idx < data.achievements.length - 1 ? "12px" : "0",
                }}
              >
                <div className="font-semibold text-[12.5px] m-0">
                  {a.title}
                  {a.organization && (
                    <span className="text-gray-600 font-normal"> | {a.organization}</span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 mb-1 m-0">{a.year && `${a.year}`}</div>
                {a.bullets?.length > 0 && (
                  <ul className="list-disc text-[12px] text-gray-700 leading-[1.4] m-0 p-0" style={{ paddingLeft: "20px", marginTop: "4px" }}>
                    {a.bullets.map((b, i) => (
                      <li key={i} className="text-[11.5px]" style={{ margin: 0, marginBottom: "2px" }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );

  return (
    <>
      {/* First Page - Bottom margin only (60px bottom, 20px top) */}
      <div 
        className="flex text-[12.5px] leading-[1.4] font-sans"
        style={{ 
          backgroundColor: "#ffffff",
          margin: 0,
          padding: 0,
          width: "100%",
          pageBreakAfter: "always",
          display: "flex",
        }}
      >
        {renderSidebar("20px", "60px")}
        {renderMainContent("20px", "60px")}
      </div>

      {/* Subsequent Pages - Top and bottom margins (60px both) */}
      <div 
        className="flex text-[12.5px] leading-[1.4] font-sans"
        style={{ 
          backgroundColor: "#ffffff",
          margin: 0,
          padding: 0,
          width: "100%",
          display: "flex",
        }}
      >
        {renderSidebar("60px", "60px")}
        {renderMainContent("60px", "60px")}
      </div>
    </>
  );
}