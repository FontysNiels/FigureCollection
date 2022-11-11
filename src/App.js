import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from
  'react-router-dom';
import Home from './components/Pages/Home';
import Navbar from './components/Navbar';
import Figures from './components/Pages/Figures';
import Figure from './components/Pages/Figure';
import ShowAll from './components/Pages/ShowAll';
import AddEdit from './components/AddEdit';
import Login from './components/Pages/Login';
import Profile from './components/Pages/Profile';

function App() {

  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/Login' exact element={<Login />} />
          <Route path='/Profile' exact element={<Profile />} />
          <Route path='/Figures' exact element={<Figures />} />
          <Route path='/Figure' exact element={<Figure />} />
          <Route path='/Admin' exact element={<AddEdit />} />
          <Route path='/ShowAll'>
            <Route path='Brands' element={<ShowAll type='Brands'/>}/>
            <Route path='Manufacturers' element={<ShowAll type='Manufacturers'/>}/>
            <Route path='Figures' element={<Figures/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
