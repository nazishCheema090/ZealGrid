import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";

const BreadcrumbsComponent = () => {
  const { projectName } = useParams();
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<Typography sx={{ fontSize: "2rem" }}>/</Typography>}
    >
      <Link
        to={`/project-details/${projectName}`}
        className="text-gray-500 text-2xl"
      >
        Dashboard
      </Link>

      {pathnames.length === 2 && pathnames[0] === "project-details" && (
        <Typography
          color="textPrimary"
          sx={{
            fontSize: "1.5rem",
          }}
        >
          overview
        </Typography>
      )}

      {pathnames.map((value, index) => {
        if (value === projectName || value === "project-details") return null;

        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return isLast ? (
          <Typography
            color="textPrimary"
            sx={{
              fontSize: "1.5rem",
            }}
            key={to}
          >
            {value}
          </Typography>
        ) : (
          <Link to={to} key={to} className="text-gray-500 text-2xl ">
            {value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
