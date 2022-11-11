import React from 'react';
import './FigureImage.css';
import { GetFigureById, AddToCollection, CheckAlreadyCollected, DeleteCollected, GetSpecificFigureImageData, GetSpecificFigureImage } from './API';

const FigureImage = props => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')

    let figures = [];
    figures = GetFigureById(id);

    const username = localStorage.getItem("User");

    let Name;
    let Brand;
    let Manufacturer;
    let Character;
    let Line;
    let Edition;
    let Size;
    let Scale;
    if (figures[0] != null) {
        Name = figures[0].name;
        Brand = figures[0].brand.name;
        Manufacturer = figures[0].manufacturer.name;
        Character = figures[0].character.name;
        Line = figures[0].line.name;
        Edition = figures[0].edition.name;
        Size = figures[0].size;
        Scale = figures[0].scale;
    }

    function CollectionHandler(AddOrRemove) {
        if (AddOrRemove === true) {
            if (username != null && id !== 0) {
                AddToCollection(username, id);
            }
        }
        else {
            if (username != null && id !== 0) {
                DeleteCollected(username, id);
            }
        }
    }

    let images = [];
    images = GetSpecificFigureImageData(id);
    let classUse;
    let ImageName = []
    if (images.length !== 0) {
        for (let index = 0; index < images.length; index++) {
            ImageName.push(images[index].imgData)
        }
        console.log(ImageName)
        for (let index = 0; index < ImageName.length; index++) {
            if (index === 0) {
                classUse = "carousel-item active";
                GetSpecificFigureImage(ImageName[index], classUse)
            }
            else {
                classUse = "carousel-item";
                GetSpecificFigureImage(ImageName[index], classUse)
            }

        }

    }
    // let imageList = [];
    let imageButtons = [];
    for (let index = 0; index < images.length; index++) {
        if (index !== 0) {
            imageButtons.push(
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index}></button>
            );
        }
    }

    let checker = false;
    let collected = [];
    if(username){
        collected = CheckAlreadyCollected(username, id);
    }
    if (collected.length !== 0) {
        checker = true;
    }

    return (
        <>
            <div id="carouselExampleControls" className="mt-3 mx-auto carousel slide w-50" >
                <div className="carousel-inner" >
                    <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to='0' className="active" aria-current="true"></button>
                        {imageButtons}
                    </div>
                    <div id='box'>
                        {images.length === 0 &&
                            <div className="carousel-item active">
                                <img src={props.imgSrc} className="d-block w-100" alt="..." />
                            </div>
                        }
                    </div>
                    {images.length !== 0 &&
                        <div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>

                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    }
                </div>
                <div className='row g-0'>
                    <h3>{Name}</h3>
                    <div className='col-8'>
                        <p>
                            Brand: {Brand}
                            <br />
                            By: {Manufacturer}
                            <br />
                            Character: {Character}
                            <br />
                            Line: {Line}
                            <br />
                            Edition: {Edition}
                            <br />
                            Size: {Size} cm
                            <br />
                            Scale: {Scale}
                            <br />
                        </p>
                    </div>
                    <div className='col-4'>
                        {checker &&
                            <button className='bnt-figure btn-figure-reverseNav float-end' onClick={() => { CollectionHandler(false) }}>Remove From Collection</button>
                        }
                        {!checker &&
                            <button className='bnt-figure btn-figure-add float-end' onClick={() => { CollectionHandler(true) }}>Add To Collection</button>
                        }
                        <button className='btn float-end'>
                            {/* fa-solid */}
                            <i className="fa-regular fa-bookmark fa-lg"></i>
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
}

export default FigureImage;