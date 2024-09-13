import Header from "../../components/header/page";
import ProjectList from "../../components/project-list/page";
import { useEffect, useState } from "react";
import { database } from "../../config/firebaseConfig";
import { get, ref } from "firebase/database";
import Loading from "../../components/common/Loading";
import CustomButton from "../../components/common/CustomButton";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSignOut } from "../../hooks/useSignOut";
import { useAuthState } from "../../hooks/useAuthState";

const Home = () => {
  const { mutate: signOut } = useSignOut();
  const { data: currentUser } = useAuthState();
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSignOut = () => {
    signOut();
  };

  const fetchProjects = async () => {
    try {
      const projectRef = ref(database);
      const snapshot = await get(projectRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const projectArray = Object.keys(data).map((key) => ({
          id: key,
          name: key,
          ...data[key],
        }));
        setProjectList(projectArray);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <Header currentUser={currentUser} signOut={handleSignOut} />
        <div className="mb-6 flex justify-between ">
          <h3 className="text-xl font-bold text-gray-800">
            Your Zeal Grid Projects
          </h3>
          <CustomButton
            onClick={() => navigate("/add-project")}
            variant="contained"
            className="mb-8"
            color="primary"
          >
            <AddIcon />
          </CustomButton>
        </div>
        <div className=" flex justify-end  "></div>
        {loading ? (
          <div className="flex items-center justify-center">
            <Loading
              size={50}
              thickness={5}
              color="primary"
              className="mt-20"
            />
          </div>
        ) : (
          <ProjectList projects={projectList} />
        )}
      </div>
    </div>
  );
};

export default Home;
