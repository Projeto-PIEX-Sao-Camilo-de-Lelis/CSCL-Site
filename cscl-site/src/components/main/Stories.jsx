export default function Stories() {
  return (
    <div
      className=" w-full min-h-[100vh]
        flex flex-col md:flex-row
        gap-[1.5rem] md:gap-[2rem]
        justify-center items-center
        bg-secondary
        p-[1.6rem] md:p[2rem]
        relative overflow-hidden

        after:content-['']
        after:absolute after:top-0 after:left-0
        after:w-screen after:h-full
        after:bg-black
        after:opacity-[0.80]
        after:mix-blend-multiply
        after:transition-all after:duration-300
        after:grayscale
        after:z-[1] "
      style={{ backgroundImage: `url(/assets/backgrounds/historias.jpg` }}
      id="stories"
    >
      <p className="text-white text-center z-[10]">Stories Section</p>
    </div>
  );
}
