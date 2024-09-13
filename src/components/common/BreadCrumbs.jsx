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
      <Link to={`/dashboard/${projectName}`} className="text-gray-500 text-2xl">
        Dashboard
      </Link>

      {pathnames.length === 2 && pathnames[0] === "dashboard" && (
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
        if (value === projectName || value === "dashboard") return null;

        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return (
          <Typography
            color="textPrimary"
            sx={{
              fontSize: "1.5rem",
            }}
            key={to}
          >
            {value}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
