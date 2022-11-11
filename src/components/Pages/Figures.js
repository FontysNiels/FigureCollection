import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import Searchbar from '../Searchbar';


function Figures() {
    return (
        <>
            <Searchbar />
            <Cards page='Figures' />
        </>
    );
}

export default Figures;