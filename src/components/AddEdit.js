import React from 'react';
import axios from 'axios';
import { GetAllBrands, GetAllManufacturers, GetAllCharacters, GetAllLines, GetAllEditions, GetAllFigures, AddFigureImage } from './API';

function AddEdit(props) {
    let AllBrands = [];
    let AllManufacturers = [];
    let AllCharacters = [];
    let AllLines = [];
    let AllEditions = [];
    let AllFigures = [];


    AllBrands = GetAllBrands();
    AllManufacturers = GetAllManufacturers();
    AllCharacters = GetAllCharacters();
    AllLines = GetAllLines();
    AllEditions = GetAllEditions();
    AllFigures = GetAllFigures();

    let SelectBrands = [];
    let SelectManufacturers = [];
    let SelectCharacters = [];
    let SelectLines = [];
    let SelectEditions = [];

    let ListItems = [];
    ListItems.push(
        <tr>
            <th colSpan='2'>Brands</th>
        </tr>
    );
    for (let index = 0; index < AllBrands.length; index++) {
        ListItems.push(
            <tr>
                <td>{AllBrands[index].id}</td>
                <td>{AllBrands[index].name}</td>
            </tr>
        );
        SelectBrands.push(
            <option value={AllBrands[index].id}>{AllBrands[index].name}</option>
        );
    };
    ListItems.push(
        <tr>
            <th colSpan='2'>Manufacturers</th>
        </tr>
    );
    for (let index = 0; index < AllManufacturers.length; index++) {
        ListItems.push(
            <tr>
                <td>{AllManufacturers[index].id}</td>
                <td>{AllManufacturers[index].name}</td>
            </tr>
        );
        SelectManufacturers.push(
            <option value={AllManufacturers[index].id}>{AllManufacturers[index].name}</option>
        );

    };
    ListItems.push(
        <tr>
            <th colSpan='2'>Characters</th>
        </tr>
    );
    for (let index = 0; index < AllCharacters.length; index++) {
        ListItems.push(
            <tr>
                <td>{AllCharacters[index].id}</td>
                <td>{AllCharacters[index].name}</td>
            </tr>
        );
        SelectCharacters.push(
            <option value={AllCharacters[index].id}>{AllCharacters[index].name}</option>
        );
    };
    ListItems.push(
        <tr>
            <th colSpan='2'>Lines</th>
        </tr>
    );
    for (let index = 0; index < AllLines.length; index++) {
        ListItems.push(
            <tr>
                <td>{AllLines[index].id}</td>
                <td>{AllLines[index].name}</td>
            </tr>
        );
        SelectLines.push(
            <option value={AllLines[index].id}>{AllLines[index].name}</option>
        );
    };
    ListItems.push(
        <tr>
            <th colSpan='2'>Editions</th>
        </tr>
    );
    for (let index = 0; index < AllEditions.length; index++) {
        ListItems.push(
            <tr>
                <td>{AllEditions[index].id}</td>
                <td>{AllEditions[index].name}</td>
            </tr>
        );
        SelectEditions.push(
            <option value={AllEditions[index].id}>{AllEditions[index].name}</option>
        );
    };

    let figuredata = [];
    for (let index = 0; index < AllFigures.length; index++) {
        figuredata.push(
            <tr>
                <td className='idsender'>{AllFigures[index].id}</td>
                <td>{AllFigures[index].name}</td>
                <td>{AllFigures[index].brand.name}</td>
                <td>{AllFigures[index].manufacturer.name}</td>
                <td>{AllFigures[index].character.name}</td>
                <td>{AllFigures[index].line.name}</td>
                <td>{AllFigures[index].edition.name}</td>
                <td>{AllFigures[index].size}</td>
                <td>{AllFigures[index].scale}</td>
            </tr>
        );
    };

    // Get a reference to the file input
    const fileInput = document.getElementById('ImgInput');
    let data;
    if (fileInput) {
        // Listen for the change event so we can capture the file
        fileInput.addEventListener('change', (e) => {
            // Get a reference to the file
            const file = e.target.files[0];
            data = file;
            // Encode the file using the FileReader API
            const reader = new FileReader();
            reader.onloadend = () => {
                // Use a regex to remove data url part
                const base64String = reader.result;
                // console.log(base64String);
            //data = base64String;
                document.getElementById('preview').src = data;
                // Logs wL2dvYWwgbW9yZ...
            };
            reader.readAsDataURL(file);
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    function addNewBrand(urlHelper) {
        let names = document.getElementById("namesender").value;
        let url = 'https://localhost:7281/api/' + urlHelper;
        axios.post(url, {
            name: names
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        window.location.reload();
    }
    function EditNewBrand(urlHelper) {
        let ids = document.getElementById("idsender").value;
        let names = document.getElementById("namesender").value;
        let url = 'https://localhost:7281/api/' + urlHelper;
        axios.put(url, {
            id: ids,
            name: names
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        window.location.reload();
    }
    function DeleteNewBrand(urlHelper) {
        let ids = document.getElementById("idsender").value;
        let url = 'https://localhost:7281/api/' + urlHelper + '/' + ids;
        axios.delete(url)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        window.location.reload();
    }
    //////////////////////////////////////////////////////////////////////////////////
    function addNewFigure() {
        let names = document.getElementById("figName").value;
        let brands = document.getElementById("figBrand").value;
        let Manuf = document.getElementById("figMan").value;
        let Chara = document.getElementById("figChar").value;
        let Lines = document.getElementById("figLine").value;
        let Editions = document.getElementById("figEdition").value;
        let Sizes = document.getElementById("figSize").value;
        let Scales = document.getElementById("figScale").value;
        let url = 'https://localhost:7281/api/Figures';
        axios.post(url, {
            name: names,
            brand: {
                id: brands
            },
            manufacturer: {
                id: Manuf
            },
            character: {
                id: Chara
            },
            line: {
                id: Lines
            },
            edition: {
                id: Editions
            },
            size: Sizes,
            scale: Scales
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        window.location.reload();
    }
    function EditFigure() {
        let ids = document.getElementById("figId").value;
        let names = document.getElementById("figName").value;
        let brands = document.getElementById("figBrand").value;
        let Manuf = document.getElementById("figMan").value;
        let Chara = document.getElementById("figChar").value;
        let Lines = document.getElementById("figLine").value;
        let Editions = document.getElementById("figEdition").value;
        let Sizes = document.getElementById("figSize").value;
        let Scales = document.getElementById("figScale").value;
        let url = 'https://localhost:7281/api/Figures';
        axios.put(url, {
            id: ids,
            name: names,
            brand: {
                id: brands
            },
            manufacturer: {
                id: Manuf
            },
            character: {
                id: Chara
            },
            line: {
                id: Lines
            },
            edition: {
                id: Editions
            },
            size: Sizes,
            scale: Scales
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        window.location.reload();
    }
    function DeleteFigure() {
        let ids = document.getElementById("figId").value;
        let url = 'https://localhost:7281/api/Figures/' + ids;
        axios.delete(url)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        window.location.reload();
    }
    //////////////////////////////////////////////////////////////////////////////////
    function addNewImage() {
        let ids = document.getElementById("figId").value;
        if (ids) {
            AddFigureImage(ids, data);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    let specificData = [];
    specificData = GetAllFigures();
    function getFigureData() {
        let ids = parseInt(document.getElementById("figId").value);
        for (let index = 0; index < specificData.length; index++) {
            if (specificData[index].id === ids) {
                document.getElementById("figName").value = specificData[index].name;
                document.getElementById("figBrand").value = specificData[index].brand.id;
                document.getElementById("figMan").value = specificData[index].manufacturer.id;
                document.getElementById("figChar").value = specificData[index].character.id;
                document.getElementById("figLine").value = specificData[index].line.id;
                document.getElementById("figEdition").value = specificData[index].edition.id;
                document.getElementById("figSize").value = specificData[index].size;
                document.getElementById("figScale").value = specificData[index].scale;
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    return (
        <div className='row'>
            <div className='col-2'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ListItems}
                    </tbody>
                </table>
            </div>
            <div className='col-10 p-0 mt-3'>
                <input type='text' className='form-control w-25' id='idsender' placeholder='ID' />
                <input type='text' className='form-control w-25' id='namesender' placeholder='NAME' />

                <button className='btn btn-success' onClick={() => addNewBrand('Brands')}>Add Brand</button>
                <button className='btn btn-success m-2' onClick={() => addNewBrand('Manufacturers')}>Add Manufacturer</button>
                <button className='btn btn-success m-2' onClick={() => addNewBrand('Characters')}>Add Character</button>
                <button className='btn btn-success m-2' onClick={() => addNewBrand('Lines')}>Add Line</button>
                <button className='btn btn-success m-2' onClick={() => addNewBrand('Editions')}>Add Edition</button>
                <br />
                <button className='btn btn-warning' onClick={() => EditNewBrand('Brands')}>Edit Brand</button>
                <button className='btn btn-warning m-2' onClick={() => EditNewBrand('Manufacturers')}>Edit Manufacturer</button>
                <button className='btn btn-warning m-2' onClick={() => EditNewBrand('Characters')}>Edit Character</button>
                <button className='btn btn-warning m-2' onClick={() => EditNewBrand('Lines')}>Edit Line</button>
                <button className='btn btn-warning m-2' onClick={() => EditNewBrand('Editions')}>Edit Edition</button>
                <br />
                <button className='btn btn-danger' onClick={() => DeleteNewBrand('Brands')}>Delete Brand</button>
                <button className='btn btn-danger m-2' onClick={() => DeleteNewBrand('Manufacturers')}>Delete Manufacturer</button>
                <button className='btn btn-danger m-2' onClick={() => DeleteNewBrand('Characters')}>Delete Character</button>
                <button className='btn btn-danger m-2' onClick={() => DeleteNewBrand('Lines')}>Delete Line</button>
                <button className='btn btn-danger m-2' onClick={() => DeleteNewBrand('Editions')}>Delete Edition</button>
                <br />
                <hr />
                <div className="row g-3 mt-2">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Manufacturer</th>
                                <th>Character</th>
                                <th>Line</th>
                                <th>Edition</th>
                                <th>Size</th>
                                <th>Scale</th>
                            </tr>
                        </thead>
                        <tbody>
                            {figuredata}
                        </tbody>
                    </table>
                    <div className="col-auto w-50">
                        <input type='number' className='form-control' id='figId' placeholder='ID....' />
                        <input type='text' className='form-control' id='figName' placeholder='NAME....' />
                        <select className="form-select" id='figBrand' aria-label="Default select example">
                            {SelectBrands}
                        </select>
                        <select className="form-select" id='figMan' aria-label="Default select example">
                            {SelectManufacturers}
                        </select>
                        <select className="form-select" id='figChar' aria-label="Default select example">
                            {SelectCharacters}
                        </select>
                        <select className="form-select" id='figLine' aria-label="Default select example">
                            {SelectLines}
                        </select>
                        <select className="form-select" id='figEdition' aria-label="Default select example">
                            {SelectEditions}
                        </select>
                        <input type='number' className='form-control' defaultValue='0' min='0' id='figSize' placeholder='SIZE....' />
                        <input type='number' className='form-control' defaultValue='0' min='0' id='figScale' placeholder='SCALE....' />
                        {/* <input type='number' className='form-control' id='figBrand' placeholder='BRAND ID....' />
                        <input type='number' className='form-control' id='figMan' placeholder='MANUFACTURER ID....' />
                        <input type='number' className='form-control' id='figChar' placeholder='CHARACTER ID....' />
                        <input type='number' className='form-control' id='figLine' placeholder='LINE ID....' />
                        <input type='number' className='form-control' id='figEdition' placeholder='EDITION ID....' /> */}
                    </div>
                    <div className="col-auto">
                        <button className='btn btn-dark' onClick={() => getFigureData()}>Get Figure Data</button>
                        <br />
                        <button className='btn btn-success' onClick={() => addNewFigure()}>Add Figure</button>
                        <br />
                        <button className='btn btn-warning' onClick={() => EditFigure()}>Edit Figure</button>
                        <br />
                        <button className='btn btn-danger' onClick={() => DeleteFigure()}>Delete Figure</button>
                    </div>
                </div>
                <br />
                <div>
                    <input type="file" className='form-control w-25' id='ImgInput' />
                    <img id='preview' className='w-25 p-5' alt='' src='' />
                    <button className='btn btn-success' onClick={addNewImage}>Save Image</button>
                </div>



            </div>

        </div>

    );
}

export default AddEdit;