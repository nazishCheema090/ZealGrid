import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardListItem from '../../components/common/DashboardListItem';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-hot-toast';
import {
  addPage,
  removePage,
  updatePage,
} from '../../redux/actions/pageActions';
import {
  fetchLabels,
  addLabelAsync,
  removeLabelAsync,
  updateLabelAsync,
} from '../../redux/slice/labelsSlice';

// Importing components from directories containing page.jsx
import AddLabelModal from '../../components/add-label/page';
import AddPageModal from '../../components/add-page/page';

const Labels = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedPageName, setSelectedPageName] = useState(null);
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);

  // Fetch labels data for the project
  const labelsState = useSelector((state) => state.labels);
  const { labelsByProject, loading, error } = labelsState;

  useEffect(() => {
    dispatch(fetchLabels(projectName));
  }, [dispatch, projectName]);

  // Get labels from Redux store
  const projectData = labelsByProject[projectName] || { pages: {} };
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
        <p>Error loading labels: {error}</p>
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

  const handleAddLabel = (newLabel) => {
    if (selectedPageName) {
      const { labelName, labelValue } = newLabel;
      const selectedPage = pages[selectedPageName];
      // Check for duplicate label names within the page
      if (selectedPage.labels?.[labelName]) {
        toast.error(`Label "${labelName}" already exists on this page.`);
      } else {
        dispatch(
          addLabelAsync({
            projectName,
            pageName: selectedPageName,
            labelName,
            labelValue,
          })
        )
          .then(() => {
            toast.success(`Label "${labelName}" added successfully`);
          })
          .catch((error) => {
            console.error('Error adding label:', error);
            toast.error('Failed to add label. Please try again.');
          });
      }
    }
  };

  const handleUpdateLabel = (labelName, currentValue) => {
    if (selectedPageName) {
      const newLabelValue = prompt('Enter new label value:', currentValue);
      if (newLabelValue !== null) {
        dispatch(
          updateLabelAsync({
            projectName,
            pageName: selectedPageName,
            labelName,
            newLabelValue,
          })
        )
          .then(() => {
            toast.success(`Label "${labelName}" updated successfully`);
          })
          .catch((error) => {
            console.error('Error updating label:', error);
            toast.error('Failed to update label. Please try again.');
          });
      }
    }
  };

  const handleRemoveLabel = (labelName) => {
    if (selectedPageName) {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the label "${labelName}"?`
      );
      if (confirmDelete) {
        dispatch(
          removeLabelAsync({
            projectName,
            pageName: selectedPageName,
            labelName,
          })
        )
          .then(() => {
            toast.success(`Label "${labelName}" removed successfully`);
          })
          .catch((error) => {
            console.error('Error removing label:', error);
            toast.error('Failed to remove label. Please try again.');
          });
      }
    }
  };

  const selectedPage = selectedPageName ? pages[selectedPageName] : null;

  return (
    <div className="flex flex-col gap-y-2 mx-20 mt-16 justify-between">
      {/* Main Title */}
      <span className="text-3xl font-[400]">{projectName} / Labels</span>
      <span className="text-gray-700 text-lg">
        Manage labels for your project.
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
          (selectedPage.labels &&
          Object.keys(selectedPage.labels).length > 0 ? (
            Object.entries(selectedPage.labels).map(
              ([labelName, labelValue]) => (
                <DashboardListItem
                  key={labelName}
                  name={labelName}
                  value={labelValue}
                  isLabels={true}
                  onDelete={() => handleRemoveLabel(labelName)}
                  onUpdate={() => handleUpdateLabel(labelName, labelValue)}
                />
              )
            )
          ) : (
            // Message when there are no labels in the selected page
            <div className="flex flex-col items-center mt-10">
              <p className="text-xl text-gray-600">
                No labels available. Click the "+" button to add a new label.
              </p>
            </div>
          ))}
      </div>

      {selectedPage && (
        <div className="flex mt-7">
          <div
            className="flex justify-center items-center w-20 h-20 rounded-full bg-slate-300 hover:scale-110 cursor-pointer"
            onClick={() => setIsLabelModalOpen(true)}
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
      {isLabelModalOpen && (
        <AddLabelModal
          open={isLabelModalOpen}
          onClose={() => setIsLabelModalOpen(false)}
          onAddLabel={handleAddLabel}
        />
      )}

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

export default Labels;
