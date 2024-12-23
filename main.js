document.addEventListener("DOMContentLoaded", () => {
  const categories = ["Clothes", "Electronics", "Shoes", "Miscellaneous"];
  const productData = {
    Clothes: [
      { id: 1, name: "Stylish Jacket", description: "A warm stylish jacket." },
      { id: 2, name: "Casual T-Shirt", description: "Comfortable and casual." },
    ],
    Electronics: [
      { id: 3, name: "Wireless Mouse", description: "Smooth and precise." },
      { id: 4, name: "Laptop", description: "High-performance laptop." },
    ],
    Shoes: [
      { id: 5, name: "Running Shoes", description: "Lightweight and durable." },
      { id: 6, name: "Leather Boots", description: "Stylish and sturdy." },
    ],
    Miscellaneous: [
      { id: 7, name: "Water Bottle", description: "Insulated and reusable." },
      { id: 8, name: "Backpack", description: "Spacious and comfortable." },
    ],
  };

  const searchInput = document.getElementById("searchInput");
  const categoryContainer = document.getElementById("categoryContainer");
  const productContainer = document.getElementById("productContainer");
  const productDetails = document.getElementById("productDetails");

  let currentCategory = "Clothes";

  function renderCategories() {
    categoryContainer.innerHTML = "";
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category;
      button.className = `px-4 py-2 rounded ${
        category === currentCategory
          ? "bg-gray-200 text-black"
          : "bg-gray-200 text-gray-800"
      }`;
      button.addEventListener("click", () => {
        currentCategory = category;
        renderProducts();
      });
      categoryContainer.appendChild(button);
    });
  }

  function renderProducts() {
    productContainer.innerHTML = "";
    const filteredProducts = productData[currentCategory].filter((product) =>
      product.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "border border-gray-300 rounded p-4 shadow-sm";
      productCard.innerHTML = `
        <h3 class="text-lg font-bold">${product.name}</h3>
        <p class="text-sm text-gray-600">${product.description}</p>
      `;
      productCard.addEventListener("click", () => renderProductDetails(product));
      productContainer.appendChild(productCard);
    });
  }

  function renderProductDetails(product) {
    productDetails.innerHTML = `
      <h2 class="text-xl font-bold mb-2">${product.name}</h2>
      <p>${product.description}</p>
    `;
    productDetails.classList.remove("hidden");
  }

  searchInput.addEventListener("input", renderProducts);

  renderCategories();
  renderProducts();
});
