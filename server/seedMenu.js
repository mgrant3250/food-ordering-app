require("dotenv").config();

const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected...");
  return seedMenuItems();
})
.catch(err => console.error("MongoDB connection error:", err));

async function seedMenuItems() {
  try {
    await MenuItem.deleteMany();

    const items = [
        //entrees
      {
        name: "Hamburger",
        type: "entree",
        description: "A juicy grilled beef patty served on a toasted bun with crisp lettuce, ripe tomato, and our signature house sauce.",
        price: 6.99,
        imageUrl: "/images/hamburger.jpg"
      },
      {
        name: "Chicken Tenders",
        type: "entree",
        description: "Tender strips of chicken, lightly seasoned and fried to a crisp golden finish, served with your favorite house-made sauces.",
        price: 5.99,
        imageUrl: "/images/chicken-tenders.jpg"
      },
      {
        name: "Chicken Sandwich",
        type: "entree",
        description: "Succulent grilled chicken on a toasted artisan bun, topped with fresh greens, ripe tomato, and a house-made sauce for a flavorful twist.",
        price: 6.99,
        imageUrl: "/images/chicken-sandwhich.jpg"
      },
      {
        name: "Chicken Wings",
        type: "entree",
        description: "Oven-roasted wings with a crisp exterior and juicy interior, served with your choice of signature sauce for maximum flavor.",
        price: 4.99,
        imageUrl: "/images/chicken-wings.jpg"
      },

      // Sides
      {
        name: "Fries",
        type: "side",
        price: 2.99,
        imageUrl: "/images/fries.jpg"
      },
      {
        name: "Fruit Cup",
        type: "side",
        price: 1.99,
        imageUrl: ""
      },
      {
        name: "Caesar Salad",
        type: "side",
        price: 2.99,
        imageUrl: ""
      },

      // Drinks
      {
        name: "Coke",
        type: "drink",
        price: 1.99,
        imageUrl: ""
      },
      {
        name: "Sprite",
        type: "drink",
        price: 1.99,
        imageUrl: ""
      },
      {
        name: "Root Beer",
        type: "drink",
        price: 1.99,
        imageUrl: ""
      },
      {
        name: "Lemonade",
        type: "drink",
        price: 1.99,
        imageUrl: ""
      },
      {
        name: "Dr. Pepper",
        type: "drink",
        price: 1.99,
        imageUrl: ""
      },

      // Sauces (no price required)
      {
        name: "Ketchup",
        type: "sauce",
        imageUrl: ""
      },
      {
        name: "Buffalo",
        type: "sauce",
        imageUrl: ""
      },
      {
        name: "Barbeque",
        type: "sauce",
        imageUrl: ""
      },
      {
        name: "Hot Mustard",
        type: "sauce",
        imageUrl: ""
      },
      {
        name: "Sweet and Sour",
        type: "sauce",
        imageUrl: ""
      },
    ];

     await MenuItem.insertMany(items);
    console.log("Menu items seeded!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Failed to seed menu items:", error);
    mongoose.connection.close();
  }
}