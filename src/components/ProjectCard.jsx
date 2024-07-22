// src/components/ProjectCard.js

import PropTypes from 'prop-types'; // Import prop-types
import ZealGridLogo from '../assets/ZealGrid.svg'; // Import the ZealGrid logo

const ProjectCard = ({ project }) => {
  return (
    <div className="w-full h-48 bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center justify-center rounded-lg shadow-lg p-4">
      <img
        src={ZealGridLogo}
        alt={project.name}
        className="w-12 h-12 mb-4"
      />
      <h4 className="text-white text-lg font-semibold mb-1">{project.name}</h4>
      {!project.isAddProject && (
        <p className="text-gray-200 text-sm">{project.description}</p>
      )}
    </div>
  );
};

// Add prop type validations
ProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    isAddProject: PropTypes.bool,
  }).isRequired,
};

export default ProjectCard;
