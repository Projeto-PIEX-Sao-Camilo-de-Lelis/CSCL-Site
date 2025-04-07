import { secondaryColor } from "../../config/Colors";

export default function Stories() {
  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center"
      style={{ backgroundColor: secondaryColor }}
      id="stories"
    >
      <p className="text-white text-center">Stories Section</p>
    </div>
  );
}
