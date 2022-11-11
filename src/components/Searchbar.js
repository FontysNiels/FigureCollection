import React from 'react';
import '../App.css';
import { Button } from './Button';


function Searchbar() {
  return (
    <div className='Searchbar'>
    <input type='text' placeholder='Search'></input>
    <Button className='btn' buttonStyle='btn--outline--red' buttonSize='btn--medium'>Search</Button>
    </div>
  );
}

export default Searchbar;