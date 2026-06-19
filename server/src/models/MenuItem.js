const mongoose = require("mongoose")

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ["entree", "side", "drink", "sauce"],
        required: true
    },
    price: {
        type: Number,
        required: function() {
            return this.type !== "sauce"
        },
        min: 0
    },

    imageUrl: {
        type: String,
        required: function() {
            return this.type === "entree"
        }
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxlength: 500
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("MenuItem", menuItemSchema)