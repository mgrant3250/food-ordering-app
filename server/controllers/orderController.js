const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  const email = req.user.email;
  const { cart } = req.body;

  try {
    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder = new Order({ email, cart, total });

    await newOrder.save();
    res.json({ success: true, message: "Order saved" });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ success: false, message: "Error saving order" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ success: true, order: updatedOrder });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ success: false, message: "Error updating order" });
  }
};