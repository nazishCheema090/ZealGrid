import Header from "../../components/header/page";
import UserDetails from "../../components/user-details/page";
import ProjectList from "../../components/project-list/page";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/slice/authSlice";
// import { projects } from "../../constants/dummyData";
import { useEffect, useState } from "react";
import { database } from "../../config/firebaseConfig";
import { get, ref } from "firebase/database";
import Loading from "../../components/common/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  useEffect(() => {
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
          setProjects(projectArray);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <Header currentUser={currentUser} signOut={handleSignOut} />
        <UserDetails currentUser={currentUser} />
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Your Zeal Grid Projects
          </h3>
        </div>
        {loading ? (
          <div className="flex items-center justify-center mt-10 ">
            <Loading size={50} thickness={5} color="primary" />
          </div>
        ) : (
          <ProjectList projects={projects} />
        )}
      </div>
    </div>
  );
};

export default Home;
