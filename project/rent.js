// Check login
const loggedNumber = localStorage.getItem('loggedInUser');
if (!loggedNumber) {
  window.location.href = 'login.html';
}

// Add equipment
document.getElementById('rentForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const photoFile = document.getElementById('photo').files[0];

  if (!photoFile) {
    alert('Please upload a photo.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const photo = reader.result;

    const equipment = {
      name,
      amount,
      contact,
      photo,
      booked: false,
      bookingDate: '',
      canceled: false,
      owner: loggedNumber
    };

    const id = 'rent_' + Date.now();
    localStorage.setItem(id, JSON.stringify(equipment));

    alert('Equipment added successfully!');
    location.reload(); // Refresh to show in dashboard
  };

  reader.readAsDataURL(photoFile);
});

function goBack() {
  window.history.back();
}

// Load dashboard
function loadDashboard() {
  const rentList = document.getElementById('rentList');
  rentList.innerHTML = '';

  for (let key in localStorage) {
    if (key.startsWith('rent_')) {
      const data = JSON.parse(localStorage.getItem(key));
      if (data && data.owner === loggedNumber) {
        const div = document.createElement('div');
        div.className = 'item';

        let statusText = "Available";
        if (data.booked) {
          statusText = `Booked on: ${data.bookingDate || "N/A"}`;
        } else if (data.canceled) {
          statusText = "Booking was canceled";
        }

        div.innerHTML = `
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Price:</strong> ₹${data.amount}/day</p>
          <p><strong>Contact:</strong> ${data.contact}</p>
          <p><strong>Status:</strong> ${statusText}</p>
          <img src="${data.photo}" alt="Equipment Photo">
          <br>
          <button class="delete-btn" onclick="deleteItem('${key}')">Delete</button>
        `;
        rentList.appendChild(div);
      }
    }
  }
}

function deleteItem(key) {
  if (confirm("Are you sure you want to delete this equipment?")) {
    localStorage.removeItem(key);
    loadDashboard();
  }
}

// Initial dashboard load
loadDashboard();

  