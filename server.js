const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;

// Connect to MongoDB (Make sure MongoDB is installed and running)
mongoose.connect("mongodb://localhost/inventory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple inventory item schema
const inventoryItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

// Middleware to parse JSON
app.use(express.json());

// API endpoint to get all inventory items
app.get("/api/inventory", async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to add a new item to the inventory
app.post("/api/inventory", async (req, res) => {
  try {
    const newItem = await InventoryItem.create(req.body);
    res.json(newItem);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// API endpoint to update an existing item in the inventory
app.put("/api/inventory/:id", async (req, res) => {
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to delete an item from the inventory
app.delete("/api/inventory/:id", async (req, res) => {
  try {
    const deletedItem = await InventoryItem.findByIdAndRemove(req.params.id);
    res.json(deletedItem);
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
