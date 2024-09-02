import { useNavigate } from 'react-router-dom';
import ZealGridLogo from '../../assets/ZealGrid.svg';

const GetStartedPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home'); 
  };

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto p-8 flex flex-col items-center">
        {/* First Child Div */}
        <div className="flex  items-center mb-16">
          <img
            src={ZealGridLogo}
            alt="ZealGrid Logo"
            className="mb-4 transition-transform duration-500 ease-in-out hover:scale-110"
            style={{ width: '436px', height: '252px' }}
          />
          <p
            className="text-center text-black"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '300',
              fontSize: '60px',
              lineHeight: '90px',
              transition: 'transform 0.5s',
            }}
          >
            Welcome to ZealGrid Dashboard
          </p>
        </div>

        {/* Second Child Div */}
        <div className="flex justify-end w-full">
          <button
            onClick={handleGetStarted}
            className="py-4 px-12  text-white rounded-full text-2xl font-medium focus:outline-none"
            style={{
              width: '276px',
              height: '98px',
              borderRadius: '50px',
              backgroundColor: '#175CFF',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '300',
                fontSize: '25px',
                lineHeight: '37.5px',
              }}
            >
              Get Started
            </span>
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
