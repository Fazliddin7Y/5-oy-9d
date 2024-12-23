document.addEventListener("DOMContentLoaded", () => {
    const API_BASE_URL = "http://localhost:3000";
  
    const searchInput = document.getElementById("searchInput");
    const categoryContainer = document.getElementById("categoryContainer");
    const productContainer = document.getElementById("productContainer");
    const productDetails = document.getElementById("productDetails");
  
    let categories = [];
    let currentCategory = "";
  
    async function fetchCategories() {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        categories = await response.json();
        if (categories.length > 0) {
          currentCategory = categories[0];
        }
        renderCategories();
        renderProducts();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  
    async function fetchProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}/products?category=${currentCategory}`);
        if (!response.ok) throw new Error("Failed to fetch products");
        return await response.json();
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
    }
  
    function renderCategories() {
      categoryContainer.innerHTML = "";
      categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.className = `px-4 py-2 rounded ${
          category === currentCategory
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`;
        button.addEventListener("click", () => {
          currentCategory = category;
          renderProducts();
        });
        categoryContainer.appendChild(button);
      });
    }

    async function renderProducts() {
      productContainer.innerHTML = "";
      const products = await fetchProducts();
      const filteredProducts = products.filter((product) =>
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
  
    fetchCategories();
  });
  