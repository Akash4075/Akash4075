// Check login
const loggedNumber = localStorage.getItem('loggedInUser');
if (!loggedNumber) {
  window.location.href = 'login.html';
} else {
  const user = JSON.parse(localStorage.getItem('user_' + loggedNumber));
  document.getElementById('userName').innerText = `Hello, ${user.name} (${user.number})`;
}

window.onload = function () {
  loadCompostMarket();
};

function loadCompostMarket() {
  const container = document.getElementById('compostMarket');
  container.innerHTML = '';

  const composts = JSON.parse(localStorage.getItem("composts")) || [];

  composts.forEach((compost, index) => {
    const isOwnListing = compost.userId === loggedNumber;
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <img src="${compost.photo}" alt="Compost Image" />
      <strong>${compost.name}</strong><br>
      Amount: ${compost.amount}<br>
      Seller Contact: ${compost.contact}<br>
      Status: <strong>${compost.booked ? "Booked" : "Available"}</strong><br>
      ${compost.booked && compost.bookedBy ? `Booked By (Contact): ${compost.bookedBy}<br>` : ''}
      ${isOwnListing ? `<em>This is your listing</em>` : `
        <button onclick="bookCompost(${index})" ${compost.booked ? "disabled" : ""}>
          ${compost.booked ? "Already Booked" : "Book Now"}
        </button>`}
    `;
    container.appendChild(div);
  });
}

function bookCompost(index) {
  let composts = JSON.parse(localStorage.getItem("composts")) || [];
  const booker = JSON.parse(localStorage.getItem('user_' + loggedNumber));

  if (composts[index].userId === loggedNumber) {
    alert("You can't book your own compost.");
    return;
  }

  composts[index].booked = true;
  composts[index].bookedBy = booker.number;

  localStorage.setItem("composts", JSON.stringify(composts));
  loadCompostMarket();
}

function goBack() {
  window.history.back();
}
