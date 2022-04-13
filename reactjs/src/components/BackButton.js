import React from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

// Import Images
import arrow from '../images/back-arrow.png';

function BackButton() {

    // Setting a variable for useNavigate().
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(-1)} style={styles.link}>
            <div style={styles.container}>
                <img src={arrow} alt='arrow pointing to the left' />
                <p style={styles.p}>Back</p>
            </div>
        </div>
    );
}

// Setting default value for prop.
BackButton.defaultProps = {
    link: '/collection',
}

// Setting expected value for prop.
BackButton.propTypes = {
    link: PropTypes.string,
};

export default BackButton;

// CSS Modules
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    p: {
        paddingLeft: '10px',
        color: 'black',
        fontSize: '22px',
        marginTop: '0',
        marginBottom: '0',
    },
    link: {
        cursor: 'pointer',
    }
}