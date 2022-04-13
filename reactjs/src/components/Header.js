import React from 'react';
import PropTypes from 'prop-types';

// Import Images
import Logo from '../images/yellow-logo.png';

function Header(props) {
    return (
        <header style={styles.container}>
            <img src={Logo} alt={props.altText} />
            <h1 style={styles.headerText}>{props.header}</h1>
        </header>
    );
}

// Setting default value for prop.
Header.defaultProps = {
    header: 'Title',
    altText: 'Image of a binder'

};

// Setting expected value for prop.
Header.propTypes = {
    header: PropTypes.string,
    altText: PropTypes.string
};

export default Header;

// CSS Modules
const styles = {
    container: {
        backgroundColor: '#003566',
        color: '#FFC300',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '0',
    },
    headerText: {
        marginTop: '0',
        marginBottom: '0',
        fontSize: '40px',
    },
}