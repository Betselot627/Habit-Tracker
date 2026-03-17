import { useState, useEffect, useContext, useRef } from "react";
import { Camera, Save, Lock, CheckCircle, Clock, Flame } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const Avatar = ({ src, name, size = "lg" }) => {
  const dim = size === "lg" ? "w-24 h-24 text-3xl" : "w-10 h-10 text-base";
  if (src)
    return (
      <img
        src={src}
        alt={name}
        className={`${dim} rounded-full object-cover border-4 border-emerald-500`}
      />
    );
  return (
    <div
      className={`${dim} rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white border-4 border-emerald-500`}
    >
      {name?.[0]?.toUpperCase() || "U"}
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-[#1f2937] rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("info"); // info | history
  const fileRef = useRef();

  useEffect(() => {
    api
      .get("/habits")
      .then(({ data }) => setHabits(data))
      .catch(() => {});
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      const payload = { name: name.trim(), avatar };
      if (newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }
      const { data } = await api.put("/profile", payload);
      updateUser(data);
      setSuccess("Profile updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const today = new Date().setHours(0, 0, 0, 0);
  const completedToday = habits.filter((h) =>
    h.completedDates?.some((d) => new Date(d).setHours(0, 0, 0, 0) === today),
  ).length;
  const totalCompletions = habits.reduce(
    (s, h) => s + (h.completedDates?.length || 0),
    0,
  );
  const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak || 0), 0);

  const inProgress = habits.filter(
    (h) =>
      !h.completedDates?.some(
        (d) => new Date(d).setHours(0, 0, 0, 0) === today,
      ),
  );
  const completedHabits = habits.filter((h) =>
    h.completedDates?.some((d) => new Date(d).setHours(0, 0, 0, 0) === today),
  );

  const inputClass =
    "w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition text-sm";

  return (
    <div className="lg:ml-64 lg:mr-72 min-h-screen bg-gray-50 dark:bg-[#111827] p-4 md:p-8 pb-24 lg:pb-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Profile
        </h2>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard
            icon={<CheckCircle className="w-5 h-5 text-white" />}
            label="Today"
            value={completedToday}
            color="bg-emerald-500"
          />
          <StatCard
            icon={<Clock className="w-5 h-5 text-white" />}
            label="Total Completions"
            value={totalCompletions}
            color="bg-blue-500"
          />
          <StatCard
            icon={<Flame className="w-5 h-5 text-white" />}
            label="Best Streak"
            value={bestStreak}
            color="bg-orange-500"
          />
          <StatCard
            icon={<CheckCircle className="w-5 h-5 text-white" />}
            label="Total Habits"
            value={habits.length}
            color="bg-purple-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-200 dark:bg-gray-800 rounded-xl p-1 w-fit">
          {["info", "history"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                tab === t
                  ? "bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {t === "info" ? "Edit Profile" : "Habit History"}
            </button>
          ))}
        </div>

        {tab === "info" && (
          <div className="bg-white dark:bg-[#1f2937] rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            {/* Avatar */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative">
                <Avatar src={avatar} name={name} size="lg" />
                <button
                  onClick={() => fileRef.current.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 hover:bg-emerald-700 rounded-full flex items-center justify-center shadow-lg transition"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-300 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 px-4 py-3 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className={`${inputClass} opacity-50 cursor-not-allowed`}
                />
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Change Password (optional)
                </p>
                <div className="space-y-3">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={inputClass}
                    placeholder="Current password"
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={inputClass}
                    placeholder="New password (min. 6 characters)"
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        )}

        {tab === "history" && (
          <div className="space-y-6">
            {inProgress.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />{" "}
                  In Progress ({inProgress.length})
                </h3>
                <div className="space-y-2">
                  {inProgress.map((h) => (
                    <div
                      key={h._id}
                      className="bg-white dark:bg-[#1f2937] rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700 flex items-center justify-between shadow-sm"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {h.name}
                        </p>
                        {h.timeGoal && (
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                            ⏱ {h.timeGoal}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {h.completedDates?.length || 0} completions
                        </p>
                        {h.streak > 0 && (
                          <p className="text-xs text-orange-500 font-semibold">
                            🔥 {h.streak} streak
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {completedHabits.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />{" "}
                  Completed Today ({completedHabits.length})
                </h3>
                <div className="space-y-2">
                  {completedHabits.map((h) => (
                    <div
                      key={h._id}
                      className="bg-green-50 dark:bg-green-900/10 rounded-xl px-4 py-3 border border-green-200 dark:border-green-700/40 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300 text-sm line-through">
                          {h.name}
                        </p>
                        {h.timeGoal && (
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                            ⏱ {h.timeGoal}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {h.completedDates?.length || 0} total
                        </p>
                        {h.streak > 0 && (
                          <p className="text-xs text-orange-500 font-semibold">
                            🔥 {h.streak}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {habits.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-[#1f2937] rounded-2xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-400 text-lg">
                  No habits yet. Go create some!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
