import { translations, setLanguage, getCurrentLanguage } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resume-form');
  const langToggle = document.getElementById('lang-toggle');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const downloadBtn = document.getElementById('download-btn');
  const clearBtn = document.getElementById('clear-btn');
  const clearDialog = document.getElementById('clear-dialog');
  const confirmClear = document.getElementById('confirm-clear');
  const cancelClear = document.getElementById('cancel-clear');
  
  const skillsContainer = document.getElementById('skills-container');
  const skillInput = document.getElementById('skill-input');
  
  const experienceList = document.getElementById('experience-list');
  const addExperienceBtn = document.getElementById('add-experience');
  
  const educationList = document.getElementById('education-list');
  const addEducationBtn = document.getElementById('add-education');
  
  const coursesList = document.getElementById('courses-list');
  const addCourseBtn = document.getElementById('add-course');
  
  const languagesList = document.getElementById('languages-list');
  const addLanguageBtn = document.getElementById('add-language');

  let skills = [];

  // --- Initialization ---
  const initialLang = getCurrentLanguage();
  setLanguage(initialLang);

  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  loadDraft();
  updateProgress();

  // --- UI Updates ---
  function updateProgress() {
    const sections = document.querySelectorAll('.form-section');
    let completed = 0;
    sections.forEach(section => {
      const inputs = section.querySelectorAll('input, textarea');
      const isFilled = Array.from(inputs).some(input => input.value.trim().length > 0);
      if (isFilled) completed++;
    });
    
    const percent = (completed / sections.length) * 100;
    progressBar.style.setProperty('--progress', `${percent}%`);
    
    const currentLang = getCurrentLanguage();
    const stepText = translations['ui.step'][currentLang].replace('{n}', completed);
    progressText.textContent = stepText;
  }

  // --- Language Toggle ---
  langToggle.addEventListener('click', () => {
    const nextLang = getCurrentLanguage() === 'en' ? 'pt' : 'en';
    setLanguage(nextLang);
    validateAll(false);
    updateProgress();
  });

  // --- Clear Form ---
  clearBtn.addEventListener('click', () => clearDialog.showModal());
  cancelClear.addEventListener('click', () => clearDialog.close());
  confirmClear.addEventListener('click', () => {
    localStorage.removeItem('resumeDraft');
    form.reset();
    skills = [];
    experienceList.innerHTML = '';
    educationList.innerHTML = '';
    coursesList.innerHTML = '';
    languagesList.innerHTML = '';
    renderSkills();
    clearDialog.close();
    validateAll(false);
    updateProgress();
  });

  // --- Skills Logic ---
  function renderSkills() {
    const chips = skillsContainer.querySelectorAll('.skill-chip');
    chips.forEach(chip => chip.remove());
    
    skills.forEach((skill, index) => {
      const chip = document.createElement('div');
      chip.className = 'skill-chip';
      chip.innerHTML = `
        ${skill}
        <button type="button" data-index="${index}">&times;</button>
      `;
      chip.querySelector('button').addEventListener('click', () => {
        skills.splice(index, 1);
        renderSkills();
        saveDraft();
      });
      skillsContainer.insertBefore(chip, skillInput);
    });
  }

  skillInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = skillInput.value.trim().replace(/,$/, '');
      if (val && !skills.includes(val)) {
        skills.push(val);
        renderSkills();
        skillInput.value = '';
        saveDraft();
      }
    }
  });

  // --- Dynamic Entries Logic ---
  function createEntryCard(type, id) {
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.dataset.type = type;
    card.id = id || `${type}-${Date.now()}`;
    
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '&times;';
    removeBtn.addEventListener('click', () => {
      card.remove();
      saveDraft();
      updateProgress();
    });
    
    card.appendChild(removeBtn);
    return card;
  }

  addExperienceBtn.addEventListener('click', () => {
    const card = createEntryCard('experience');
    card.innerHTML += `
      <div class="form-group">
        <label data-i18n="field.company">Company</label>
        <input type="text" name="exp-company" data-i18n="field.company" required>
      </div>
      <div class="form-group">
        <label data-i18n="field.role">Role</label>
        <input type="text" name="exp-role" data-i18n="field.role" required>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label data-i18n="field.startDate">Start Date</label>
          <input type="date" name="exp-start" required>
        </div>
        <div class="form-group">
          <label data-i18n="field.endDate">End Date</label>
          <input type="date" name="exp-end">
          <label style="margin-top: 8px; display: flex; align-items: center; gap: 8px; text-transform: none; font-weight: 400;">
            <input type="checkbox" name="exp-current"> <span data-i18n="field.currentJob">Current Job</span>
          </label>
        </div>
      </div>
      <div class="form-group">
        <label data-i18n="field.description">Description</label>
        <textarea name="exp-desc" rows="3" data-i18n="field.description" required minlength="20"></textarea>
      </div>
    `;
    experienceList.appendChild(card);
    setLanguage(getCurrentLanguage());
    attachValidation(card);
  });

  addEducationBtn.addEventListener('click', () => {
    const card = createEntryCard('education');
    card.innerHTML += `
      <div class="form-group">
        <label data-i18n="field.course">Course</label>
        <input type="text" name="edu-course" data-i18n="field.course" required>
      </div>
      <div class="form-group">
        <label data-i18n="field.institution">Institution</label>
        <input type="text" name="edu-inst" data-i18n="field.institution" required>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label data-i18n="field.startYear">Start Year</label>
          <input type="number" name="edu-start" placeholder="2020" required>
        </div>
        <div class="form-group">
          <label data-i18n="field.endYear">End Year</label>
          <input type="number" name="edu-end" placeholder="2024">
          <label style="margin-top: 8px; display: flex; align-items: center; gap: 8px; text-transform: none; font-weight: 400;">
            <input type="checkbox" name="edu-progress"> <span data-i18n="field.inProgress">In Progress</span>
          </label>
        </div>
      </div>
    `;
    educationList.appendChild(card);
    setLanguage(getCurrentLanguage());
    attachValidation(card);
  });

  addCourseBtn.addEventListener('click', () => {
    const card = createEntryCard('course');
    card.innerHTML += `
      <div class="form-group">
        <label data-i18n="field.courseName">Course Name</label>
        <input type="text" name="course-name" data-i18n="field.courseName" required>
      </div>
      <div class="form-group">
        <label data-i18n="field.courseInstitution">Institution</label>
        <input type="text" name="course-inst" data-i18n="field.courseInstitution">
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label data-i18n="field.courseYear">Year</label>
          <input type="number" name="course-year" data-i18n="field.courseYear">
        </div>
        <div class="form-group">
          <label data-i18n="field.courseWorkload">Workload</label>
          <input type="text" name="course-workload" data-i18n="field.courseWorkload">
        </div>
      </div>
    `;
    coursesList.appendChild(card);
    setLanguage(getCurrentLanguage());
    attachValidation(card);
  });

  addLanguageBtn.addEventListener('click', () => {
    const card = createEntryCard('language');
    card.innerHTML += `
      <div class="grid-2">
        <div class="form-group">
          <label data-i18n="field.language">Language</label>
          <input type="text" name="lang-name" data-i18n="field.language" required>
        </div>
        <div class="form-group">
          <label data-i18n="field.proficiency">Proficiency</label>
          <select name="lang-prof" required>
            <option value="basic" data-i18n="proficiency.basic">Basic</option>
            <option value="intermediate" data-i18n="proficiency.intermediate">Intermediate</option>
            <option value="advanced" data-i18n="proficiency.advanced">Advanced</option>
            <option value="fluent" data-i18n="proficiency.fluent">Fluent</option>
            <option value="native" data-i18n="proficiency.native">Native</option>
          </select>
        </div>
      </div>
    `;
    languagesList.appendChild(card);
    setLanguage(getCurrentLanguage());
    attachValidation(card);
  });

  // --- Validation ---
  function validateField(field) {
    let isValid = true;
    if (field.required && !field.value.trim()) {
      isValid = false;
    } else if (field.type === 'email' && field.value) {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
    } else if (field.minLength > 0 && field.value.length < field.minLength) {
      isValid = false;
    }

    field.classList.toggle('field-invalid', !isValid);
    field.classList.toggle('field-valid', isValid && field.value.trim() !== '');
    return isValid;
  }

  function attachValidation(container) {
    const inputs = container.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        saveDraft();
        updateProgress();
      });
    });
  }

  attachValidation(form);

  function validateAll(scrollToError = true) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let firstError = null;
    let allValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) {
        allValid = false;
        if (!firstError) firstError = input;
      }
    });

    if (skills.length === 0) {
      allValid = false;
      document.getElementById('skills-error').style.opacity = 1;
      if (!firstError) firstError = document.getElementById('skills-container');
    } else {
      document.getElementById('skills-error').style.opacity = 0;
    }

    if (!allValid && scrollToError && firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return allValid;
  }

  // --- Persistence ---
  function saveDraft() {
    const data = {
      personal: {
        fullName: document.getElementById('fullName')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        cityState: document.getElementById('cityState')?.value || '',
        linkedin: document.getElementById('linkedin')?.value || '',
        github: document.getElementById('github')?.value || '',
      },
      objective: document.getElementById('objective')?.value || '',
      skills: skills,
      experience: Array.from(experienceList.children).map(card => ({
        company: card.querySelector('[name="exp-company"]')?.value || '',
        role: card.querySelector('[name="exp-role"]')?.value || '',
        start: card.querySelector('[name="exp-start"]')?.value || '',
        end: card.querySelector('[name="exp-end"]')?.value || '',
        current: card.querySelector('[name="exp-current"]')?.checked || false,
        desc: card.querySelector('[name="exp-desc"]')?.value || '',
      })),
      education: Array.from(educationList.children).map(card => ({
        course: card.querySelector('[name="edu-course"]')?.value || '',
        institution: card.querySelector('[name="edu-inst"]')?.value || '',
        start: card.querySelector('[name="edu-start"]')?.value || '',
        end: card.querySelector('[name="edu-end"]')?.value || '',
        progress: card.querySelector('[name="edu-progress"]')?.checked || false,
      })),
      courses: Array.from(coursesList.children).map(card => ({
        name: card.querySelector('[name="course-name"]')?.value || '',
        inst: card.querySelector('[name="course-inst"]')?.value || '',
        year: card.querySelector('[name="course-year"]')?.value || '',
        workload: card.querySelector('[name="course-workload"]')?.value || '',
      })),
      languages: Array.from(languagesList.children).map(card => ({
        name: card.querySelector('[name="lang-name"]')?.value || '',
        prof: card.querySelector('[name="lang-prof"]')?.value || '',
      })),
      template: document.getElementById('template-select')?.value || 'modern'
    };
    localStorage.setItem('resumeDraft', JSON.stringify(data));
  }

  function loadDraft() {
    const raw = localStorage.getItem('resumeDraft');
    if (!raw) return;
    const draft = JSON.parse(raw);

    const inputs = ['fullName', 'email', 'phone', 'cityState', 'linkedin', 'github', 'objective'];
    inputs.forEach(id => { if(document.getElementById(id)) document.getElementById(id).value = draft.personal?.[id] || draft[id] || ''; });
    if(document.getElementById('template-select')) document.getElementById('template-select').value = draft.template || 'modern';
    
    skills = draft.skills || [];
    renderSkills();

    draft.experience?.forEach(exp => {
      addExperienceBtn.click();
      const card = experienceList.lastElementChild;
      if (card) {
        card.querySelector('[name="exp-company"]').value = exp.company || '';
        card.querySelector('[name="exp-role"]').value = exp.role || '';
        card.querySelector('[name="exp-start"]').value = exp.start || '';
        card.querySelector('[name="exp-end"]').value = exp.end || '';
        card.querySelector('[name="exp-current"]').checked = !!exp.current;
        card.querySelector('[name="exp-desc"]').value = exp.desc || '';
      }
    });

    draft.education?.forEach(edu => {
      addEducationBtn.click();
      const card = educationList.lastElementChild;
      if (card) {
        card.querySelector('[name="edu-course"]').value = edu.course || '';
        card.querySelector('[name="edu-inst"]').value = edu.institution || '';
        card.querySelector('[name="edu-start"]').value = edu.start || '';
        card.querySelector('[name="edu-end"]').value = edu.end || '';
        card.querySelector('[name="edu-progress"]').checked = !!edu.progress;
      }
    });

    draft.courses?.forEach(c => {
      addCourseBtn.click();
      const card = coursesList.lastElementChild;
      if (card) {
        card.querySelector('[name="course-name"]').value = c.name || '';
        card.querySelector('[name="course-inst"]').value = c.inst || '';
        card.querySelector('[name="course-year"]').value = c.year || '';
        card.querySelector('[name="course-workload"]').value = c.workload || '';
      }
    });

    draft.languages?.forEach(l => {
      addLanguageBtn.click();
      const card = languagesList.lastElementChild;
      if (card) {
        card.querySelector('[name="lang-name"]').value = l.name || '';
        card.querySelector('[name="lang-prof"]').value = l.prof || '';
      }
    });
  }

  // --- Form Submission ---
  function collectCurrentData() {
    return {
      personal: {
        fullName: document.getElementById('fullName')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        cityState: document.getElementById('cityState')?.value || '',
        linkedin: document.getElementById('linkedin')?.value || '',
        github: document.getElementById('github')?.value || '',
      },
      objective: document.getElementById('objective')?.value || '',
      skills: skills,
      experience: Array.from(experienceList.children).map(card => ({
        company: card.querySelector('[name="exp-company"]')?.value || '',
        role: card.querySelector('[name="exp-role"]')?.value || '',
        start: card.querySelector('[name="exp-start"]')?.value || '',
        end: card.querySelector('[name="exp-end"]')?.value || '',
        current: card.querySelector('[name="exp-current"]')?.checked || false,
        desc: card.querySelector('[name="exp-desc"]')?.value || '',
      })),
      education: Array.from(educationList.children).map(card => ({
        course: card.querySelector('[name="edu-course"]')?.value || '',
        institution: card.querySelector('[name="edu-inst"]')?.value || '',
        start: card.querySelector('[name="edu-start"]')?.value || '',
        end: card.querySelector('[name="edu-end"]')?.value || '',
        progress: card.querySelector('[name="edu-progress"]')?.checked || false,
      })),
      courses: Array.from(coursesList.children).map(card => ({
        name: card.querySelector('[name="course-name"]')?.value || '',
        inst: card.querySelector('[name="course-inst"]')?.value || '',
        year: card.querySelector('[name="course-year"]')?.value || '',
        workload: card.querySelector('[name="course-workload"]')?.value || '',
      })),
      languages: Array.from(languagesList.children).map(card => ({
        name: card.querySelector('[name="lang-name"]')?.value || '',
        prof: card.querySelector('[name="lang-prof"]')?.value || '',
      })),
      template: document.getElementById('template-select')?.value || 'modern',
      language: getCurrentLanguage()
    };
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const originalBtnText = downloadBtn.innerHTML;
    const serverError = document.getElementById('server-error');
    
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = `
      <div class="spinner"></div>
      <span data-i18n="button.generating">${translations['button.generating'][getCurrentLanguage()]}</span>
    `;
    serverError.style.opacity = 0;

    const data = collectCurrentData();

    try {
      const response = await fetch('/api/resume/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Generation failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume_${data.personal.fullName.toLowerCase().replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      console.error('Submission Error:', err);
      serverError.style.opacity = 1;
      if (err.message) {
        serverError.textContent = err.message;
      }
    } finally {
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = originalBtnText;
    }
  });
});
