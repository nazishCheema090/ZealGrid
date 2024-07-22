// src/components/UserDetails.js

import PropTypes from 'prop-types'; // Import prop-types

const UserDetails = ({ currentUser }) => {
  return (
    <div className="mb-8">
      <p className="text-lg text-gray-700">Name: {currentUser.displayName || 'N/A'}</p>
      <p className="text-lg text-gray-700">Email: {currentUser.email}</p>
    </div>
  );
};

// Add prop type validations
UserDetails.propTypes = {
  currentUser: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserDetails;
