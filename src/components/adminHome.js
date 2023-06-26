import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

function AdminHome({ userData }) {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(3);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;
    // getUser();
    getPaginatedUsers();
  }, []);

  //get all user
  const getUser = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3500/getAllUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        // console.log(data.data);
        // console.log(data.data.data);
        setData(data.data);
        // console.log(response.data.data);
      });
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      const token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3500/deleteUser",
          { userId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          //   console.log(response.data);
          alert(response.data);
          getUser();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  }

  function changeLimit() {
    currentPage.current = 1;
    getPaginatedUsers();
  }

  function getPaginatedUsers() {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://localhost:3500/paginatedUsers?page=${currentPage.current}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        // console.log(data.data, "userData");
        // console.log(data);
        // console.log(data.data);
        // console.log(data.data.result);
        setPageCount(data.data.pageCount);
        setData(data.data.result);
      });
  }

  return (
    <div style={{ width: "auto" }} className="m-2">
      <h1>Welcome Admin</h1>
      <table style={{ width: 400 }}>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>User Type</th>
          <th>Delete</th>
        </tr>
        {data.map((i) => {
          return (
            <tr>
              <td>{i.firstName}</td>
              <td>{i.email}</td>
              <td>{i.userType}</td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(i._id, i.firstName)}
                />
              </td>
            </tr>
          );
        })}
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        forcePage={currentPage.current - 1}
      />
      <input placeholder="Limit" onChange={(e) => setLimit(e.target.value)} />
      <button onClick={changeLimit}>Set Limit</button>
      <button onClick={logOut} className="btn btn-primary m-2">
        Log Out
      </button>{" "}
    </div>
  );
}

export default AdminHome;
