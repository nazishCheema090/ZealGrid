import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardListItem from '../../components/common/DashboardListItem';
import AddIcon from '@mui/icons-material/Add';
import AddToggleModal from '../../components/add-toggle/page';
import AddPageModal from '../../components/add-page/page';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-hot-toast';
import {
  addPage,
  removePage,
  updatePage,
} from '../../redux/actions/pageActions';
import {
  fetchToggles,
  addToggleAsync,
  removeToggleAsync,
  updateToggleAsync,
} from '../../redux/slice/togglesSlice';

const Toggles = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedPageName, setSelectedPageName] = useState(null);
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);

  // Fetch toggles data for the project
  const togglesState = useSelector((state) => state.toggles);
  const { togglesByProject, loading, error } = togglesState;

  React.useEffect(() => {
    dispatch(fetchToggles(projectName));
  }, [dispatch, projectName]);

  // Get toggles from Redux store
  const projectData = togglesByProject[projectName] || { pages: {} };
  const pages = projectData.pages || {};

  // Existing page names for validation
  const existingPageNames = Object.keys(pages);

  const [errorMessage, setErrorMessage] = useState('');

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
        <p>Error loading toggles: {error}</p>
      </div>
    );
  }

  const handleAddPage = (newPage) => {
    const { pageName, pagePath } = newPage;
    dispatch(addPage({ projectName, pageName, pagePath }))
      .then(() => {
        setSelectedPageName(pageName);
        setErrorMessage('');
        setIsPageModalOpen(false);
        toast.success(`Page "${pageName}" added successfully`);
      })
      .catch((error) => {
        console.error('Error adding page:', error);
        setErrorMessage('Failed to add page. Please try again.');
        toast.error('Failed to add page. Please try again.');
      });
  };

  const handleRemovePage = (pageName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the page "${pageName}"? This will remove it from all features.`
    );
    if (confirmDelete) {
      dispatch(removePage({ projectName, pageName }))
        .then(() => {
          if (selectedPageName === pageName) {
            setSelectedPageName(null);
          }
          setErrorMessage('');
          toast.success(`Page "${pageName}" removed successfully`);
        })
        .catch((error) => {
          console.error('Error removing page:', error);
          setErrorMessage('Failed to delete page. Please try again.');
          toast.error('Failed to delete page. Please try again.');
        });
    }
  };

  const handleAddToggle = (newToggle) => {
    if (selectedPageName) {
      const { toggleName, toggleValue, isActive } = newToggle;
      const selectedPage = pages[selectedPageName];
      // Check for duplicate toggle names within the page
      if (selectedPage.toggles?.[toggleName]) {
        toast.error(`Toggle "${toggleName}" already exists on this page.`);
      } else {
        dispatch(
          addToggleAsync({
            projectName,
            pageName: selectedPageName,
            toggleName,
            toggleValue,
            isActive,
          })
        )
          .then(() => {
            toast.success(`Toggle "${toggleName}" added successfully`);
          })
          .catch((error) => {
            console.error('Error adding toggle:', error);
            toast.error('Failed to add toggle. Please try again.');
          });
      }
    }
  };

  const handleUpdateToggle = (toggleName, currentData) => {
    if (selectedPageName) {
      const newToggleValue = prompt(
        'Enter new toggle value:',
        currentData.toggleValue
      );
      const newIsActive = window.confirm(
        'Is the toggle active? Click OK for Yes, Cancel for No.'
      );
      if (newToggleValue !== null) {
        dispatch(
          updateToggleAsync({
            projectName,
            pageName: selectedPageName,
            toggleName,
            newToggleValue,
            newIsActive,
          })
        )
          .then(() => {
            toast.success(`Toggle "${toggleName}" updated successfully`);
          })
          .catch((error) => {
            console.error('Error updating toggle:', error);
            toast.error('Failed to update toggle. Please try again.');
          });
      }
    }
  };

  const handleRemoveToggle = (toggleName) => {
    if (selectedPageName) {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the toggle "${toggleName}"?`
      );
      if (confirmDelete) {
        dispatch(
          removeToggleAsync({
            projectName,
            pageName: selectedPageName,
            toggleName,
          })
        )
          .then(() => {
            toast.success(`Toggle "${toggleName}" removed successfully`);
          })
          .catch((error) => {
            console.error('Error removing toggle:', error);
            toast.error('Failed to remove toggle. Please try again.');
          });
      }
    }
  };

  const selectedPage = selectedPageName ? pages[selectedPageName] : null;

  return (
    <div className="flex flex-col gap-y-2 mx-20 mt-16 justify-between">
      {/* Main Title */}
      <span className="text-3xl font-[400]">{projectName} / Toggles</span>
      <span className="text-gray-700 text-lg">
        Manage toggles for your project.
      </span>
      <div className="w-full h-[1px] bg-gray-900 mt-7" />

      {/* Back Arrow with Page Title */}
      <div className="flex items-center mt-7">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            if (selectedPageName) {
              setSelectedPageName(null); // Go back to the list of pages
            } else {
              navigate(`/dashboard/${projectName}`); // Go back to project dashboard
            }
          }}
        >
          <ArrowBackIcon style={{ fontSize: '32px', color: '#707070' }} />
        </div>
        <span className="text-4xl font-[300] text-[#707070] ml-4">
          {selectedPage ? `Page / ${selectedPageName}` : 'Pages'}
        </span>
      </div>

      {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}

      <div className="flex flex-col max-w-[1000px] gap-y-2 mt-5">
        {!selectedPage &&
          (Object.keys(pages).length > 0 ? (
            Object.entries(pages).map(([pageName, page]) => (
              <DashboardListItem
                key={pageName}
                name={pageName}
                value={page.pagePath}
                isLabels={false}
                onClick={() => setSelectedPageName(pageName)}
                onDelete={() => handleRemovePage(pageName)}
              />
            ))
          ) : (
            // Message when there are no pages
            <div className="flex flex-col items-center mt-10">
              <p className="text-xl text-gray-600">
                No pages available. Click the "+" button to add a new page.
              </p>
            </div>
          ))}

        {selectedPage &&
          (selectedPage.toggles &&
          Object.keys(selectedPage.toggles).length > 0 ? (
            Object.entries(selectedPage.toggles).map(
              ([toggleName, toggleData]) => (
                <DashboardListItem
                  key={toggleName}
                  name={toggleName}
                  value={`Value: ${toggleData.toggleValue}, Active: ${toggleData.isActive}`}
                  isLabels={true} // You can adjust this prop as needed
                  onDelete={() => handleRemoveToggle(toggleName)}
                  onUpdate={() => handleUpdateToggle(toggleName, toggleData)}
                />
              )
            )
          ) : (
            // Message when there are no toggles in the selected page
            <div className="flex flex-col items-center mt-10">
              <p className="text-xl text-gray-600">
                No toggles available. Click the "+" button to add a new toggle.
              </p>
            </div>
          ))}
      </div>

      {selectedPage && (
        <div className="flex mt-7">
          <div
            className="flex justify-center items-center w-20 h-20 rounded-full bg-slate-300 hover:scale-110 cursor-pointer"
            onClick={() => setIsToggleModalOpen(true)}
          >
            <AddIcon style={{ height: '30px', width: '30px' }} />
          </div>
        </div>
      )}
      {!selectedPage && (
        <div className="flex mt-7">
          <div
            className="flex justify-center items-center w-20 h-20 rounded-full bg-slate-300 hover:scale-110 cursor-pointer"
            onClick={() => setIsPageModalOpen(true)} // Open AddPageModal
          >
            <AddIcon style={{ height: '30px', width: '30px' }} />
          </div>
        </div>
      )}

      {/* Modals */}
      <AddToggleModal
        open={isToggleModalOpen}
        onClose={() => setIsToggleModalOpen(false)}
        onAddToggle={handleAddToggle}
      />

      <AddPageModal
        open={isPageModalOpen}
        onClose={() => setIsPageModalOpen(false)}
        onAddPage={handleAddPage}
        existingPageNames={existingPageNames} // Pass existing page names for validation
      />
    </div>
  );
};

export default Toggles;
