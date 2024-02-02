
const Button = ({
  text,
  // type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-2 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
