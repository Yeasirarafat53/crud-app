import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import swal from 'sweetalert';

const Register = () => {
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
  // ========== post data frontend to backend ==========
  const addinputdata = async (e) => {
    e.preventDefault();

    const { name, email, work, address, mobile, description, age } = inpval;

    Axios.post('https://mern-crud17.herokuapp.com/register', {
      name,
      email,
      work,
      address,
      mobile,
      description,
      age,
    }).then((res) => {
      console.log(res);
      if (res.status === 422) {
        toast.error('oppss!! data not added', {
          position: 'top-center',
          autoClose: 5000,
        });
      } else {
        navigate('/');
        // swal('Hello world!');
        toast.success('data added successfully!', {
          position: 'top-center',
          autoClose: 5000,
        });
      }
    });

    // const res = await fetch('http://localhost:5000/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name,
    //     email,
    //     work,
    //     address,
    //     mobile,
    //     description,
    //     age,
    //   }),
    // });

    // const data = await res.json();
    // console.log(data);
  };

  return (
    <div className="container">
      <Link to="/">
        <i className="fa-solid fa-arrow-left "></i>
        home
      </Link>
      <form className="mt-5 " onSubmit={addinputdata}>
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
            // onClick={addinputdata}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
