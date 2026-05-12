const Spinner = ({ size = "md" }) => {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin`}
      />
    </div>
  );
};

export default Spinner;
