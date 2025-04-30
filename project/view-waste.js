document.addEventListener("DOMContentLoaded", function () {
    const wasteList = document.getElementById("wasteList");
  
    for (let key in localStorage) {
      if (key.startsWith("waste_")) {
        const item = JSON.parse(localStorage.getItem(key));
        if (item && item.name && item.amount && item.contact && item.photo) {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <img src="${item.photo}" alt="Agri Waste Photo" />
            <h3>${item.name}</h3>
            <p><strong>Amount:</strong> ${item.amount}</p>
            <p><strong>Contact:</strong> ${item.contact}</p>
          `;
          wasteList.appendChild(card);
        }
      }
    }
  });
  
  function goBack() {
    window.history.back();
  }
  