// src/pages/labels/Labels.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardListItem from '../../components/common/DashboardListItem';
import AddIcon from '@mui/icons-material/Add';
import AddLabelModal from '../../components/add-label/page';
import { useSelector } from 'react-redux';
import { useFetchLabels } from '../../hooks/useFetchLabels'; // Adjusted import
import { useAddLabelPage } from '../../hooks/useAddLabelPage';
import { useAddLabel } from '../../hooks/useAddLabel';
import { useRemoveLabel } from '../../hooks/useRemoveLabel';
import { useRemoveLabelPage } from '../../hooks/useRemoveLabelPage';
import { useUpdateLabel } from '../../hooks/useUpdateLabel';
import { CircularProgress } from '@mui/material';

const Labels = () => {
  const { projectName } = useParams();
  const [selectedPage, setSelectedPage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch labels data for the project
  const { isLoading, isError } = useFetchLabels(projectName); // Adjusted hook

  // Get labels from Redux store
  const labelsByProject = useSelector((state) => state.labels.labelsByProject);
  const projectLabels = labelsByProject[projectName] || {};

  // Mutations for adding/removing/updating pages and labels
  const addLabelPageMutation = useAddLabelPage();
  const addLabelMutation = useAddLabel();
  const removeLabelMutation = useRemoveLabel();
  const removeLabelPageMutation = useRemoveLabelPage();
  const updateLabelMutation = useUpdateLabel();

  const [errorMessage, setErrorMessage] = useState('');

  if (isLoading) {
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

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <p>Error loading labels.</p>
      </div>
    );
  }

  const handleAddPage = () => {
    const pageName = prompt('Enter page name:');
    if (pageName) {
      if (projectLabels[pageName]) {
        alert(`Page "${pageName}" already exists.`);
      } else {
        // Ensure page name is unique and valid
        addLabelPageMutation.mutate(
          { projectName, pageName },
          {
            onSuccess: () => {
              // Set the selected page to the newly added page
              setSelectedPage(pageName);
              setErrorMessage('');
            },
            onError: (error) => {
              console.error('Error adding label page:', error);
              setErrorMessage('Failed to add page. Please try again.');
            },
          }
        );
      }
    }
  };

  const handleAddLabel = (newLabel) => {
    if (selectedPage) {
      const { name: labelKey, value: labelValue } = newLabel;
      // Check for duplicate label keys within the page
      if (projectLabels[selectedPage]?.[labelKey]) {
        alert(`Label "${labelKey}" already exists on this page.`);
      } else {
        addLabelMutation.mutate({
          projectName,
          pageName: selectedPage,
          labelKey,
          labelValue,
        });
      }
    }
  };

  const handleUpdateLabel = (labelKey, currentValue) => {
    const newLabelValue = prompt('Enter new label value:', currentValue);
    if (newLabelValue !== null) {
      updateLabelMutation.mutate({
        projectName,
        pageName: selectedPage,
        labelKey,
        newLabelValue,
      });
    }
  };

  const handleRemoveLabel = (labelKey) => {
    if (selectedPage) {
      removeLabelMutation.mutate({
        projectName,
        pageName: selectedPage,
        labelKey,
      });
    }
  };

  const handleRemovePage = (pageName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the page "${pageName}"? This will remove all labels within this page.`
    );
    if (confirmDelete) {
      removeLabelPageMutation.mutate({ projectName, pageName });
      if (selectedPage === pageName) {
        setSelectedPage(null);
      }
    }
  };

  const pages = Object.keys(projectLabels);

  return (
    <div className="flex flex-col gap-y-2 mx-20 mt-16 justify-between">
      <span className="text-3xl font-[400]">{projectName} / Labels</span>
      <span className="text-gray-700 text-lg">
        Manage labels for your project.
      </span>
      <div className="w-full h-[1px] bg-gray-900 mt-7" />

      <span className="text-4xl font-[300] text-[#707070] mt-7">
        {selectedPage ? `Page / ${selectedPage}` : 'Pages'}
      </span>

      {errorMessage && (
        <div className="text-red-500 mb-2">{errorMessage}</div>
      )}

      <div className="flex flex-col max-w-[1000px] gap-y-2">
        {!selectedPage &&
          (pages.length > 0 ? (
            pages.map((page) => (
              <DashboardListItem
                key={page}
                name={page}
                isLabels={false}
                onClick={() => setSelectedPage(page)}
                onDelete={() => handleRemovePage(page)}
              />
            ))
          ) : (
            <p>No pages available. Add a new page to get started.</p>
          ))}

        {selectedPage &&
          (projectLabels[selectedPage] &&
          Object.keys(projectLabels[selectedPage]).length > 0 ? (
            Object.entries(projectLabels[selectedPage]).map(
              ([labelKey, labelValue]) => (
                <DashboardListItem
                  key={labelKey}
                  name={labelKey}
                  value={labelValue}
                  isLabels={true}
                  onDelete={() => handleRemoveLabel(labelKey)}
                  onUpdate={() => handleUpdateLabel(labelKey, labelValue)}
                />
              )
            )
          ) : (
            <p>No labels available. Add a new label to get started.</p>
          ))}
      </div>

      {selectedPage && (
        <div className="flex mt-7">
          <div
            className="flex justify-center items-center w-20 h-20 rounded-full bg-slate-300 hover:scale-110 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <AddIcon style={{ height: '30px', width: '30px' }} />
          </div>
        </div>
      )}
      {!selectedPage && (
        <div className="flex mt-7">
          <div
            className="flex justify-center items-center w-20 h-20 rounded-full bg-slate-300 hover:scale-110 cursor-pointer"
            onClick={handleAddPage}
          >
            <AddIcon style={{ height: '30px', width: '30px' }} />
          </div>
        </div>
      )}

      <AddLabelModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddLabel={handleAddLabel}
      />
    </div>
  );
};

export default Labels;
