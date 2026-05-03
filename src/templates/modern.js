const labels = {
  en: {
    objective: 'OBJECTIVE',
    skills: 'SKILLS',
    experience: 'EXPERIENCE',
    education: 'EDUCATION',
    courses: 'OTHER COURSES',
    languages: 'LANGUAGES'
  },
  pt: {
    objective: 'OBJETIVO',
    skills: 'HABILIDADES',
    experience: 'EXPERIÊNCIA PROFISSIONAL',
    education: 'FORMAÇÃO ACADÊMICA',
    courses: 'OUTROS CURSOS',
    languages: 'IDIOMAS'
  }
};

module.exports = (data) => {
  const lang = data.language || 'en';
  const t = labels[lang];

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 10pt;
          line-height: 1.4;
          color: #1A1A1A;
          margin: 40pt;
        }
        h1 {
          font-size: 22pt;
          margin-bottom: 5pt;
          color: #000000;
        }
        .contact {
          font-size: 9pt;
          color: #444444;
          margin-bottom: 20pt;
          border-bottom: 1px solid #E4E4E0;
          padding-bottom: 10pt;
        }
        .section-title {
          font-size: 11pt;
          font-weight: bold;
          color: #2563EB; /* Modern accent */
          margin-top: 15pt;
          margin-bottom: 8pt;
          text-transform: uppercase;
        }
        .entry {
          margin-bottom: 10pt;
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
        }
        .entry-sub {
          font-style: italic;
          color: #444444;
          margin-bottom: 3pt;
        }
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 5pt;
        }
        .skill-item {
          background: #F0F0EC;
          padding: 2pt 6pt;
          border-radius: 2pt;
        }
        ul {
          margin: 0;
          padding-left: 15pt;
        }
      </style>
    </head>
    <body>
      <h1>${data.personal.fullName}</h1>
      <div class="contact">
        ${data.personal.email} | ${data.personal.phone}<br>
        ${data.personal.cityState}
        ${data.personal.linkedin ? ` | ${data.personal.linkedin}` : ''}
        ${data.personal.github ? ` | ${data.personal.github}` : ''}
      </div>

      <div class="section-title">${t.objective}</div>
      <div>${data.objective}</div>

      <div class="section-title">${t.skills}</div>
      <div class="skills-list">
        ${data.skills.map(s => `<span class="skill-item">${s}</span>`).join(' ')}
      </div>

      <div class="section-title">${t.experience}</div>
      ${data.experience.map(exp => `
        <div class="entry">
          <div class="entry-header">
            <span>${exp.role} @ ${exp.company}</span>
            <span>${exp.start} — ${exp.current ? 'Present' : exp.end}</span>
          </div>
          <ul>
            ${exp.desc.split('\n').map(line => line.trim() ? `<li>${line}</li>` : '').join('')}
          </ul>
        </div>
      `).join('')}

      <div class="section-title">${t.education}</div>
      ${data.education.map(edu => `
        <div class="entry">
          <div class="entry-header">
            <span>${edu.course}</span>
            <span>${edu.start} — ${edu.progress ? 'In Progress' : edu.end}</span>
          </div>
          <div class="entry-sub">${edu.institution}</div>
        </div>
      `).join('')}

      ${data.courses?.length ? `
        <div class="section-title">${t.courses}</div>
        ${data.courses.map(c => `
          <div class="entry">
            <div class="entry-header">
              <span>${c.name} ${c.workload ? `(${c.workload})` : ''}</span>
              <span>${c.year || ''}</span>
            </div>
            ${c.inst ? `<div class="entry-sub">${c.inst}</div>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${data.languages?.length ? `
        <div class="section-title">${t.languages}</div>
        <div>
          ${data.languages.map(l => `<strong>${l.name}:</strong> ${l.prof}`).join(' | ')}
        </div>
      ` : ''}
    </body>
    </html>
  `;
};
