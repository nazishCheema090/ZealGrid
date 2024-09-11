import BreadcrumbsComponent from "../common/BreadCrumbs";

const Topbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* Left side: Breadcrumbs */}
      <BreadcrumbsComponent />

      {/* Right side: Other icons */}
      <div className="flex items-center space-x-4">
        {/* Icons (e.g., notification, profile, etc.) */}
      </div>
    </div>
  );
};

export default Topbar;
