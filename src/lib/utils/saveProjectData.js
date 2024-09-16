import { ref, set } from "firebase/database";
import { database } from "../../config/firebaseConfig";
import { toast } from "react-hot-toast";

export const saveProjectData = async (data) => {
  try {
    const validProjectName = data.projectName.replace(/[.#$/[\]]/g, "-");
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
        toogles: data.features.toogles || false,
      },
    };

    await set(projectRef, formattedData);
    toast.success("project created successfully");
    return formattedData;
  } catch (error) {
    toast.error("Error creating project");
    console.error("Error creating a project: ", error.message);
  }
};
