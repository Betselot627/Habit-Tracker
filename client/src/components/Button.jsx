const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm focus:ring-emerald-500 focus:ring-offset-white dark:focus:ring-offset-gray-900",
    secondary:
      "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 focus:ring-gray-400",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500",
    ghost:
      "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 focus:ring-gray-400",
    outline:
      "border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-400",
    success:
      "bg-green-600 hover:bg-green-700 text-white shadow-sm focus:ring-green-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
