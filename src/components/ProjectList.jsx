// src/components/ProjectList.js

import PropTypes from 'prop-types'; // Import prop-types
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects }) => {
  return (
    <div className="flex flex-wrap -mx-4">
      {projects.map((project) => (
        <div key={project.id} className="flex-grow max-w-xs p-4">
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
