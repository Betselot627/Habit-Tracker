const Habit = require("../models/Habit");

// Helper to calculate progress
const calculateProgress = (habit) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const startDate = new Date(habit.createdAt).setHours(0, 0, 0, 0);
  const endDate =
    habit.frequency === "custom"
      ? startDate + (habit.customDays - 1) * 24 * 60 * 60 * 1000
      : new Date().setHours(23, 59, 59, 999); // for others, use today

  // Determine total target days
  let totalDays;
  switch (habit.frequency) {
    case "daily":
      totalDays = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
      break;
    case "weekly":
      totalDays =
        Math.ceil((today - startDate) / (1000 * 60 * 60 * 24 * 7)) + 1;
      break;
    case "yearly":
      totalDays = 1; // only once per year
      break;
    case "custom":
      totalDays = habit.customDays;
      break;
    default:
      totalDays = 1;
  }

  // Calculate completed count
  let completedCount = habit.completedDates.length;

  // For weekly, count only unique weeks
  if (habit.frequency === "weekly") {
    const weeks = new Set();
    habit.completedDates.forEach((d) => {
      const date = new Date(d);
      const week = Math.floor((date - startDate) / (1000 * 60 * 60 * 24 * 7));
      weeks.add(week);
    });
    completedCount = weeks.size;
  }

  // For yearly, only one completion counts
  if (habit.frequency === "yearly") {
    completedCount = habit.completedDates.some(
      (d) => new Date(d).getFullYear() === new Date().getFullYear(),
    )
      ? 1
      : 0;
  }

  // Progress percentage
  const progress = Math.min((completedCount / totalDays) * 100, 100);

  // Streak calculation (consecutive days)
  let streak = 0;
  if (habit.frequency === "daily") {
    const sortedDates = habit.completedDates
      .map((d) => new Date(d).setHours(0, 0, 0, 0))
      .sort((a, b) => b - a);
    let current = today;
    for (let date of sortedDates) {
      if (date === current) {
        streak++;
        current -= 24 * 60 * 60 * 1000;
      } else {
        break;
      }
    }
  }

  return { progress, streak };
};

// Get all habits with progress
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    const habitsWithProgress = habits.map((habit) => {
      const { progress, streak } = calculateProgress(habit);
      return { ...habit.toObject(), progress, streak };
    });
    res.json(habitsWithProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create habit
exports.createHabit = async (req, res) => {
  try {
    const { name, description, timeGoal, frequency, category, customDays } =
      req.body;

    if (!name || !frequency) {
      return res
        .status(400)
        .json({ message: "Name and frequency are required." });
    }

    if (frequency === "custom" && (!customDays || customDays <= 0)) {
      return res
        .status(400)
        .json({ message: "Custom days must be a positive number." });
    }

    const habit = await Habit.create({
      name,
      description,
      timeGoal,
      frequency,
      customDays: frequency === "custom" ? customDays : null,
      category,
      userId: req.userId,
    });

    const { progress, streak } = calculateProgress(habit);
    res.status(201).json({ ...habit.toObject(), progress, streak });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update habit
exports.updateHabit = async (req, res) => {
  try {
    const { name, description, timeGoal, frequency, category, customDays } =
      req.body;

    if (frequency === "custom" && (!customDays || customDays <= 0)) {
      return res
        .status(400)
        .json({ message: "Custom days must be a positive number." });
    }

    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      {
        name,
        description,
        timeGoal,
        frequency,
        category,
        customDays: frequency === "custom" ? customDays : null,
      },
      { new: true },
    );

    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const { progress, streak } = calculateProgress(habit);
    res.json({ ...habit.toObject(), progress, streak });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.json({ message: "Habit deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Toggle completion
exports.toggleComplete = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const today = new Date().setHours(0, 0, 0, 0);
    const index = habit.completedDates.findIndex(
      (d) => new Date(d).setHours(0, 0, 0, 0) === today,
    );

    if (index > -1) {
      habit.completedDates.splice(index, 1);
    } else {
      habit.completedDates.push(new Date());
    }

    await habit.save();
    const { progress, streak } = calculateProgress(habit);
    res.json({ ...habit.toObject(), progress, streak });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
