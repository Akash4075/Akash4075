// Check if user is logged in
const loggedNumber = localStorage.getItem('loggedInUser');
if (!loggedNumber) {
  window.location.href = 'login.html';
} else {
  const user = JSON.parse(localStorage.getItem('user_' + loggedNumber));
  document.getElementById('userName').innerText = `Hello, ${user.name} (${user.number})`;
}

window.onload = function () {
  loadComposts();
};

function addCompost() {
  const name = document.getElementById('compostName').value.trim();
  const amount = document.getElementById('compostAmount').value.trim();
  const contact = document.getElementById('compostContact').value.trim();
  const photoInput = document.getElementById('compostPhoto');

  if (!name || !amount || !contact || !photoInput.files[0]) {
    alert("Please fill all fields and upload a photo.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const compost = {
      name,
      amount,
      contact,
      photo: e.target.result,
      userId: loggedNumber,
      booked: false
    };

    let composts = JSON.parse(localStorage.getItem("composts")) || [];
    composts.push(compost);
    localStorage.setItem("composts", JSON.stringify(composts));
    loadComposts();

    // Reset form
    document.getElementById('compostName').value = '';
    document.getElementById('compostAmount').value = '';
    document.getElementById('compostContact').value = '';
    document.getElementById('compostPhoto').value = '';
  };

  reader.readAsDataURL(photoInput.files[0]);
}

function loadComposts() {
  const container = document.getElementById('compostList');
  container.innerHTML = '';

  const composts = JSON.parse(localStorage.getItem("composts")) || [];
  const userComposts = composts.filter(c => c.userId === loggedNumber);

  if (userComposts.length === 0) {
    container.innerHTML = "<p>No compost items added yet.</p>";
    return;
  }

  userComposts.forEach((compost, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.style = "margin-bottom: 20px; padding: 10px; background: #fff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);";

    div.innerHTML = `
      <img src="${compost.photo}" alt="Compost Image" style="width:100%; max-height:200px; object-fit:cover; border-radius: 4px;" />
      <strong>${compost.name}</strong><br>
      Amount: ${compost.amount}<br>
      Contact: ${compost.contact}<br>
      Status: <strong style="color:${compost.booked ? 'red' : 'green'}">${compost.booked ? "Booked" : "Available"}</strong><br>
      <button onclick="deleteCompost(${index})" style="margin-top: 10px; background-color: red; color: white; padding: 8px 12px; border: none; border-radius: 5px; cursor: pointer;">Delete</button>
    `;
    container.appendChild(div);
  });
}

function deleteCompost(index) {
  let composts = JSON.parse(localStorage.getItem("composts")) || [];
  const userComposts = composts.filter(c => c.userId === loggedNumber);

  const actualCompost = userComposts[index];
  const actualIndex = composts.findIndex(c =>
    c.userId === loggedNumber &&
    c.name === actualCompost.name &&
    c.amount === actualCompost.amount &&
    c.contact === actualCompost.contact
  );

  if (actualIndex !== -1) {
    composts.splice(actualIndex, 1);
    localStorage.setItem("composts", JSON.stringify(composts));
    loadComposts();
  }
}
