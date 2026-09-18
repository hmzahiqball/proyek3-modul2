document.addEventListener('DOMContentLoaded', () => {
  const stateContainer = document.getElementById('state-container');
  const profileContent = document.getElementById('profile-content');
  const themeToggle = document.getElementById('themeToggle');
  const detailToggle = document.getElementById('detail-toggle');
  const profileDetails = document.getElementById('profile-details');
  const skillForm = document.getElementById('skill-form');
  const skillInput = document.getElementById('skill-input');
  const skillList = document.getElementById('skill-list');
  const skillError = document.getElementById('skill-error');
  const emptySkillsMsg = document.getElementById('empty-skills-msg');
  
  let isLoading = false;
  let hasFetched = false;
  
  // State management
  function renderState(state, message = '') {
    stateContainer.innerHTML = '';
    
    if (state === 'loading') {
      stateContainer.innerHTML = `<div class="state-message">Loading profile...</div>`;
      profileContent.classList.add('hidden');
    } else if (state === 'error') {
      stateContainer.innerHTML = `
        <div class="state-message">
          <p style="color: var(--error-color)">Error: ${message}</p>
          <button id="retry-btn" class="btn-retry">Try Again</button>
        </div>
      `;
      document.getElementById('retry-btn').addEventListener('click', loadProfile);
      profileContent.classList.add('hidden');
    } else if (state === 'empty') {
      stateContainer.innerHTML = `<div class="state-message">Profile data is empty.</div>`;
      profileContent.classList.add('hidden');
    } else if (state === 'success') {
      stateContainer.innerHTML = '';
      profileContent.classList.remove('hidden');
    }
  }

  // Load profile data asynchronously
  async function loadProfile() {
    if (isLoading || hasFetched) return;
    isLoading = true;
    renderState('loading');
    
    try {
      const response = await fetch('data/profile.json');
      if (!response.ok) throw new Error('Failed to fetch data. Please check JSON path.');
      
      const data = await response.json();
      
      if (!data || Object.keys(data).length === 0) {
        renderState('empty');
      } else {
        populateProfile(data);
        renderState('success');
      }
    } catch (error) {
      renderState('error', error.message);
    } finally {
      isLoading = false;
      hasFetched = true;
    }
  }

  function populateProfile(data) {
    document.getElementById('profile-name').textContent = data.name || 'Unknown';
    document.getElementById('profile-title').textContent = data.title || 'No Title';
    document.getElementById('profile-bio').textContent = data.bio || 'No bio available.';
    
    skillList.innerHTML = '';
    if (data.skills && data.skills.length > 0) {
      data.skills.forEach(skill => addSkillToDOM(skill));
      checkEmptySkills();
    } else {
      checkEmptySkills();
    }
  }

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });

  // Detail toggle
  detailToggle.addEventListener('click', () => {
    const isExpanded = detailToggle.getAttribute('aria-expanded') === 'true';
    
    detailToggle.setAttribute('aria-expanded', !isExpanded);
    detailToggle.textContent = !isExpanded ? 'Hide Details' : 'Show Details';
    
    // classList.toggle for the details section
    profileDetails.classList.toggle('hidden');
  });

  // Skill management
  function addSkillToDOM(skillText) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = skillText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      li.remove();
      checkEmptySkills();
    });
    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    skillList.appendChild(li);
    checkEmptySkills();
  }

  function checkEmptySkills() {
    if (skillList.children.length === 0) {
      emptySkillsMsg.classList.remove('hidden');
    } else {
      emptySkillsMsg.classList.add('hidden');
    }
  }

  skillForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newSkill = skillInput.value.trim();
    
    if (newSkill === '') {
      skillError.classList.remove('hidden');
      return;
    }
    
    skillError.classList.add('hidden');
    
    // Check for duplicates
    let isDuplicate = false;
    const currentSkills = skillList.querySelectorAll('li span');
    currentSkills.forEach(skill => {
      if (skill.textContent.toLowerCase() === newSkill.toLowerCase()) {
        isDuplicate = true;
      }
    });

    if (!isDuplicate) {
      addSkillToDOM(newSkill);
    }
    
    skillInput.value = '';
  });

  // Initial load
  loadProfile();
});
