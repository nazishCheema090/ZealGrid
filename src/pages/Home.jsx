// src/pages/Home.js

import Header from '../components/Header';
import UserDetails from '../components/UserDetails';
import ProjectList from '../components/ProjectList';
import {useSelector, useDispatch} from 'react-redux';
import {signOut} from '../features/auth/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state)=>state.auth.currentUser);

  const handleSignOut = () =>{
    dispatch(signOut())
  }

  // Array of project data
  const projects = [
    {
      id: 1,
      name: "Add Project",
      description: "",
      isAddProject: true,
    },
    {
      id: 2,
      name: "Netflix",
      description: "Netflix website 7fasd5f6",
    },
    {
      id: 3,
      name: "Spotify",
      description: "Spotify clone project",
    },
    {
      id: 4,
      name: "Amazon",
      description: "Amazon website clone",
    },
    {
      id: 5,
      name: "Google",
      description: "Google search clone",
    },
    {
      id: 6,
      name: "Facebook",
      description: "Facebook clone",
    },
    {
      id: 7,
      name: "Twitter",
      description: "Twitter clone project",
    },
    {
      id: 8,
      name: "LinkedIn",
      description: "LinkedIn clone",
    },
    {
      id: 9,
      name: "YouTube",
      description: "YouTube clone project",
    },
    {
      id: 10,
      name: "Instagram",
      description: "Instagram clone project",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <Header currentUser={currentUser} signOut={handleSignOut} />
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
