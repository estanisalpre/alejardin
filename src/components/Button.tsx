import { ButtonProps } from "@/interfaces";

export function Button({
  onClick,
  children,
  variant = "primary",
}: ButtonProps) {
  const baseClasses =
    "px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500",
    secondary: "bg-white/80 text-gray-700 hover:bg-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}
