// src/components/ProjectList.js

import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';

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

// Add prop type validations
ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      isAddProject: PropTypes.bool,
    })
  ).isRequired,
};

export default ProjectList;
