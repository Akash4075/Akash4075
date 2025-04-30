// Check if user is logged in
const loggedNumber = localStorage.getItem('loggedInUser');
if (!loggedNumber) {
  window.location.href = 'login.html';
} else {
  const user = JSON.parse(localStorage.getItem('user_' + loggedNumber));
  document.getElementById('userName').innerText = `Hello, ${user.name} (${user.number})`;
}

// Load existing waste items when page loads
window.onload = function () {
  loadWasteItems();
};

// Add new waste
function addWaste() {
  const name = document.getElementById('wasteName').value.trim();
  const photoInput = document.getElementById('wastePhoto');
  const amount = document.getElementById('wasteAmount').value.trim();
  const contact = document.getElementById('wasteContact').value.trim();

  if (!name || !amount || !contact || !photoInput.files[0]) {
    alert("Please fill all fields and upload a photo.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const waste = {
      name,
      photo: e.target.result,
      amount,
      contact,
      userId: loggedNumber,
      booked: false
    };

    let wastes = JSON.parse(localStorage.getItem("wastes")) || [];
    wastes.push(waste);
    localStorage.setItem("wastes", JSON.stringify(wastes));
    loadWasteItems();

    // Clear form
    document.getElementById('wasteName').value = '';
    document.getElementById('wastePhoto').value = '';
    document.getElementById('wasteAmount').value = '';
    document.getElementById('wasteContact').value = '';
  };
  reader.readAsDataURL(photoInput.files[0]);
}

// Display added waste items (Dashboard)
function loadWasteItems() {
  const container = document.getElementById('wasteList');
  container.innerHTML = '';

  const wastes = JSON.parse(localStorage.getItem("wastes")) || [];
  const userWastes = wastes.filter(w => w.userId === loggedNumber);

  if (userWastes.length === 0) {
    container.innerHTML = "<p>No items added yet.</p>";
    return;
  }

  userWastes.forEach((waste, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.style = "margin-bottom: 20px; padding: 10px; background: #fff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);";

    div.innerHTML = `
      <img src="${waste.photo}" alt="Waste Image" style="width:100%; max-height: 200px; object-fit:cover; border-radius: 4px;" />
      <h3>${waste.name}</h3>
      <p>Amount: ${waste.amount}</p>
      <p>Contact: ${waste.contact}</p>
      <p>Status: <strong style="color: ${waste.booked ? 'red' : 'green'}">${waste.booked ? 'Booked' : 'Available'}</strong></p>
    `;
    container.appendChild(div);
  });
}

// Go back
function goBack() {
  window.history.back();
}
