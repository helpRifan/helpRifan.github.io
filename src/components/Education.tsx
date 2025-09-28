import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Integrated M.Tech. Computer Science and Engineering (Data Science)",
      school: "Vellore Institute of Technology",
      location: "Chennai, Tamil Nadu",
      period: "2025-2030",
      gpa: "null",
      status: "In Progress",
      description: "Specializing in Computer Science and Engineering with a focus on Data Science, IoT, and Artificial Intelligence.",
      courses: [
        "Data Structures and Algorithms", "Internet of Things (IoT)", "Robotics and Embedded Systems", "Machine Learning and Artificial Intelligence", "Full-Stack Development"],
      current: true,
    },
    {
      degree: "High School Diploma",
      school: "Sri Chaitanya Techno School",
      location: "Perumbakkam, Chennai, Tamil Nadu",
      period: "2023 - 2025",
      gpa: "null",
      status: "Graduated",
      description: "Completed CBSE curriculum with a specialization in Computer Science, focusing on rigorous training in algorithms, programming, and theory.",
      courses: ["Intermediate Programming","Data Structures & Algorithms","Object-Oriented Design","Computational Thinking","Software Development Fundamentals"],
      current: false,
    },
    {
      degree: "Secondary School Diploma",
      school: "BVM Global @ BHS",
      location: "Chennai, Tamil Nadu",
      period: "2011 – 2023",   
      gpa: "null",
      status: "Completed",
      description: "Followed CBSE curriculum focusing on foundational education, core sciences, and life skills across standard subjects.",
      courses: ["English","Mathematics","Science (Physics, Chemistry, Biology)","Social Studies / General Awareness","Life Skills & Moral Education"],
      current: false,
    }

  ];

  const certifications = [
    {
      name: "Full-Stack Web Development Certification",
      issuer: "freeCodeCamp",
      date: "2024",
      credentialId: "FCC-FSD-654321",
    },
    {
      name: "Intermediate Python Programming",
      issuer: "Coursera",
      date: "2023",
      credentialId: "COURSERA-PY-112233",
    },
    {
      name: "IoT and Robotics Certification",
      issuer: "NPTEL",
      date: "2024",
      credentialId: "NPTEL-IOTR-778899",
    },
  ];

  return (
    <section id="education" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
          Education & Learning
        </h2>

        {/* Education Timeline */}
        <div className="space-y-8 mb-16">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`portfolio-card p-8 glow-hover relative ${edu.current ? 'ring-2 ring-primary/50' : ''
                }`}
            >
              {/* Current Badge */}
              {edu.current && (
                <div className="absolute -top-3 left-8">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                    Current
                  </span>
                </div>
              )}

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left: Degree Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start mb-4">
                    <GraduationCap className="w-6 h-6 text-primary mr-3 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {edu.degree}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {edu.school}, {edu.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {edu.period}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {edu.description}
                  </p>

                  {/* Relevant Courses */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      Relevant Coursework:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, courseIndex) => (
                        <span
                          key={courseIndex}
                          className="px-3 py-1 text-sm rounded-full bg-muted text-foreground border border-border"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Stats */}
                <div className="space-y-4">
                  <div className="portfolio-card p-4 bg-card/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {edu.gpa}
                      </div>
                      <div className="text-sm text-muted-foreground">GPA</div>
                    </div>
                  </div>

                  <div className="portfolio-card p-4 bg-card/30">
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground mb-1">
                        {edu.status}
                      </div>
                      <div className="text-sm text-muted-foreground">Status</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">
            Certifications & Achievements
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="portfolio-card p-6 glow-hover text-center"
              >
                <div className="mb-4">
                  <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    {cert.name}
                  </h4>
                  <p className="text-primary font-semibold mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Issued: {cert.date}
                  </p>
                </div>

                <div className="text-xs text-muted-foreground">
                  Credential ID: {cert.credentialId}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Courses Completed", value: "75+" },
            { label: "Certifications", value: "4+" },
            { label: "Robotics Prototypes", value: "5" },
            { label: "Hackathons / Competitions", value: "3+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="portfolio-card p-6 text-center glow-hover"
            >
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;