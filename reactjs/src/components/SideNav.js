import React from 'react';

// React Router
import {NavLink, useNavigate} from 'react-router-dom';

// React Icons
import DashboardIcon from '../images/dashboard.png';
import CollectionIcon from '../images/collection.png';
import DeckIcon from '../images/deck.png';
import ExploreIcon from '../images/search.png';
import ProfileIcon from '../images/settings.png';
import ProfilePic from '../images/profilePic.png';

const SideNav = () => {

    let navigate = useNavigate();

    function logout () {
        localStorage.removeItem('login');
        navigate('/login');
        window.location.reload();
    }

    return(
        <nav style={styles.nav}>
            <div style={styles.header}>
                <img src={ProfilePic} alt='an icon of young woman with flowing hair' style={styles.headerPic} />
                <p onClick={logout} style={styles.signOutLink}>
                    Sign Out
                </p>
            </div>
            <div style={styles.links}>
                <NavLink
                    to='/dashboard'
                    style={styles.linkContainer}>
                    <img src={DashboardIcon} alt='an icon of four squares' style={styles.iconTab} />
                    Dashboard
                </NavLink>
                <NavLink to='/collection' style={styles.linkContainer}>
                    <img src={CollectionIcon} alt='an icon of four trading cards spread out' style={styles.iconTab} />
                    My Collection
                </NavLink>
                <NavLink to='/deck' style={styles.linkContainer}>
                    <img src={DeckIcon} alt='an icon of a deck of playing cards' style={styles.iconTab} />
                    My Deck
                </NavLink>
                <NavLink to='/explore' style={styles.linkContainer}>
                    <img src={ExploreIcon} alt='an icon of a magnifying glass' style={styles.iconTab} />
                    Explore
                </NavLink>
                <NavLink to='/profile' style={styles.linkContainer}>
                    <img src={ProfileIcon} alt='an icon of a gear' style={styles.iconTab} />
                    Profile
                </NavLink>
            </div>
        </nav>
    )
}
export default SideNav;

const styles = {
    nav: {
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        height: '425px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    headerPic: {
        paddingBottom: '20px',
        marginTop: '40px',
        height: '150px',
    },
    icon: {
        height: '80px',
        width: '80px',
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        height: '400px',
        margin: 'auto',
        paddingTop: '50px',
        fontSize: '20px',
        minWidth: '100%',
    },
    iconTab: {
        verticalAlign: 'middle',
        marginRight: '25px',
        height: '40px',
        width: '40px',
    },
    linkContainer: {
        minWidth: '100%',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '20%',
        backgroundColor: 'lightgray',
        textDecoration: 'none',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        color: 'black',
    },
    signOutLink: {
        color: '#FFD60A',
        fontSize: '22px',
        cursor: 'pointer',
    }
}