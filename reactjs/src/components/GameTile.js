import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// Import Images
import gameImg from '../images/game-tile.png';

function GameTile(props) {
    return (
        <div style={styles.container}>
            <Link to={props.link} style={styles.link}>
                <h2 style={styles.header}>{props.gameTitle}</h2>
                <div>
                    <img src={props.gameImg} alt={props.altText} />
                </div>
            </Link>
        </div>
    );
}

// Setting default value for prop.
GameTile.defaultProps = {
    gameTitle: 'Game Title',
    gameImg: gameImg,
    altText: 'abstract art with black and yellow patterns',
    link: '/dashboard'
};

// Setting expected value for prop.
GameTile.propTypes = {
    gameTitle: PropTypes.string
};

export default GameTile;

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