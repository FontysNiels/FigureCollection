import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import {
  GetAllFigures, GetFiguresByBrand, GetFiguresByManufacturer, GetAllCollectedFromUser, GetAllUsers,
  GetSpecificFigureImage, GetAllFigureImages
} from './API';

const Cards = props => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const BrandId = urlParams.get('Brand')
  const ManufacturerId = urlParams.get('Manufacturer')
  let Username = urlParams.get('user');

  if (window.location.pathname === '/Profile') {
    if (!Username) {
      Username = localStorage.getItem("User");
    }
  }

  const allusers = GetAllUsers();
  let UserId;
  for (let index = 0; index < allusers.length; index++) {
    if (allusers[index].username === Username) {
      UserId = allusers[index].id;
    }
  }

  let figures = GetAllFigures();
  if (BrandId != null) {
    figures = GetFiguresByBrand(BrandId);
  }
  if (ManufacturerId != null) {
    figures = GetFiguresByManufacturer(ManufacturerId);
  }
  else if (Username != null) {
    figures = GetAllCollectedFromUser(UserId);
  }

  let LocList = [];
  //Dummy Data
  let FigureName = [];
  let FigureId = [];
  if (props.page === 'Home') {
    FigureName = ["One Piece", "Disney", "Rick And Morty", "Pokémon", "Mattel", "Banpresto", "K3", "Adventure Time"];
  }
  else {
    for (let index = 0; index < figures.length; index++) {
      if (Username != null) {
        FigureName.push(figures[index].figure.name);
        FigureId.push(figures[index].figure.id);
      }
      else {
        FigureName.push(figures[index].name);
        FigureId.push(figures[index].id);

      }
    }

    //Make Preview Images
    let allimagesdata = GetAllFigureImages();
    if (allimagesdata) {
      for (let index = 0; index < FigureId.length; index++) {
        for (let i = 0; i < allimagesdata.length; i++) {
          if (allimagesdata[i].figure.id === FigureId[index]) {
            LocList.push(allimagesdata[i].imgData)
          }
        }
      }
    }
    for (let index = 0; index < LocList.length; index++) {
      let classUse = "cards";
      GetSpecificFigureImage(LocList[index], classUse)
    }
  }

  let SpecificData;
  if (figures[0] != null) {
    if (BrandId != null) {
      SpecificData = <h1 className='mb-0 mt-2 text-center'>{figures[0].brand.name}</h1>
    }
    if (ManufacturerId != null) {
      SpecificData = <h1 className='mb-0 mt-3 text-center'>{figures[0].manufacturer.name}</h1>
    }
  }

  //Return Value
  let FinalList = [];
  //Child of Return Value
  let ListItems = [];
  //Amount of cards per row
  let AmountOfCards = 3;
  //Keeps count how many rows have been made
  let count = 0;
  //Classname of the CardItem
  let emptycard = 'cards__figure';

  //Crops the text so it fits (mobile vertical + pc)
  for (let pp = 0; pp < FigureName.length; pp++) {
    if (FigureName[pp].length > 55) {
      // console.log(FigureName[pp].length)
      FigureName[pp] = FigureName[pp].substring(0, 56) + "......";
    }
  }

  /////////////////////////////////////HOME/////////////////////////////////////////////////////////////////////////////////////
  //HomePage Cards maker
  if (props.page === 'Home') {
    let emptycardHome = 'cards__home';
    //Amount of rows
    for (let row = 0; row < Math.floor(FigureName.length / AmountOfCards) + 1; row++) {
      //Amount of cards per row
      for (let i = 0; i < AmountOfCards; i++) {
        if (row !== count) {
          //if array value emtpy, visibility of card hidden  
          if (FigureName[i + AmountOfCards * row] == null) {
            emptycardHome = 'cards__item__empty';

            ListItems.push(
              <CardItem
                type={props.page}
                className='cards__home'
                src='images/img-9.jpg'
                text='All Figures'
                path='/showAll/Figures'
              />
            )
          }
          else {

            ListItems.push(
              <CardItem
                type='Home'
                className={emptycardHome}
                src='images/img-9.jpg'
                text={FigureName[i + AmountOfCards * row]}
                path={'/Figure?id=' + FigureId[i + AmountOfCards * row]}
              />
            );
          }
        }
        else {
          if (FigureName[i] == null) {
            emptycardHome = 'cards__item__empty';
          }
          ListItems.push(
            <CardItem
              type='Home'
              className={emptycardHome}
              src='images/img-9.jpg'
              text={FigureName[i]}
              path={'/Figure?id=' + FigureId[i]}
            />
          );
        }
      }
      FinalList.push(<ul className='cards__items'>{ListItems}</ul>)
      ListItems = [];
    }
    return (
      <div className='cards'>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem
                type={props.page}
                className='cards__home'
                src='images/img-9.jpg'
                text='All Brands'
                path='/ShowAll/Brands'
              />
              <CardItem
                type={props.page}
                className='cards__home'
                src='images/img-9.jpg'
                text='All Manufacturers'
                path='/ShowAll/Manufacturers'
              />
            </ul>
            {FinalList}
          </div>
        </div>
      </div>
    );
  }
  /////////////////////////////////////FIGURES/////////////////////////////////////////////////////////////////////////////////////
  //Normal Cards of the figures
  else {
    //Amount of rows
    for (let row = 0; row < Math.floor(FigureName.length / AmountOfCards) + 1; row++) {
      //Amount of cards per row
      for (let i = 0; i < AmountOfCards; i++) {
        if (row !== 0) {
          //if array value emtpy, visibility of card hidden  
          if (FigureName[i + AmountOfCards * row] == null) {
            emptycard = 'cards__item__empty';
          }
          ListItems.push(
            <CardItem
              type='Figures'
              className={emptycard}
              src='../images/img-9.jpg'
              text={FigureName[i + AmountOfCards * row]}
              label='New!'
              path={'/Figure?id=' + FigureId[i + AmountOfCards * row]}
              imgloc={LocList[i + AmountOfCards * row]}
            />
          );
        }
        else {
          if (FigureName[i] == null) {
            emptycard = 'cards__item__empty';
          }
          ListItems.push(
            <CardItem
              type='Figures'
              className={emptycard}
              src='../images/img-9.jpg'
              text={FigureName[i]}
              label='New!'
              path={'/Figure?id=' + FigureId[i]}
              imgloc={LocList[i]}
            />
          );
        }
      }
      FinalList.push(<ul className='cards__items'>{ListItems}</ul>)
      ListItems = [];
    }
    return (
      <div className='cards'>
        {SpecificData}
        <div className='cards__container'>
          <div className='cards__wrapper'>
            {FinalList}
          </div>
        </div>
      </div>
    );
  }

};


export default Cards;