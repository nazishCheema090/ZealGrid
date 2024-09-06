import Header from "../../components/header/page";
import UserDetails from "../../components/user-details/page";
import ProjectList from "../../components/project-list/page";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/slice/authSlice";
import { projects } from "../../constants/dummyData";

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleSignOut = () => {
    dispatch(signOut());
  };

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
        <ProjectList projects={projects} />
      </div>
    </div>
  );
};

export default Home;
