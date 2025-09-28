import profilePhoto from "@/assets/profile-photo.jpg";

const About = () => {
  const hobbies = [
    { name: "Coding", icon: "💻" },
    { name: "Robotics", icon: "🤖" },
    { name: "Music", icon: "🎵" },
    { name: "Gaming", icon: "🎮" },
    { name: "Badminton", icon: "🏸" },
    { name: "Photography", icon: "📸" },
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
          About Me
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden glow-border portfolio-card">
                <img
                  src={profilePhoto}
                  alt="Rifan Ajmal"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating glow effect */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 to-purple-glow/20 blur-xl -z-10 float"></div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Bio */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary">
                Hello! I'm Rifan 👋
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I’m currently pursuing Computer Science with Data Science Engineering at
                Vellore Institute of Technology, Chennai. I have a strong passion for robotics
                and a keen interest in exploring the synergy between software, AI, and hardware.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I’ve built a reputation for identifying vulnerabilities in computer systems and
                networks, while also developing and maintaining impactful software applications.
                With a strong foundation in IoT, robotics, and full-stack development,
                I bring together hardware and software expertise to create innovative solutions.
                Driven by curiosity and continuous learning, I stay ahead in emerging technologies
                and strive to build systems that make a lasting impact.
              </p>
            </div>

            {/* Hobbies */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-foreground">
                Interests & Hobbies
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hobbies.map((hobby, index) => (
                  <div
                    key={index}
                    className="portfolio-card p-4 text-center glow-hover"
                  >
                    <div className="text-2xl mb-2">{hobby.icon}</div>
                    <div className="font-medium text-foreground">{hobby.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="portfolio-card p-6 text-center glow-hover">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Projects Built</div>
              </div>
              <div className="portfolio-card p-6 text-center glow-hover">
                <div className="text-3xl font-bold text-primary mb-2">3+</div>
                <div className="text-muted-foreground">Years Coding</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;