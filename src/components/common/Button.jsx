const Button = ({
    text,
    // type = "button",
    bgColor = "bg-blue-500",
    textColor = "text-white",
    className = "",
    ...props
}) => {
    return (
        <div className="w-full px-2 py-3">
          <label htmlFor="">{}</label>
            <button
                className={`w-full px-2 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
                {...props}
            >
                {text}
            </button>
        </div>
    );
};

export default Button;
