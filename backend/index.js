const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
const users = require('./models/userSchema');

app.use(cors());
app.use(express.json());

const DB = process.env.MONGODB_URI;

// ==========database connection========
mongoose
  .connect(DB, {})
  .then(() => {
    console.log('database connection established');
  })

  .catch((err) => {
    console.log('no connection');
  });

// ========data sent to database===========

app.post('/register', async (req, res) => {
  // console.log(req.body);
  const { name, age, work, email, mobile, address, description } = req.body;

  if (!name || !email || !work || !mobile || !address || !description || !age) {
    res.status(404).send('please fill the data');
  }

  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json('this  user is already present');
    } else {
      const adduser = new users({
        name,
        email,
        age,
        mobile,
        work,
        address,
        description,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// ============get data from database===========
app.get('/getdata', async (req, res) => {
  users.find({}, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

// ==========get individual data=================
app.get('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const individual = await users.findById({ _id: id });
    console.log(individual);
    res.status(201).json(individual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// ===========update data==============
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updateuser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateuser);
  } catch (err) {
    res.status(422).json(err);
  }
});

// =========data delete from database==========
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  await users.findByIdAndRemove(id).exec();
  res.send('deleted');
});

// PORT

app.listen(process.env.PORT || 5000, () => {
  console.log('you are connected');
});
