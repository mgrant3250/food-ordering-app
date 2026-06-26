import { Response } from "express";
import Order from "../models/Order";
import { AuthRequest } from "../types/AuthRequest";

/* -------------------- Place Order -------------------- */

export const placeOrder = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const email = req.user?.email;
  const { cart } = req.body;

  try {
    if (!email) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
      return;
    }

    const formattedCart = cart.map((item: any) => ({
      cartItemId: item.cartItemId,
      baseItem: {
        _id: item.baseItem._id,
        name: item.baseItem.name,
        price: item.baseItem.price,
        imageUrl: item.baseItem.imageUrl || "",
      },
      options: {
        side: item.options.side || "",
        sauce: item.options.sauce || "",
        drink: item.options.drink || "",
      },
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    }));

    const total = formattedCart.reduce(
      (sum: number, item: any) =>
        sum + item.totalPrice * item.quantity,
      0
    );

    const newOrder = new Order({
      email,
      cart: formattedCart,
      total,
    });


    await newOrder.save();

    res.json({
      success: true,
      message: "Order saved",
    });
  } catch (err) {
    console.error("Error saving order:", err);

    res.status(500).json({
      success: false,
      message: "Error saving order",
    });
  }
};

/* -------------------- Get All Orders -------------------- */

export const getAllOrders = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.error("Error fetching orders:", err);

    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};

/* -------------------- Update Order Status -------------------- */

interface UpdateOrderStatusBody {
  status:
    | "pending"
    | "preparing"
    | "completed"
    | "cancelled";
}

export const updateOrderStatus = async (
  req: AuthRequest &
    {
      params: { id: string };
      body: UpdateOrderStatusBody;
    },
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
      return;
    }

    res.json({
      success: true,
      data: updatedOrder,
    });
  } catch (err) {
    console.error("Error updating order status:", err);

    res.status(500).json({
      success: false,
      message: "Error updating order",
    });
  }
};