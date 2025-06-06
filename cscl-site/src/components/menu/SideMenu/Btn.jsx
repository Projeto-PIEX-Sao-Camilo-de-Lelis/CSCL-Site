export default function Btn({ alt, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-14 h-14 rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-secondary hover:bg-secondaryHover transition-colors duration-300"
    >
      {icon && (
        <img src={icon} alt={alt} className="w-full h-full object-cover" />
      )}
    </button>
  );
}
