const MenuItem = require("../models/MenuItem");

exports.getMenu = async (req, res) => {
  try {
    const items = await MenuItem.find();
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.type + "s"]) acc[item.type + "s"] = [];
      acc[item.type + "s"].push(item);
      return acc;
    }, {});
    res.json(grouped);
  } catch (err) {
    console.error("Error fetching menu:", err);
    res.status(500).json({ success: false, message: "Failed to load menu" });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    let itemData = req.body;

    if (req.file) {
      itemData.imageUrl = "/uploads/" + req.file.filename;
    }

    const newItem = new MenuItem(itemData);
    await newItem.save();

    res.json({ success: true, message: "Menu item added successfully" });
  } catch (err) {
    console.error("Error adding menu item:", err);
    res.status(500).json({ success: false, message: "Error adding item" });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    if (req.file) {
      updateData.imageUrl = "/uploads/" + req.file.filename;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, message: "Menu item updated", item: updatedItem });
  } catch (err) {
    console.error("Error updating menu item:", err);
    res.status(500).json({ success: false, message: "Error updating item" });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, message: "Menu item deleted" });
  } catch (err) {
    console.error("Error deleting menu item:", err);
    res.status(500).json({ success: false, message: "Error deleting item" });
  }
};