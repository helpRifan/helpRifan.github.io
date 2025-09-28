import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  image_url?: string;
  featured: boolean;
  category: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Loading Projects...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            My Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are some of my favorite projects that showcase my skills and creativity
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-foreground mb-8">Featured Projects</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="backdrop-blur-sm bg-card/80 p-8 rounded-lg border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-3">
                        {project.category}
                      </Badge>
                      <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                        {project.title}
                      </h4>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    {project.live_url && (
                      <Button 
                        size="sm" 
                        className="bg-primary/20 hover:bg-primary/30 text-primary border-primary/30"
                        onClick={() => window.open(project.live_url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                    {project.github_url && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-border/30 hover:bg-card/50"
                        onClick={() => window.open(project.github_url, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-foreground mb-8">Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="backdrop-blur-sm bg-card/80 p-6 rounded-lg border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                    {project.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description.length > 120 
                      ? `${project.description.substring(0, 120)}...` 
                      : project.description
                    }
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs text-muted-foreground">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {project.live_url && (
                        <Button 
                          size="sm" 
                          className="bg-primary/20 hover:bg-primary/30 text-primary"
                          onClick={() => window.open(project.live_url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      {project.github_url && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-border/30 hover:bg-card/50"
                          onClick={() => window.open(project.github_url, '_blank')}
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-border/50 hover:bg-card/50"
            onClick={() => window.open('https://github.com/helpRifan', '_blank')}
          >
            <Github className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
