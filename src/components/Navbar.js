import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    // const [click, setClick] = useState(false);


    // //Arrow function
    // const handleClick = () => setClick(!click);
    // const CloseMobileMenu = () => setClick(false);

    let location;
    if (localStorage.getItem("User")) {
        location = '/Profile';
    }
    else {
        location = '/Login';
    }

    return (
        <>
            <nav className='navbarFigures'>
                <div className="container ">
                    <div className="row">
                        <div className="col">
                            <Link to="/" className='navbar-logo'>
                                Figures Collection&#8482;
                            </Link>
                        </div>
                        <div className="col">
                            <Link to={location} className='float-end nav-links'>
                                My Account
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 
            <div className='navbar-container'>

                
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                </div> */}

                {/* <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to="/" className='nav-links' onClick={CloseMobileMenu}>
                            Figures Collection <i className='fab fa-typo3'/>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={CloseMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/showall/figures' className='nav-links' onClick={CloseMobileMenu}>
                            AllFigures(word de laatste knop op home)
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/Admin' className='nav-links' onClick={CloseMobileMenu}>
                            Admin
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={location} className='nav-links' onClick={CloseMobileMenu}>
                            My Account
                        </Link>
                    </li>
                </ul> */}


                {/* </div> */}

            </nav>
        </>
    )
}

export default Navbar