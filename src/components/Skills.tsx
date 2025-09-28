import { Code2, Database, Cpu, Globe, Smartphone, Brain } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code2 className="w-8 h-8" />,
      skills: [
        { name: "Python", level: 70 },
        { name: "C++", level: 40 },
        { name: "C", level: 60 },
        { name: "SQL", level: 80 },
        { name: "MATLAB", level: 20 },
      ],
    },
    {
      title: "Web Development",
      icon: <Globe className="w-8 h-8" />,
      skills: [
        { name: "Responsive Design", level: 75 },
        { name: "Node.js", level: 50 },
        { name: "HTML/CSS", level: 90 },
        { name: "Git & GitHub", level: 80 },
        { name: "Debugging & Problem Solving", level: 70 },
      ],
    },
    {
      title: "AI/ML & Data Science(Just starting to learn)",
      icon: <Brain className="w-8 h-8" />,
      skills: [
        { name: "TensorFlow", level: 0 },
        { name: "PyTorch", level: 0 },
        { name: "Pandas", level: 0 },
        { name: "NumPy", level: 20 },
        { name: "OpenCV", level: 10 },
      ],
    },
    {
      title: "Tools & Platforms",
      icon: <Database className="w-8 h-8" />,
      skills: [
        { name: "Docker", level: 70 },
        { name: "AI Tools", level: 100 },
        { name: "VS code", level: 95 },
        { name: "Supabase", level: 60 },
        { name: "Linux", level: 70 },
      ],
    },
  ];

  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-foreground font-medium">{name}</span>
        <span className="text-primary font-bold">{level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-purple-glow rounded-full transition-all duration-1000 ease-out glow-hover"
          style={{ 
            width: `${level}%`,
            boxShadow: `0 0 20px hsl(var(--electric-purple) / 0.6)`,
          }}
        />
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
          Skills & Technologies
        </h2>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="portfolio-card p-8 glow-hover"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="text-primary mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skillIndex}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Technologies */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-foreground">
            Other Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Arduino", "Raspberry Pi","ESP-32", "OpenCV","Google AI Studio","Drones","Discord Bots",
               "Linux", "VS Code", "Figma", "Blender", "Cursor","Python","SQL","Canva","Basic Electronics",
               "Working with Sensors","ChatGPT","Web Development","Full stack development","Backend","Frontend"
               ,"Robots","Network"
            ].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-card border border-primary/30 text-foreground glow-hover"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;