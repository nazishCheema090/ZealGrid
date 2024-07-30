import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import SignInPage from './pages/SignInPage';
import GetStartedPage from './pages/GetStarted';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import CreateProject from './pages/CreateProject';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ProjectProvider>
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/getStarted" element={<GetStartedPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/add-project" element={<CreateProject />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
