const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;
app.use(express.json());

app.post("/products", async (req, res) => {
  try {
    const { name, price, type } = req.body;
    const product = await prisma.product.create({
      data: { name, price, type },
    });
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Could not create product" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const getProduct = await prisma.product.findMany();
    res.status(200).json(getProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Could not create product" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
