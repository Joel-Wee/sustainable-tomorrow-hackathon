if (!localStorage.getItem('loggedIn')) {
  window.location.href = 'pages/login.html';
}

const briefing = `Good morning, Sarah. You have 3 client meetings scheduled today — 
John Lim at 10:00am for Retirement Planning, the Tan Family at 1:00pm for Estate Planning, 
and ABC Corp at 4:00pm for Group Insurance. 

Two follow-ups require your attention: Sarah Ng has not been contacted in 21 days, 
and David Chong's policy is due for renewal in 7 days. 

You are currently at 12 CPD points this month — 3 points away from your monthly quota.`;

document.getElementById('briefing-text').innerText = briefing;