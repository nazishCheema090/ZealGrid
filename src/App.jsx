import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignInPage from './pages/SignInPage';
import GetStartedPage from './pages/GetStarted';
import Home from './pages/Home';
import AddProject from './pages/AddProject1'; // Import the AddProject page
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/getStarted" element={<GetStartedPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add-project" element={<AddProject />} /> {/* Add route for AddProject */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
