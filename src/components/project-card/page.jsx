// src/components/ProjectCard.js

import ZealGridLogo from '../../assets/ZealGrid.svg';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const gradientStyle = {
    background: 'linear-gradient(to right, #7065F0, rgba(64, 58, 138, 0.7))',
  };

  return (
    <Link
      to={project.isAddProject ? "/add-project" : "#"}
      className="flex flex-col items-center justify-center rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
      style={{ ...gradientStyle, width: '100%', height: '200px', textDecoration: 'none' }}
    >
      {project.isAddProject ? (
        <div className="flex flex-col items-center justify-center">
          <AddIcon className="w-12 h-12 mb-2 text-white" />
          <h4 className="text-white text-lg font-semibold">Add Project</h4>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
            <img
              src={ZealGridLogo}
              alt={project.name}
              className="w-12 h-12"
            />
          </div>
          <h4 className="text-white text-lg font-semibold mb-1">{project.name}</h4>
          <p className="text-white text-sm">{project.description}</p>
        </div>
      )}
    </Link>
  );
};



export default ProjectCard;
