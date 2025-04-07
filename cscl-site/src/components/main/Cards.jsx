import { secondaryColor, whiteColor } from "../../config/Colors";

export default function Cards() {
  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center"
      style={{ backgroundColor: whiteColor }}
      id="cards"
    >
      <p className="text-black">Cards Section</p>
    </div>
  );
}
