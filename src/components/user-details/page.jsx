const UserDetails = ({ currentUser }) => {
  return (
    <div className="mb-8">
      <p className="text-lg text-gray-700">
        {currentUser.displayName || "Taimoor Ellahi Chatha"}
      </p>
      <p className="text-lg text-gray-700">Email: {currentUser.email}</p>
    </div>
  );
};

export default UserDetails;
