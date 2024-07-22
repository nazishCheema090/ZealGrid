// src/pages/Home.js

import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import UserDetails from '../components/UserDetails';
import ProjectList from '../components/ProjectList';

const Home = () => {
  const { currentUser, signOut } = useAuth();

  // Array of project data
  const projects = [
    {
      id: 1,
      name: "Add Project",
      description: "",
      isAddProject: true
    },
    {
      id: 2,
      name: "Netflix",
      description: "Netflix website 7fasd5f6"
    },
    {
      id: 3,
      name: "Netflix",
      description: "Netflix website 7fasd5f6"
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <Header currentUser={currentUser} signOut={signOut} />
        <UserDetails currentUser={currentUser} />
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800">Your Zeal Grid Projects</h3>
        </div>
        <ProjectList projects={projects} />
      </div>
    </div>
  );
};

export default Home;
