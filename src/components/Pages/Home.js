import React from 'react';
import '../../App.css';
// import { Button } from '../Button';
import Cards from '../Cards';
import Searchbar from '../Searchbar';

function Home() {
  return (
    <>
      <Searchbar />
      <Cards page='Home' />
    </>
  );
}

export default Home;