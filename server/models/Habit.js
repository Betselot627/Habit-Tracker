const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    description: String,
    frequency: {
      type: String,
      enum: ["daily", "weekly", "yearly", "custom"],
      default: "daily",
    },
    customDays: {
      type: Number,
      min: 1,
      default: null,
    },
    category: {
      type: String,
      enum: ["Well Being", "Health", "Productivity", "Learning"],
      default: "Well Being",
    },
    completedDates: [{ type: Date }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Habit", habitSchema);
