import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/sign-in/page';
import GetStartedPage from './pages/get-started/page';
import Home from './pages/home/page';
import PrivateRoute from './protected-routes/private-route/page';
import CreateProject from './pages/create-project/page';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';
import {observeAuthState} from './redux/slice/authSlice';


const App = () => {

  //todo: wrap the provider for redux in the app instead of main, after implementing react query

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(observeAuthState());

  },[dispatch]);
  return (
      <Router>
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/getStarted" element={<GetStartedPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/add-project" element={<CreateProject />} />
            </Route>
          </Routes>
      </Router>
  );
};

export default App;
