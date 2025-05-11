const products = [
  { name: "Smartphone", category: "electronics", price: 499 },
  { name: "Laptop", category: "electronics", price: 999 },
  { name: "Book: JavaScript", category: "books", price: 29 },
  { name: "Book: CSS Design", category: "books", price: 19 }
];

function displayProducts(list) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price}</p>
    `;
    container.appendChild(card);
  });
}

document.getElementById("categoryFilter").addEventListener("change", filterProducts);
document.getElementById("sort").addEventListener("change", sortProducts);

let filteredProducts = [...products];
displayProducts(filteredProducts);

function filterProducts() {
  const value = document.getElementById("categoryFilter").value;
  filteredProducts = value === "all"
    ? [...products]
    : products.filter(p => p.category === value);
  displayProducts(filteredProducts);
}

function sortProducts() {
  const value = document.getElementById("sort").value;
  if (value === "priceLow") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (value === "priceHigh") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  displayProducts(filteredProducts);
}
