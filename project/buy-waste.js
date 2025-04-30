const loggedNumber = localStorage.getItem('loggedInUser');
if (!loggedNumber) {
  window.location.href = 'login.html';
}

function goBack() {
  window.history.back();
}

const wasteList = document.getElementById('wasteList');

function loadWaste() {
  wasteList.innerHTML = '';

  for (let key in localStorage) {
    if (key.startsWith('waste_')) {
      const item = JSON.parse(localStorage.getItem(key));
      if (item) {
        const card = document.createElement('div');
        card.className = 'card';

        let statusHTML = '';

        if (item.booked) {
          statusHTML = `
            <p class="booked">Booked for: ${item.bookingDate || "N/A"}</p>
            ${item.owner === loggedNumber ? '' : `<button class="btn" onclick="cancelBooking('${key}')">Cancel Booking</button>`}
          `;
        } else if (item.canceled) {
          statusHTML = `<p class="booked">Booking was canceled</p>
            <input type="date" id="date_${key}" style="padding:8px;margin-top:10px;">
            <button class="btn" onclick="bookWaste('${key}')">Book Again</button>`;
        } else {
          statusHTML = `
            <input type="date" id="date_${key}" style="padding:8px;margin-top:10px;">
            <button class="btn" onclick="bookWaste('${key}')">Book</button>
          `;
        }

        card.innerHTML = `
          <img src="${item.photo}" alt="Waste Photo">
          <h3>${item.name}</h3>
          <p><strong>Amount:</strong> ${item.amount} kg</p>
          <p><strong>Contact:</strong> ${item.contact}</p>
          ${statusHTML}
        `;

        wasteList.appendChild(card);
      }
    }
  }
}

function bookWaste(key) {
  const dateInput = document.getElementById(`date_${key}`);
  const bookingDate = dateInput.value;

  if (!bookingDate) {
    alert("Please select a booking date.");
    return;
  }

  const data = JSON.parse(localStorage.getItem(key));
  data.booked = true;
  data.bookingDate = bookingDate;
  delete data.canceled;
  localStorage.setItem(key, JSON.stringify(data));
  loadWaste();
}

function cancelBooking(key) {
  const data = JSON.parse(localStorage.getItem(key));
  data.booked = false;
  delete data.bookingDate;
  data.canceled = true;
  localStorage.setItem(key, JSON.stringify(data));
  loadWaste();
}

loadWaste();
