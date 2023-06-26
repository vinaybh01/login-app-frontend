import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserHome from "./userHome";
import AdminHome from "./adminHome";

function UserDetails() {
  const [admin, setAdmin] = useState(false);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3500/userData", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.user.userType === "Admin") {
          setAdmin(true);
        }
        // console.log(response.data.user.userType);
        setUserData(response.data.user);
        // console.log(response.data.user);
        if (response.data.user === undefined) {
          alert("TOken expired Pls login again");
          navigate("/sign-in");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return admin ? (
    <AdminHome userData={userData} />
  ) : (
    <UserHome userData={userData} />
  );
}

export default UserDetails;
