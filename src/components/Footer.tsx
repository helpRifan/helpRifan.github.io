import { Github, Linkedin, Instagram, Mail, Heart } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/helpRifan",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/rifan-ajmal-756a5b352/",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:rifanajmal@gmail.com",
    },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">Rifan Ajmal</h3>
            <p className="text-muted-foreground leading-relaxed">
            Innovator at heart, Wanted to be Doctor, Forced to be an engineer,
            Learning endlessly, building fearlessly, dreaming without limits.
           </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 glow-hover"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 w-fit"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Get in Touch</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>rifanajmal@gmail.com</p>
              <p>+91 9444094054</p>
              <p>Tamilnadu, India</p>
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Available for work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 Rifan. All rights reserved.
            </p>
            <div className="flex items-center text-muted-foreground text-sm">
              Made with Lovely & Ishta <Heart className="w-4 h-4 mx-1 text-red-500" />
            </div>
          </div>
        </div>

        {/* Subtle glow line */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;
