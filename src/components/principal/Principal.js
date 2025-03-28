import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Principal() {
  const [size, setSize] = useState(100);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const handleScroll = () => {
        const newSize = 100 + window.scrollY * 0.05;
        setSize(newSize);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setSize(100);
    }
  }, [inView]);
  return (
    <div
      ref={ref}
      className="principal-container"
      style={{ backgroundSize: `${size}vw ${size}vh` }}
    ></div>
  );
}
