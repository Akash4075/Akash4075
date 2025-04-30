function createAccount() {
  const name = document.getElementById('name').value.trim();
  const number = document.getElementById('number').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!name || !number || !password) {
    alert("Please fill in all fields.");
    return;
  }

  if (localStorage.getItem('user_' + number)) {
    alert("A user with this number already exists.");
    return;
  }

  const user = { name, number, password };
  localStorage.setItem('user_' + number, JSON.stringify(user));
  alert("Account created successfully! Please log in.");
  window.location.href = 'index.html';
}
