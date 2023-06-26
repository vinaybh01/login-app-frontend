import React from "react";

function UserHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    <div>
      <h1>
        Name: {userData.firstName} {userData.lastName}
      </h1>
      <h1>Email: {userData.email}</h1>
      <button onClick={logOut} className="btn btn-primary">
        Log Out
      </button>{" "}
    </div>
  );
}

export default UserHome;
