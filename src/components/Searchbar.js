import React from 'react';
import '../App.css';


function Searchbar() {
  return (
    <div className='Searchbar'>
      <div class="input-group mx-auto w-25">
        
        <input type='text' className='form-control w-75 mx-auto' placeholder='Search'></input>
        <button className='bnt-figure btn-search'>Search</button>
      </div>
      
     
    </div>
  );
}

export default Searchbar;