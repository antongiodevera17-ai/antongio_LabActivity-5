document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // DOM Selection & Caching
  // ==========================================
  // getElementById requirements (4+ elements)
  const profileCard = document.getElementById('profileCard');
  const profileName = document.getElementById('profileName');
  const profileProgram = document.getElementById('profileProgram');
  const profileYear = document.getElementById('profileYear');
  const profileStatus = document.getElementById('profileStatus');
  const studentIdDisplay = document.getElementById('studentIdDisplay');
  const formMessage = document.getElementById('formMessage');
  
  // Controls
  const nameInput = document.getElementById('nameInput');
  const programInput = document.getElementById('programInput');
  const yearInput = document.getElementById('yearInput');
  const statusInput = document.getElementById('statusInput');
  
  // Buttons
  const updateBtn = document.getElementById('updateBtn');
  const toggleDetailsBtn = document.getElementById('toggleDetailsBtn');
  const themeBtn = document.getElementById('themeBtn');
  const resetBtn = document.getElementById('resetBtn');

  // querySelector requirement
  const detailsPanel = document.querySelector('#detailsPanel');

  // Initial values setup dynamically from initial DOM/dataset
  const INITIAL_DATA = {
    name: 'Maria Santos',
    program: 'BS Information Technology',
    year: '3rd Year',
    status: 'active',
    studentId: profileCard ? profileCard.dataset.studentId : '2026-001'
  };

  // Ensure initial Student ID display reads from dataset
  if (profileCard && studentIdDisplay) {
    studentIdDisplay.textContent = `Student ID: ${profileCard.dataset.studentId}`;
  }

  // ==========================================
  // Required Pure Utility Functions
  // ==========================================

  /**
   * Checks if trimmed name contains at least 2 characters.
   * @param {string} name 
   * @returns {boolean}
   */
  function isValidStudentName(name) {
    if (typeof name !== 'string') return false;
    return name.trim().length >= 2;
  }

  /**
   * Returns capitalized status string.
   * @param {string} status 
   * @returns {string}
   */
  function formatStudentStatus(status) {
    return status === 'active' ? 'Active' : 'Inactive';
  }

  // Expose utility functions to global scope for external testing
  window.isValidStudentName = isValidStudentName;
  window.formatStudentStatus = formatStudentStatus;

  // ==========================================
  // State & DOM Manipulators
  // ==========================================

  /**
   * Updates status text, dataset, and active/inactive CSS classes.
   * @param {string} status 'active' | 'inactive'
   */
  function setStatus(status) {
    if (!profileCard || !profileStatus) return;

    profileCard.dataset.status = status;
    profileStatus.textContent = formatStudentStatus(status);

    if (status === 'active') {
      profileCard.classList.add('active');
      profileCard.classList.remove('inactive');
    } else {
      profileCard.classList.add('inactive');
      profileCard.classList.remove('active');
    }
  }

  /**
   * Validates form and updates profile card content.
   */
  function updateProfile() {
    if (!nameInput || !programInput || !yearInput || !statusInput || !formMessage) return;

    const newName = nameInput.value;

    if (!isValidStudentName(newName)) {
      formMessage.textContent = 'Student name is required';
      return;
    }

    // Clear previous error message
    formMessage.textContent = '';

    // Defensive updates using textContent
    if (profileName) profileName.textContent = newName.trim();
    if (profileProgram) profileProgram.textContent = programInput.value;
    if (profileYear) profileYear.textContent = yearInput.value;

    setStatus(statusInput.value);
  }

  /**
   * Toggles hidden state on details panel.
   */
  function toggleDetails() {
    if (detailsPanel) {
      detailsPanel.classList.toggle('hidden');
    }
  }

  /**
   * Toggles dark-theme class on body element.
   */
  function toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }

  /**
   * Restores exact initial state and reset controls.
   */
  function resetProfile() {
    // Restore text content using initial values safely
    if (profileName) profileName.textContent = INITIAL_DATA.name;
    if (profileProgram) profileProgram.textContent = INITIAL_DATA.program;
    if (profileYear) profileYear.textContent = INITIAL_DATA.year;

    // Restore dataset and card state
    if (profileCard) {
      profileCard.dataset.studentId = INITIAL_DATA.studentId;
    }
    if (studentIdDisplay) {
      studentIdDisplay.textContent = `Student ID: ${INITIAL_DATA.studentId}`;
    }
    setStatus(INITIAL_DATA.status);

    // Reset controls
    if (nameInput) nameInput.value = INITIAL_DATA.name;
    if (programInput) programInput.value = INITIAL_DATA.program;
    if (yearInput) yearInput.value = INITIAL_DATA.year;
    if (statusInput) statusInput.value = INITIAL_DATA.status;

    // Reset visibility & themes
    if (detailsPanel) detailsPanel.classList.remove('hidden');
    document.body.classList.remove('dark-theme');
    if (formMessage) formMessage.textContent = '';
  }

  // Expose manipulators to window object for automated grading tools
  window.updateProfile = updateProfile;
  window.setStatus = setStatus;
  window.toggleDetails = toggleDetails;
  window.toggleTheme = toggleTheme;
  window.resetProfile = resetProfile;

  // ==========================================
  // Event Listener Attachment
  // ==========================================
  if (updateBtn) updateBtn.addEventListener('click', updateProfile);
  if (toggleDetailsBtn) toggleDetailsBtn.addEventListener('click', toggleDetails);
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  if (resetBtn) resetBtn.addEventListener('click', resetProfile);
});
