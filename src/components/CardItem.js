import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  //Two big ones from homepage
  if (props.type === 'Home') {
    return (
      <>
        <li className={props.className}>
          <Link className='cards__item__link' to={props.path}>
            <img
              className='blurimage'
              alt=''
              src={props.src}
            />
            <h2 className='centered'>{props.text}</h2>
          </Link>
        </li>
      </>
    );
  }
  //Smaller things homepage
  // else if (props.type === 'Home') {
  //   return (
  //     <>
  //       <li className={props.className}>
  //         <Link className='cards__item__link' to={props.path}>
  //           <img
  //             className='blurimage'
  //             alt=''
  //             src={props.src}
  //           />
  //           <h1 className='centered'>{props.text}</h1>

  //         </Link>
  //       </li>
  //     </>
  //   );
  // }
  //Normal cards figures
  else {
    return (
      <>
        <li className={props.className}>
          <Link className='cards__item__link' to={props.path}>
            <figure id={props.imgloc} className='cards__item__pic-wrap' data-category={props.label}>
              {/* <img
                className='cards__item__img'
                alt=''
                src={props.src}
              /> */}
            </figure>
            <div className='cards__item__info'>
              <h5 className='cards__item__text' id='title'>{props.text}</h5>
            </div>
          </Link>
        </li>
      </>
    );
  }


}

export default CardItem;