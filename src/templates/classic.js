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
          font-family: 'Times New Roman', Times, serif;
          font-size: 10pt;
          line-height: 1.3;
          color: #000000;
          margin: 40pt;
        }
        h1 {
          font-size: 20pt;
          text-align: center;
          margin-bottom: 5pt;
          text-transform: uppercase;
        }
        .contact {
          font-size: 9pt;
          text-align: center;
          margin-bottom: 15pt;
          padding-bottom: 5pt;
        }
        .section-title {
          font-size: 11pt;
          font-weight: bold;
          border-bottom: 1px solid #000;
          margin-top: 12pt;
          margin-bottom: 6pt;
          text-transform: uppercase;
        }
        .entry {
          margin-bottom: 8pt;
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
        }
        .entry-sub {
          font-style: italic;
          margin-bottom: 2pt;
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
      <div style="text-align: justify;">${data.objective}</div>

      <div class="section-title">${t.skills}</div>
      <div>${data.skills.join(', ')}</div>

      <div class="section-title">${t.experience}</div>
      ${data.experience.map(exp => `
        <div class="entry">
          <div class="entry-header">
            <span>${exp.company}</span>
            <span>${exp.start} — ${exp.current ? 'Present' : exp.end}</span>
          </div>
          <div class="entry-sub">${exp.role}</div>
          <ul>
            ${exp.desc.split('\n').map(line => line.trim() ? `<li>${line}</li>` : '').join('')}
          </ul>
        </div>
      `).join('')}

      <div class="section-title">${t.education}</div>
      ${data.education.map(edu => `
        <div class="entry">
          <div class="entry-header">
            <span>${edu.institution}</span>
            <span>${edu.start} — ${edu.progress ? 'In Progress' : edu.end}</span>
          </div>
          <div class="entry-sub">${edu.course}</div>
        </div>
      `).join('')}

      ${data.courses?.length ? `
        <div class="section-title">${t.courses}</div>
        ${data.courses.map(c => `
          <div class="entry">
            <div class="entry-header">
              <span>${c.name}</span>
              <span>${c.year || ''}</span>
            </div>
            ${c.inst ? `<div class="entry-sub">${c.inst} ${c.workload ? `(${c.workload})` : ''}</div>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${data.languages?.length ? `
        <div class="section-title">${t.languages}</div>
        <div>
          ${data.languages.map(l => `${l.name} (${l.prof})`).join(', ')}
        </div>
      ` : ''}
    </body>
    </html>
  `;
};
