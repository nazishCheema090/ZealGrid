import { useState } from "react";
import ProjectCard from "../project-card/page";
import { Pagination, MenuItem, Select, FormControl } from "@mui/material";

const projectsPerPageMenuItems = [10, 20, 50, 100];

const ProjectList = ({ projects }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(
    projectsPerPageMenuItems[0]
  );

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const currentProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  const handleProjectsPerPageChange = (event) => {
    setProjectsPerPage(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex justify-center gap-2 p-4">
        <span className="text-lg text-gray-800">
          Select the amount of projects you want to diaplay per page:
        </span>
        <FormControl variant="outlined" size="small">
          <Select
            value={projectsPerPage}
            onChange={handleProjectsPerPageChange}
            displayEmpty
            inputProps={{ "aria-label": "Projects per page" }}
          >
            {projectsPerPageMenuItems.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="flex flex-wrap justify-center gap-4 p-4">
        {currentProjects.map((project) => (
          <div key={project.id} className="flex-shrink-0 w-64">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </>
  );
};

export default ProjectList;
