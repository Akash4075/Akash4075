// login.js

function loginUser() {
    const number = document.getElementById('loginNumber').value;
    const password = document.getElementById('loginPassword').value;
  
    const storedUser = localStorage.getItem('user_' + number);
    if (!storedUser) {
      alert("User not found. Please create an account.");
      return;
    }
  
    const user = JSON.parse(storedUser);
  
    if (user.password === password) {
      localStorage.setItem('loggedInUser', number);
      alert("Login successful!");
      window.location.href = 'dashboard.html';
    } else {
      alert("Incorrect password.");
    }
  }
  
  function goToSignup() {
    window.location.href = 'signup.html';
  }
  
  // Redirect to dashboard if already logged in
  window.onload = () => {
    const loggedUser = localStorage.getItem('loggedInUser');
    if (loggedUser) {
      window.location.href = 'dashboard.html';
    }
  };
  