import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
  const { id } = useParams();

  let navigate = useNavigate();

  const [inpval, setInpval] = useState({
    name: '',
    email: '',
    age: '',
    mobile: '',
    work: '',
    address: '',
    desc: '',
  });
  const setdata = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setInpval((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
    // console.log(inpval);
  };

  // ===========update data===============
  const updateuser = (e) => {
    e.preventDefault();
    const { name, email, work, address, mobile, description, age } = inpval;

    Axios.put(`https://mern-crud17.herokuapp.com/update/${id}`, {
      name,
      email,
      work,
      address,
      mobile,
      description,
      age,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 422) {
          alert('fail');
        } else {
          navigate('/');
          toast.success('data updated successfully!', {
            position: 'top-center',
            autoClose: 5000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //=========== get individual data for auto filup==============
  useEffect(() => {
    Axios.get(`https://mern-crud17.herokuapp.com/details/${id}`)
      .then((response) => {
        setInpval(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="container">
      <Link to="/">
        <i className="fa-solid fa-arrow-left "></i>
        home
      </Link>
      <form className="mt-5 ">
        <div className="row">
          <div className="mb-3 col-md-6 col-lg-6 col-12 ">
            <label for="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="enter your name"
              name="name"
              onChange={setdata}
              value={inpval.name}
              required
            />
          </div>
          <div className="mb-3 col-md-6 col-lg-6 col-12">
            <label for="exampleFormControlInput1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              name="email"
              onChange={setdata}
              value={inpval.email}
              required
            />
          </div>
          <div className="mb-3 col-md-6 col-lg-6 col-12">
            <label for="exampleFormControlInput1" className="form-label">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="enter your age"
              name="age"
              onChange={setdata}
              value={inpval.age}
              required
            />
          </div>
          <div className="mb-3 col-md-6 col-lg-6 col-12">
            <label for="exampleFormControlInput1" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="enter your mobile"
              name="mobile"
              onChange={setdata}
              value={inpval.mobile}
              required
            />
          </div>
          <div className="mb-3 col-md-6 col-lg-6 col-12">
            <label for="exampleFormControlInput1" className="form-label">
              Work
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="enter your work"
              name="work"
              onChange={setdata}
              value={inpval.work}
              required
            />
          </div>
          <div className="mb-3 col-md-6 col-lg-6 col-12">
            <label for="exampleFormControlInput1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="enter your address"
              name="address"
              onChange={setdata}
              value={inpval.address}
              required
            />
          </div>
          <div className="mb-3 col-md-12 col-lg-12 col-12">
            <label for="exampleFormControlInput1" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              value={inpval.description}
              onChange={setdata}
              required
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={updateuser}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
