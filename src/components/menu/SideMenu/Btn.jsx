export default function Btn({ alt, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 rounded-full overflow-hidden cursor-pointer flex items-center justify-center hover:bg-secondaryHover transition-colors duration-300 p-2"
    >
      {icon && (
        <img src={icon} alt={alt} className="w-full h-full object-contain" />
      )}
    </button>
  );
}
