import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Axios from 'axios';

const Details = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { id } = useParams('');

  useEffect(() => {
    Axios.get(`https://mern-crud17.herokuapp.com/details/${id}`)
      .then((response) => {
        setUserdata(response.data);
        // console.log(getuserdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
    <div className="container mt-5 d-flex justify-content-center">
      {/* <h1 style={{ fontWeight: 400 }}>Welcome {getuserdata.name}</h1> */}
      <div className="card" style={{ maxWidth: 600 }}>
        <div className="card-body">
          <div className="add_btn d-flex justify-content-between">
            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
            <div className="btnn">
              <NavLink to={`/update/${getuserdata._id}`}>
                <button className="btn btn-primary mx-2">
                  <i className="fa-solid fa-pen"></i>
                </button>
              </NavLink>
              <button
                className="btn btn-danger"
                onClick={() => deleteUser(getuserdata._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              {/* <img src="/profile.png" style={{ width: 60 }} alt="profile" /> */}
              <h5 className="mt-3">
                Name: <span>{getuserdata.name}</span>
              </h5>
              <p className="mt-3">
                <i class="fa-solid fa-image-portrait"></i>
                Age: <span>{getuserdata.age}</span>
              </p>
              <p className="mt-3">
                <i className="fa-solid fa-envelope"></i>
                Email: <span>{getuserdata.email}</span>
              </p>
            </div>
            <div className="right_view  col-lg-6 col-md-6 col-12">
              <p className="mt-3">
                <i className="fa-solid fa-briefcase"></i>
                Occuption: <span>{getuserdata.work}</span>
              </p>
              <p className="mt-3">
                <i className="fa-solid fa-mobile-screen-button"></i>
                mobile: <span>+91 {getuserdata.mobile}</span>
              </p>
              <p className="mt-3">
                <i className="fa-solid fa-location-dot"></i>
                location: <span>{getuserdata.address}</span>
              </p>
              <p className="mt-3">
                <i class="fa-solid fa-pen"></i>
                Description: <span>{getuserdata.description}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
