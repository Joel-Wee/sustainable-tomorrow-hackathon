// Redirect if not logged in
if (!localStorage.getItem('loggedIn')) {
  window.location.href = 'pages/login.html';
}

// Morning Briefing
const briefing = `Good morning, Sarah. You have 3 client meetings scheduled today — 
John Lim at 10:00am for Retirement Planning, the Tan Family at 1:00pm for Estate Planning, 
and ABC Corp at 4:00pm for Group Insurance. Two follow-ups require your attention: 
Sarah Ng has not been contacted in 21 days, and David Chong's policy renews in 7 days. 
You are currently at 12 CPD points — 3 away from your monthly quota.`;

document.getElementById('briefing-text').innerText = briefing;

// Dropdown toggles
function setupDropdown(triggerId, dropdownId) {
  const trigger = document.getElementById(triggerId);
  const dropdown = document.getElementById(dropdownId);
  if (!trigger || !dropdown) return;
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open-panel');
    dropdown.classList.toggle('hidden-panel');
  });
}

setupDropdown('bell-trigger', 'bell-dropdown');
setupDropdown('profile-trigger', 'profile-dropdown');

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-panel').forEach(d => {
    d.classList.remove('open-panel');
    d.classList.add('hidden-panel');
  });
});

// Logout
function handleLogout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'pages/login.html';
}