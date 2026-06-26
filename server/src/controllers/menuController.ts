import { Request, Response } from "express";
import MenuItem from "../models/MenuItem";

/* -------------------- Types -------------------- */

type MenuGroups = {
  entrees?: unknown[];
  sides?: unknown[];
  drinks?: unknown[];
  sauces?: unknown[];
};

/* -------------------- Get Menu -------------------- */

export const getMenu = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await MenuItem.find();

    const grouped = items.reduce<MenuGroups>((acc, item) => {
      const key = `${item.type}s` as keyof MenuGroups;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key]!.push(item);

      return acc;
    }, {});

    res.json(grouped);
  } catch (err) {
    console.error("Error fetching menu:", err);

    res.status(500).json({
      success: false,
      message: "Failed to load menu",
    });
  }
};

/* -------------------- Add Menu Item -------------------- */

export const addMenuItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const itemData = { ...req.body };

    if (req.file) {
      itemData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const newItem = new MenuItem(itemData);

    await newItem.save();

    res.json({
      success: true,
      message: "Menu item added successfully",
    });
  } catch (err) {
    console.error("Error adding menu item:", err);

    res.status(500).json({
      success: false,
      message: "Error adding item",
    });
  }
};

/* -------------------- Update Menu Item -------------------- */

export const updateMenuItem = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      res.status(404).json({
        success: false,
        message: "Item not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Menu item updated",
      data: updatedItem,
    });
  } catch (err) {
    console.error("Error updating menu item:", err);

    res.status(500).json({
      success: false,
      message: "Error updating item",
    });
  }
};

/* -------------------- Delete Menu Item -------------------- */

export const deleteMenuItem = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      res.status(404).json({
        success: false,
        message: "Item not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Menu item deleted",
    });
  } catch (err) {
    console.error("Error deleting menu item:", err);

    res.status(500).json({
      success: false,
      message: "Error deleting item",
    });
  }
};