import AnimatedSmallText from "./AnimatedSmallText";

export default function About() {
  return (
    <section id="about" className="bg-foreground h-screen">
      <div className="theme-container">
        <div className="border-t-[0.0625rem] border-b-[0.0625rem] border-background/30 py-12">
          <AnimatedSmallText text="The Narrative" />
          <h2 className="text-4xl sm:text-6xl uppercase font-bold text-background">
            <span className="block [font-size:inherit]">Skills &</span>
            <span className="block [font-size:inherit]">Interests</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
