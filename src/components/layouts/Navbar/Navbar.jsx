import { Link } from 'react-router-dom';
import Logo from '../../../assets/img/logo.png';
import styles from './Navbar.module.css';
import { Context } from '../../../context/UserContext';
import { useContext } from 'react';

const Navbar = () => {

    const { authenticated, logout } = useContext(Context);

    return (
        <nav className={`${styles.navbar} d-flex justify-content-between align-items-center navbar navbar-expand-sm navbar`}>
            <div className="container">
                <div className='d-flex align-items-center justify-content-center me-2'>
                    <img className={styles.dog} src={Logo} alt="Get a Pet" />
                    <h2>Get a Pet</h2>
                </div>
                <div className="d-flex flex-column justify-content-end">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="bi bi-text-left"></i>
                    </button>
                    <ul className="navbar-nav collapse navbar-collapse list-unstyled" id="navbarNav">
                        <li className='links nav-item me-3 mb-1'>
                            <Link className={styles.navbarLink} to='/'>Adotar</Link>
                        </li>
                        {authenticated ? (
                            <>
                                <li className={`${styles.navbarLi} nav-item list-unstyled mr-3 px-4 py-3`}>
                                    <Link className={styles.navbarLink} to='/pet/mypets'>Meus Pets</Link>
                                </li>
                                <li className={`${styles.navbarLi} nav-item list-unstyled mr-3 px-4 py-3`}>
                                    <Link className={styles.navbarLink} to='/pet/adoptions'>Minhas Adoções</Link>
                                </li>
                                <li className={`${styles.navbarLi} nav-item list-unstyled mr-3 px-4 py-3`}>
                                    <Link className={styles.navbarLink} to='/user/profile'>Perfil</Link>
                                </li>
                                <li onClick={logout} className={`${styles.navbarLi} nav-item list-unstyled mr-3 px-4 py-3`}>
                                    Sair
                                </li>
                            </>
                        ) : (
                            <>
                                <li className={`${styles.navbarLi} nav-item list-unstyled mr-3 px-4 py-3`}>
                                    <Link className={styles.navbarLink} to='/login'>Entrar</Link>
                                </li>
                                <li className={`${styles.navbarLi} nav-item list-unstyled mr-3 px-4 py-3`}>
                                    <Link className={styles.navbarLink} to='/register'>Registrar</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
