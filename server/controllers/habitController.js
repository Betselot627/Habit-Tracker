const Habit = require("../models/Habit");

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    res.json(habits);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createHabit = async (req, res) => {
  try {
    const habit = await Habit.create({ ...req.body, userId: req.userId });
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true },
    );
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
