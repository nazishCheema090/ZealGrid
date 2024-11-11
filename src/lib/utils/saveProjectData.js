// src/lib/utils/saveProjectData.js

import { ref, set } from 'firebase/database';
import { database } from '../../config/firebaseConfig';
import { toast } from 'react-hot-toast';

const sanitizeInput = (input) => input.replace(/[.#$/[\]]/g, '-').trim().toLowerCase();

export const saveProjectData = async (data) => {
  try {
    const validProjectName = sanitizeInput(data.projectName);
    const projectRef = ref(database, validProjectName);

    const formattedData = {
      company_detail: {
        email: data.companyDetail.email,
        name: data.companyDetail.companyName,
        phone_number: data.companyDetail.phone,
      },
      features: {
        labels: data.features.labels || false,
        navigation: data.features.navigation || false,
        toggles: data.features.toggles || false,
      },
    };

    // Initialize labels structure if labels feature is enabled
    if (data.features.labels) {
      formattedData.labels = { pages: {} }; // Ensure pages is an empty object
    }

    await set(projectRef, formattedData);
    toast.success('Project created successfully');
    return formattedData;
  } catch (error) {
    toast.error('Error creating project');
    console.error('Error creating a project: ', error.message);
  }
};
