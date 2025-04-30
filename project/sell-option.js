// Check if user is logged in
const loggedNumber = localStorage.getItem('loggedInUser');
if (!loggedNumber) {
  window.location.href = 'login.html';
} else {
  const user = JSON.parse(localStorage.getItem('user_' + loggedNumber));
  document.getElementById('userName').innerText = `Hello, ${user.name} (${user.number})`;
}

function goTo(page) {
  window.location.href = page;
}

function goBack() {
  window.location.href = 'dashboard.html'; // Goes back to farmer/vendor selection
}
