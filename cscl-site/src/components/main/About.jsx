import { secondaryColor } from "../../config/Colors";

export default function About() {
  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center"
      style={{ backgroundColor: secondaryColor }}
    >
      <p className="text-white text-center">About Section</p>
    </div>
  );
}
