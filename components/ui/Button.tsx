export default function Button({
  children,
  className = "",
  ...props
}: any) {
  return (
    <button
      className={`px-4 py-2 bg-primary-500 text-white rounded-xl shadow ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
