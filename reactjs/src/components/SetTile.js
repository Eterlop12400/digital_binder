import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// Import Images
import setImg from '../images/set-tile.png'

function SetTile(props) {
    return (
        <div style={styles.container}>
            <Link to={props.link} style={styles.link}>
                <h2 style={styles.header}>{props.setTitle}</h2>
                <div>
                    <img src={props.setImg} alt={props.altText} />
                </div>
            </Link>
        </div>
    );
}

// Setting default value for prop.
SetTile.defaultProps = {
    setTitle: 'Set Title',
    setImg: setImg,
    altText: 'large building in the clouds',
    link: '/dashboard'
};

// Setting expected value for prop.
SetTile.propTypes = {
    setTitle: PropTypes.string
};

export default SetTile;

// CSS Modules
const styles = {
    container: {
        width: '412px',
        height: '363px',
        marginBottom: '20px',
    },
    imgContainer: {
        width: '412px',
        height: '329px',
    },
    header: {
        textAlign: 'center',
    },
    link : {
        textDecoration: 'none',
        color: '#707070',
    }
}