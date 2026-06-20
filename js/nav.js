// Dropdown toggles
function setupDropdown(triggerId, dropdownId) {
  const trigger = document.getElementById(triggerId);
  const dropdown = document.getElementById(dropdownId);
  if (!trigger || !dropdown) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open-panel');
    // Close all dropdowns first
    document.querySelectorAll('.dropdown-panel').forEach(d => {
      d.classList.remove('open-panel');
      d.classList.add('hidden-panel');
    });
    // Toggle clicked one
    if (!isOpen) {
      dropdown.classList.add('open-panel');
      dropdown.classList.remove('hidden-panel');
    }
  });
}

setupDropdown('bell-trigger', 'bell-dropdown');
setupDropdown('profile-trigger', 'profile-dropdown');

// Close on outside click
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-panel').forEach(d => {
    d.classList.remove('open-panel');
    d.classList.add('hidden-panel');
  });
});

// Logout
function handleLogout() {
  localStorage.removeItem('loggedIn');
  
  // Check if we're in the pages/ folder or root
  const isInPagesFolder = window.location.pathname.includes('/pages/');
  
  if (isInPagesFolder) {
    window.location.href = 'login.html';
  } else {
    window.location.href = 'pages/login.html';
  }
}