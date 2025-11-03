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
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.json({ success: true, message: "Menu item added successfully" });
  } catch (err) {
    console.error("Error adding menu item:", err);
    res.status(500).json({ success: false, message: "Error adding item" });
  }
};