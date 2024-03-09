import React, { useState } from 'react';
import Logo from '../../../assets/img/logo.png';
import { Context } from '../../../context/UserContext';
import { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { authenticated, logout } = useContext(Context);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className='navbar d-flex justify-content-space-between'>
            <div className='navbarLogo d-flex justify-content-center align-items-center'>
                <img className='dog' src={Logo} alt="Get a Pet" />
                <h2>Get a Pet</h2>
            </div>

            <input type="checkbox" id="nav-toggle" className="nav-toggle visually-hidden" checked={menuOpen} onChange={toggleMenu} />
            <label htmlFor="nav-toggle" className="nav-toggle-label">
                <span></span>
            </label>

            <ul className={`d-flex justify-content-space-around p-0 m-0 align-items-center navbarUl ${menuOpen ? 'open' : ''}`}>
                <li className='navbarLi'>
                    <Link className='navbarLink' to='/'>Adotar</Link>
                </li>
                {authenticated ?
                    (
                        <>
                            <li className='navbarLi'>
                                <Link className='navbarLink' to='/pet/mypets'>Meus Pets</Link>
                            </li>
                            <li className='navbarLi'>
                                <Link className='navbarLink' to='/pet/adoptions'>Minhas Adoções</Link>
                            </li>
                            <li className='navbarLi'>
                                <Link className='navbarLink' to='/user/profile'>Perfil</Link>
                            </li>
                            <li onClick={logout} className='navbarLi'>
                                Sair
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='navbarLi'>
                                <Link className='navbarLink' to='/login'>Entrar</Link>
                            </li>
                            <li className='navbarLi'>
                                <Link className='navbarLink' to='/register'>Registrar</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    );
};

export default Navbar;
