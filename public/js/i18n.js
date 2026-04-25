/**
 * i18n.js
 * Internationalization module for the Resume Generator.
 */

export const translations = {
  'app.title': {
    en: 'Resume Generator',
    pt: 'Gerador de Currículo'
  },
  'nav.clearForm': {
    en: 'Clear Form',
    pt: 'Limpar Formulário'
  },
  'section.personal': {
    en: 'Personal Information',
    pt: 'Dados Pessoais'
  },
  'section.objective': {
    en: 'Professional Objective',
    pt: 'Objetivo Profissional'
  },
  'section.skills': {
    en: 'Skills',
    pt: 'Habilidades'
  },
  'section.experience': {
    en: 'Professional Experience',
    pt: 'Experiência Profissional'
  },
  'section.education': {
    en: 'Education',
    pt: 'Formação Acadêmica'
  },
  'section.otherCourses': {
    en: 'Other Courses',
    pt: 'Outros Cursos'
  },
  'section.languages': {
    en: 'Languages',
    pt: 'Idiomas'
  },
  'field.fullName': {
    en: 'Full Name',
    pt: 'Nome Completo'
  },
  'field.email': {
    en: 'Email',
    pt: 'E-mail'
  },
  'field.phone': {
    en: 'Phone',
    pt: 'Telefone'
  },
  'field.cityState': {
    en: 'City / State',
    pt: 'Cidade / Estado'
  },
  'field.linkedin': {
    en: 'LinkedIn or Portfolio (optional)',
    pt: 'LinkedIn ou Portfólio (opcional)'
  },
  'field.github': {
    en: 'GitHub (optional)',
    pt: 'GitHub (opcional)'
  },
  'field.objective': {
    en: 'Describe your professional objective...',
    pt: 'Descreva seu objetivo profissional...'
  },
  'field.skillsPlaceholder': {
    en: 'Type a skill and press Enter',
    pt: 'Digite uma habilidade e pressione Enter'
  },
  'field.company': {
    en: 'Company Name',
    pt: 'Nome da Empresa'
  },
  'field.role': {
    en: 'Role / Position',
    pt: 'Cargo'
  },
  'field.startDate': {
    en: 'Start Date',
    pt: 'Data de Início'
  },
  'field.endDate': {
    en: 'End Date',
    pt: 'Data de Término'
  },
  'field.currentJob': {
    en: 'Current Job',
    pt: 'Emprego Atual'
  },
  'field.description': {
    en: 'Description of activities...',
    pt: 'Descrição das atividades...'
  },
  'field.course': {
    en: 'Course',
    pt: 'Curso'
  },
  'field.institution': {
    en: 'Institution',
    pt: 'Instituição'
  },
  'field.startYear': {
    en: 'Start Year',
    pt: 'Ano de Início'
  },
  'field.endYear': {
    en: 'End Year',
    pt: 'Ano de Conclusão'
  },
  'field.inProgress': {
    en: 'In Progress',
    pt: 'Em Andamento'
  },
  'field.courseName': {
    en: 'Course Name',
    pt: 'Nome do Curso'
  },
  'field.courseInstitution': {
    en: 'Institution (optional)',
    pt: 'Instituição (opcional)'
  },
  'field.courseYear': {
    en: 'Year of Completion (optional)',
    pt: 'Ano de Conclusão (opcional)'
  },
  'field.courseWorkload': {
    en: 'Workload (optional, e.g. 40h)',
    pt: 'Carga Horária (opcional, ex: 40h)'
  },
  'field.language': {
    en: 'Language',
    pt: 'Idioma'
  },
  'field.proficiency': {
    en: 'Proficiency Level',
    pt: 'Nível de Proficiência'
  },
  'proficiency.basic': {
    en: 'Basic',
    pt: 'Básico'
  },
  'proficiency.intermediate': {
    en: 'Intermediate',
    pt: 'Intermediário'
  },
  'proficiency.advanced': {
    en: 'Advanced',
    pt: 'Avançado'
  },
  'proficiency.fluent': {
    en: 'Fluent',
    pt: 'Fluente'
  },
  'proficiency.native': {
    en: 'Native',
    pt: 'Nativo'
  },
  'button.addExperience': {
    en: '+ Add Experience',
    pt: '+ Adicionar Experiência'
  },
  'button.addEducation': {
    en: '+ Add Education',
    pt: '+ Adicionar Formação'
  },
  'button.addCourse': {
    en: '+ Add Course',
    pt: '+ Adicionar Curso'
  },
  'button.addLanguage': {
    en: '+ Add Language',
    pt: '+ Adicionar Idioma'
  },
  'ui.step': { en: 'Step {n} of 6', pt: 'Passo {n} de 6' },
  'section.preview': { en: 'Final Preview', pt: 'Pré-visualização Final' },
  'template.modern': { en: 'Modern Template', pt: 'Modelo Moderno' },
  'template.classic': { en: 'Classic Template', pt: 'Modelo Clássico' },
  'btn.download': { en: 'Download PDF', pt: 'Baixar PDF' },
  'button.generate': {
    en: 'Generate PDF',
    pt: 'Gerar PDF'
  },
  'button.generating': {
    en: 'Generating...',
    pt: 'Gerando...'
  },
  'button.remove': {
    en: 'Remove',
    pt: 'Remover'
  },
  'dialog.clearTitle': {
    en: 'Clear form?',
    pt: 'Limpar formulário?'
  },
  'dialog.clearMessage': {
    en: 'All data will be lost. This action cannot be undone.',
    pt: 'Todos os dados serão perdidos. Esta ação não pode ser desfeita.'
  },
  'dialog.confirm': {
    en: 'Yes, clear',
    pt: 'Sim, limpar'
  },
  'dialog.cancel': {
    en: 'Cancel',
    pt: 'Cancelar'
  },
  'error.required': {
    en: 'This field is required.',
    pt: 'Este campo é obrigatório.'
  },
  'error.emailInvalid': {
    en: 'Enter a valid email address.',
    pt: 'Insira um endereço de e-mail válido.'
  },
  'error.minChars': {
    en: 'Minimum of 20 characters required.',
    pt: 'Mínimo de 20 caracteres obrigatório.'
  },
  'error.minSkills': {
    en: 'Add at least one skill.',
    pt: 'Adicione pelo menos uma habilidade.'
  },
  'error.serverError': {
    en: 'An error occurred while generating the PDF. Please try again.',
    pt: 'Ocorreu um erro ao gerar o PDF. Tente novamente.'
  },
  'field.template': {
    en: 'Select Template',
    pt: 'Selecionar Modelo'
  },
  'template.modern': {
    en: 'Modern',
    pt: 'Moderno'
  },
  'template.classic': {
    en: 'Classic',
    pt: 'Clássico'
  }
};

export function getCurrentLanguage() {
  return localStorage.getItem('preferredLanguage') || 'en';
}

export function setLanguage(lang) {
  localStorage.setItem('preferredLanguage', lang);
  document.documentElement.lang = lang;

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[key];

    if (!translation) return;

    const text = translation[lang];

    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else if (el.tagName === 'SELECT') {
      // For select, we might need to handle labels or placeholders if custom
    } else {
      el.textContent = text;
    }

    // Handle title and aria-label if they have data-i18n-title/aria
    if (el.hasAttribute('data-i18n-title')) {
      el.title = translations[el.getAttribute('data-i18n-title')][lang];
    }
    if (el.hasAttribute('data-i18n-aria')) {
      el.setAttribute('aria-label', translations[el.getAttribute('data-i18n-aria')][lang]);
    }
  });

  // Update toggle button text (show inactive language)
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'en' ? 'PT-BR' : 'EN-US';
  }
}
