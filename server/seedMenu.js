const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");

mongoose.connect('mongodb://localhost:27017/foodAppDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected...");
  return seedMenuItems();
})
.catch(err => console.error("MongoDB connection error:", err));

async function seedMenuItems() {
  try {
    await MenuItem.deleteMany(); // optional: clear existing items first

    const items = [
      // Entrees
      {
        name: "Hamburger",
        type: "entree",
        price: 6.99,
        imageUrl: "/images/hamburger.jpg"
      },
      {
        name: "Chicken Tenders",
        type: "entree",
        price: 5.99,
        imageUrl: "/images/chicken-tenders.jpg"
      },
      {
        name: "Chicken Sandwich",
        type: "entree",
        price: 6.99,
        imageUrl: "/images/chicken-sandwhich.jpg"
      },
      {
        name: "Chicken Wings",
        type: "entree",
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