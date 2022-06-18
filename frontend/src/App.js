import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update/:id" element={<Edit />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
