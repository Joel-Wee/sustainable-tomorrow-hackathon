function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('error-msg');

  // Check if fields are empty
  if (email === '' || password === '') {
    errorMsg.innerText = '⚠️ Please fill in both fields.';
    return;
  }

  // Fake login check (you can change this email/password)
  if (email === 'sarah@aag.com' && password === 'password123') {
    // ✅ Correct — go to homepage
    window.location.href = '../index.html';
  } else {
    // ❌ Wrong — show error
    errorMsg.innerText = '❌ Incorrect email or password.';
  }
}