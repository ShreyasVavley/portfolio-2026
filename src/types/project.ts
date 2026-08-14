export interface Project {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  techStack: string[];
  image: string;
  accentColor: string;
  links: {
    github: string;
    live: string;
  };
}
