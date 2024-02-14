const Container = ({ children, className }) => {
  return (
    <div
      className={`w-full text-center items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
