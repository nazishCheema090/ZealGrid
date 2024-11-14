import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardListItem from '../../components/common/DashboardListItem';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNavigation,
  addNavigationPageAsync,
  updateNavigationPageAsync,
  removeNavigationPageAsync,
} from '../../redux/slice/navigationSlice';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-hot-toast';
import AddPageModal from '../../components/add-page/page';

const Navigation = () => {
  const { projectName } = useParams();
  const dispatch = useDispatch();

  const [isPageModalOpen, setIsPageModalOpen] = useState(false);

  // Fetch navigation data
  const navigationState = useSelector((state) => state.navigation);
  const { navigationByProject, loading, error } = navigationState;

  useEffect(() => {
    dispatch(fetchNavigation(projectName))
      .unwrap()
      .catch((error) => {
        console.error('Error fetching navigation:', error);
        toast.error(`Failed to fetch navigation: ${error}`);
      });
  }, [dispatch, projectName]);

  // Get pages from Redux store
  const projectData = navigationByProject[projectName] || { pages: {} };
  const pages = projectData.pages || {};

  // Existing page names for validation
  const existingPageNames = Object.keys(pages);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress
          size={50}
          thickness={5}
          color="primary"
          className="mt-20"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <p>Error loading navigation: {error}</p>
      </div>
    );
  }

  const handleAddPage = (newPage) => {
    const { pageName, pagePath } = newPage;
    dispatch(addNavigationPageAsync({ projectName, pageName, pagePath }))
      .unwrap()
      .then(() => {
        toast.success(`Page "${pageName}" added successfully`);
        setIsPageModalOpen(false);
      })
      .catch((error) => {
        console.error('Error adding navigation page:', error);
        toast.error(`Failed to add page: ${error}`);
      });
  };

  const handleUpdatePage = (pageName, currentPagePath) => {
    const newPagePath = prompt('Enter new page path:', currentPagePath);
    if (newPagePath !== null) {
      dispatch(
        updateNavigationPageAsync({
          projectName,
          pageName,
          newPagePath,
        })
      )
        .unwrap()
        .then(() => {
          toast.success(`Page "${pageName}" updated successfully`);
        })
        .catch((error) => {
          console.error('Error updating navigation page:', error);
          toast.error(`Failed to update page: ${error}`);
        });
    }
  };

  const handleRemovePage = (pageName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the page "${pageName}"? This will remove it from navigation.`
    );
    if (confirmDelete) {
      dispatch(removeNavigationPageAsync({ projectName, pageName }))
        .unwrap()
        .then(() => {
          toast.success(`Page "${pageName}" removed successfully`);
        })
        .catch((error) => {
          console.error('Error removing navigation page:', error);
          toast.error(`Failed to remove page: ${error}`);
        });
    }
  };

  return (
    <div className="flex flex-col gap-y-2 mx-20 mt-16 justify-between">
      <span className="text-3xl font-[400]">{projectName} / Navigation</span>
      <span className="text-gray-700 text-lg">
        Manage your navigation pages. Add, update, or remove pages from your navigation.
      </span>
      <div className="w-full h-[1px] bg-gray-900 mt-7" />
      <span className="text-4xl font-[300] text-[#707070] mt-7">Pages</span>

      {/* Table Headers */}
      <div className="grid grid-cols-3 max-w-[1000px] items-center h-[40px] mt-4">
        <span className="text-[20px] text-gray-900 font-[400] text-left ml-[50px] ">
          Name
        </span>
        <span className="text-[20px] text-gray-900 font-[400] text-center ">
          Path
        </span>
        <span className="text-[20px] text-gray-900 font-[400] text-right mr-[20px] ">
          Update Page | Delete Page
        </span>
      </div>

      {/* Pages List */}
      {Object.entries(pages).length > 0 ? (
        Object.entries(pages).map(([pageName, pageData]) => (
          <div className="flex flex-col max-w-[1000px] gap-y-2" key={pageName}>
            <DashboardListItem
              name={pageName}
              value={pageData.pagePath}
              isLabels={false}
              onDelete={() => handleRemovePage(pageName)}
              onUpdate={() => handleUpdatePage(pageName, pageData.pagePath)}
            />
          </div>
        ))
      ) : (
        // Message when there are no pages
        <div className="flex flex-col items-center mt-10">
          <p className="text-xl text-gray-600">
            No pages available. Click the "+" button to add a new page.
          </p>
        </div>
      )}

      {/* Add Page Button */}
      <div className="flex mt-7">
        <div
          className="flex justify-center items-center w-20 h-20 rounded-full bg-slate-300 hover:scale-110 cursor-pointer"
          onClick={() => setIsPageModalOpen(true)}
        >
          <AddIcon
            style={{
              height: '30px',
              width: '30px',
            }}
          />
        </div>
      </div>

      {/* Add Page Modal */}
      {isPageModalOpen && (
        <AddPageModal
          open={isPageModalOpen}
          onClose={() => setIsPageModalOpen(false)}
          onAddPage={handleAddPage}
          existingPageNames={existingPageNames} // Pass existing page names for validation
        />
      )}
    </div>
  );
};

export default Navigation;
