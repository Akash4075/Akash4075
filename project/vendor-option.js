function goTo(page) {
    window.location.href = page;
  }
  
  function goBack() {
    window.history.back();
  }
  
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; // adjust this if your login page is named differently
  }
  