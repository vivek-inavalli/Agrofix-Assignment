const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// ---------------- Products ----------------

// GET /api/products
app.get("/api/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// POST /api/products (Admin)
app.post("/api/products", async (req, res) => {
  const { name, price, type, imgUrl } = req.body;
  if (!name || !price || !type || !imgUrl)
    return res.status(400).json({ error: "All fields are required." });

  const product = await prisma.product.create({
    data: { name, price, type, imgUrl },
  });
  res.status(201).json(product);
});

// PUT /api/products/:id (Admin)
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, type } = req.body;

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: { name, price, type },
  });

  res.json(product);
});

// DELETE /api/products/:id (Admin)
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.product.delete({ where: { id: Number(id) } });
  res.json({ message: "Product deleted" });
});

// ---------------- Orders ----------------

// POST /api/orders
app.post("/api/orders", async (req, res) => {
  const { buyerId, items } = req.body;
  if (!buyerId || !items)
    return res.status(400).json({ error: "Missing order details." });

  const order = await prisma.order.create({
    data: {
      buyerId,
      items,
      status: "PENDING",
    },
  });

  res.status(201).json(order);
});

// GET /api/orders/:id (Buyer)
app.get("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: { buyer: true },
    });

    if (!order) return res.status(404).json({ error: "Order not found." });
    res.json(order);
  } catch (err) {
    console.error(``);
  }
});

// GET /api/orders (Admin)
app.get("/api/orders", async (req, res) => {
  const orders = await prisma.order.findMany({ include: { buyer: true } });
  res.json(orders);
});

// PUT /api/orders/:id (Admin)
app.put("/api/orders/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["PENDING", "IN_PROGRESS", "DELIVERED"].includes(status)) {
    return res.status(400).json({ error: "Invalid status." });
  }

  const order = await prisma.order.update({
    where: { id: Number(id) },
    data: { status },
  });

  res.json(order);
});

app.post("/api/buyer/signup", async (req, res) => {
  try {
    const { name, contact, deliveryAddress, password } = req.body;

    if (!name || !contact || !deliveryAddress || !password)
      return res.status(400).json({ error: "All fields are required." });

    const existingBuyer = await prisma.buyer.findFirst({
      where: {
        OR: [{ name }, { contact }],
      },
    });

    if (existingBuyer)
      return res.status(409).json({ error: "Buyer already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newBuyer = await prisma.buyer.create({
      data: {
        name,
        contact: contact.toString(),
        deliveryAddress,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Buyer created", buyer: newBuyer });
  } catch (err) {
    console.error("Error in buyer signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Buyer Login
app.post("/api/buyer/login", async (req, res) => {
  try {
    const { contact, password } = req.body;

    if (!contact || !password)
      return res.status(400).json({ error: "All fields are required." });

    const buyer = await prisma.buyer.findUnique({
      where: { contact: BigInt(contact) },
    });

    if (!buyer) return res.status(404).json({ error: "Buyer not found." });

    const valid = await bcrypt.compare(password, buyer.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials." });

    res.json({ message: "Login successful", buyer });
  } catch (err) {
    console.error("Error in buyer login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin Signup
app.post("/api/admin/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required." });

    const existingAdmin = await prisma.admin.findUnique({ where: { email } });

    if (existingAdmin)
      return res.status(409).json({ error: "Admin already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Admin created", admin: newAdmin });
  } catch (err) {
    console.error("Error in admin signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin Login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "All fields are required." });

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) return res.status(404).json({ error: "Admin not found." });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials." });

    res.json({ message: "Login successful", admin });
  } catch (err) {
    console.error("Error in admin login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
