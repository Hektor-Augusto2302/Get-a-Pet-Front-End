import { Link } from 'react-router-dom';
import Logo from '../../../assets/img/logo.png';
import styles from './Navbar.module.css';
import { Context } from '../../../context/UserContext';
import { useContext } from 'react';

const Navbar = () => {

    const { authenticated, logout } = useContext(Context);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarLogo}>
                <img className={styles.dog} src={Logo} alt="Get a Pet" />
                <h2>Get a Pet</h2>
            </div>

            <ul className={styles.navbarUl}>
                <li className={styles.navbarLi}>
                    <Link className={styles.navbarLink} to='/'>Adotar</Link>
                </li>
                {authenticated ?
                    (
                        <>
                            <li className={styles.navbarLi}>
                                <Link className={styles.navbarLink} to='/pet/mypets'>Meus Pets</Link>
                            </li>
                            <li className={styles.navbarLi}>
                                <Link className={styles.navbarLink} to='/pet/adoptions'>Minhas Adoções</Link>
                            </li>
                            <li className={styles.navbarLi}>
                                <Link className={styles.navbarLink} to='/user/profile'>Perfil</Link>
                            </li>
                            <li onClick={logout} className={styles.navbarLi}>
                                Sair
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={styles.navbarLi}>
                                <Link className={styles.navbarLink} to='/login'>Entrar</Link>
                            </li>
                            <li className={styles.navbarLi}>
                                <Link className={styles.navbarLink} to='/register'>Registrar</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    );
};

export default Navbar;
