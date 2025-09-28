// Hero.tsx (updated block)
import { Download, ArrowDown } from "lucide-react";
import Pattern from "@/components/Pattern";
import TextType from "./Typing";
import RotatingText from "./roatinglol";

const Hero = () => {
  return (
    <section className="relative min-h-screen px-6 overflow-hidden">
      <Pattern />

      <div className="absolute top-[30vh] left-1/2 transform -translate-x-1/2 z-10 text-center max-w-4xl">
        {/* Bigger, spaced heading */}
        <h1 className="text-6xl md:text-8xl font-extrabold mb-10 md:mb-12 leading-tight gradient-text glow-text">
          <TextType
            text={[
              "Hii! I am Rifan",
              "Hii! I am Refaan",
              "Hii! I am rifaaan",
              "Hii! I am reeefan"
            ]}
            typingSpeed={250}
            pauseDuration={2400}
            deletingSpeed={100}
            showCursor={true}
            cursorBlink={false}
            cursorCharacter="|"
          />
        </h1>

        {/* Larger subtitle + rotating word.
            - `and I love` uses same gradient + glow as H1
            - Rotating text inherits size and uses 'no-blur' & transform-gpu */}
        <h2 className="text-xl md:text-6xl font-semibold mb-6 flex items-center justify-center gap-3">
          <span className="gradient-text glow-text">and I love</span>

          <RotatingText
            texts={["coding", "music", "robots", "coffee", "gaming",]}
            rotationInterval={2700}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-120%", opacity: 0 }}
            staggerDuration={0.02}
            staggerFrom={"last"}
            splitBy="characters"
            mainClassName="inline-block ml-3 h-[1.6em] md:h-[1.4em] pb-[0.2em] overflow-hidden"
            splitLevelClassName="overflow-hidden"
            /* Add gradient + glow to each animated character (so whole word shows gradient) */
            elementLevelClassName="inline-block no-blur transform-gpu leading-[1.5] gradient-text glow-text"
            loop={true}
            auto={true}
          />
        </h2>

        {/* arrow a bit up from bottom */}
        <div className="absolute -bottom-[270px] left-1/2 transform -translate-x-1/2">
          <ArrowDown className="h-6 w-6 text-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
