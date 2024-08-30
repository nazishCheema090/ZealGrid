import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import GetStartedPage from './pages/GetStarted';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import CreateProject from './pages/CreateProject';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';
import {observeAuthState} from './features/auth/authSlice';
import { ProjectProvider } from './context/ProjectContext';


const App = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(observeAuthState());

  },[dispatch]);
  return (
      <Router>
        {/* <ProjectProvider> */}
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/getStarted" element={<GetStartedPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/add-project" element={<CreateProject />} />
            </Route>
          </Routes>
        {/* </ProjectProvider> */}
      </Router>
  );
};

export default App;
