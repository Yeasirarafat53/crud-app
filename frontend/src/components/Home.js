import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  // ==== get data ====
  useEffect(() => {
    Axios.get('https://mern-crud17.herokuapp.com/getdata')
      .then((response) => {
        setUserdata(response.data);
        // console.log(listofFriend);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ====== delete data individually =======
  const deleteUser = (id) => {
    Axios.delete(`https://mern-crud17.herokuapp.com/delete/${id}`).then(() => {
      setUserdata(
        getuserdata.filter((val) => {
          return val._id !== id;
        })
      );
    });
  };
  return (
    <div className="container mt-5">
      <div className="add_btn d-flex justify-content-end">
        <Link to="/register">
          <button className="btn btn-secondary">
            <i className="fa-solid fa-plus"></i> Add Data
          </button>
        </Link>
      </div>

      <table className="table mt-3">
        <thead>
          <tr className="table-success">
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Job</th>
            <th scope="col">Number</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {getuserdata.map((data, id) => (
            <tr key={id}>
              <th scope="row">{id + 1}</th>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.work}</td>
              <td>{data.mobile}</td>
              <td className="d-flex justify-content-evenly">
                <NavLink to={`details/${data._id}`}>
                  <button className="btn btn-success">
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </NavLink>
                <NavLink to={`update/${data._id}`}>
                  <button className="btn btn-primary">
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </NavLink>

                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteUser(data._id);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Home;
