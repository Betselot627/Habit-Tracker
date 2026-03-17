const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, avatar, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;

    // password change is optional
    if (newPassword) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({
            message: "Current password is required to set a new password.",
          });
      }
      const valid = await user.comparePassword(currentPassword);
      if (!valid)
        return res
          .status(400)
          .json({ message: "Current password is incorrect." });
      user.password = newPassword; // pre-save hook will hash it
    }

    await user.save();
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
