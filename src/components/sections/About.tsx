import AnimatedSmallText from "./AnimatedSmallText";

export default function About() {
  return (
    <section id="about">
      <div className="theme-container">
        <div className="border-t-[0.0625rem] border-b-[0.0625rem] border-foreground/30 py-12">
          <AnimatedSmallText text="The Narrative" />
          <h2 className="text-6xl uppercase font-bold">
            <span className="block [font-size:inherit]">Decoding</span>
            <span className="block [font-size:inherit]">Architecture</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
