import React from 'react';
import '../../App.css';
import Searchbar from '../Searchbar';
import { GetAllBrands, GetAllManufacturers, GetAllFigures } from '../API';


function ShowAll(props) {
    //List Variables
    let AllBrandsOrManyfacturers = [];
    let LinkVariable;
    //Counting Variables
    let Counted =[]
    let Allfigures = GetAllFigures();
    let FigureDataForCounting = [];
    //Counts the amount of figures with brand / manufacturer
    function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }
    //Checks what to show
    if(props.type === 'Brands'){
        AllBrandsOrManyfacturers = GetAllBrands();
        LinkVariable = 'Brand';
        for (let index = 0; index < Allfigures.length; index++) {
            FigureDataForCounting.push(Allfigures[index].brand.name)
        }
    }
    if(props.type === 'Manufacturers'){
        AllBrandsOrManyfacturers = GetAllManufacturers();
        LinkVariable = 'Manufacturer';
        for (let index = 0; index < Allfigures.length; index++) {
            FigureDataForCounting.push(Allfigures[index].manufacturer.name)
        }
    }
    //Creates the ListItems and the counted
    let ListItems = [];

    for (let index = 0; index < AllBrandsOrManyfacturers.length; index++) {
        Counted.push(
            getOccurrence(FigureDataForCounting, AllBrandsOrManyfacturers[index].name)
        );
        ListItems.push(
            <a href={'/Figures?'+LinkVariable+'='+AllBrandsOrManyfacturers[index].id}>
                {AllBrandsOrManyfacturers[index].name + " ("+Counted[index]+")"}
            </a>
        );
        ListItems.push(<br></br>)
    };
    return (
        <>
        
            <Searchbar />
            <div className="card w-50 h-50 mt-5 mx-auto">
                <div className='m-3'>
                    {ListItems}
                </div>
            </div>
        </>
    );
}

export default ShowAll;