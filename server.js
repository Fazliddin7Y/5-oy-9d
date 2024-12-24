const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const categories = ["Clothes", "Electronics", "Shoes", "Miscellaneous"];
const products = [
  { id: 1, name: "Sleek Wireless Computer Mouse", description: "Experience smooth and precise navigation with this modern wireless mouse, featuring a glossy finish and ergonomic design.", category: "Electronics" },
  { id: 2, name: "Stylish Red & Silver Over-Ear Headphones", description: "Immerse yourself in superior sound quality with these sleek red and silver over-ear headphones. Designed for comfort and style.", category: "Electronics" },
  { id: 3, name: "Modern Elegance Teal Armchair", description: "Elevate your living space with this beautifully crafted armchair, featuring a teal fabric and contemporary design.", category: "Miscellaneous" },
  { id: 4, name: "Elegant Solid Wood Dining Table", description: "Enhance your dining space with this sleek, contemporary dining table, crafted from solid wood.", category: "Miscellaneous" },
  { id: 5, name: "Sleek Modern Laptop with Ambient Lighting", description: "Experience next-level computing with our ultra-slim laptop, featuring a stunning display illuminated by ambient lighting.", category: "Electronics" },
  { id: 6, name: "Running Shoes for All Terrains", description: "Conquer any terrain with these durable and comfortable running shoes, designed for optimal performance.", category: "Shoes" }
];

app.get("/categories", (req, res) => {
  res.json(categories);
});

app.get("/products", (req, res) => {
  const category = req.query.category;
  if (category) {
    const filteredProducts = products.filter(
      (product) => product.category === category
    );
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
