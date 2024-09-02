// src/components/ProjectList.js

import ProjectCard from  '../project-card/page';

const ProjectList = ({ projects }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {projects.map((project) => (
        <div key={project.id} className="flex-shrink-0 w-64">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};



export default ProjectList;
