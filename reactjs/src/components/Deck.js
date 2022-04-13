import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// Import Images
import blackDeck from '../images/black-deck.png';
import blueDeck from '../images/blue-deck.png';

function Deck(props) {
    return (
        <div style={styles.container}>
            <Link to={props.link} style={styles.link}>
                <h1 style={styles.header}>{props.header}</h1>
                <p style={styles.subHeader}>Super Rare: <span>{props.superRareCount}</span></p>
                <p style={styles.subHeader}>Cards: <span>{props.cardCount}</span></p>
                {props.deckColor === 'black' &&
                    <img src={blackDeck} alt='black deck' style={styles.deckImage} />
                }
                {props.deckColor === 'blue' &&
                    <img src={blueDeck} alt='blue deck' style={styles.deckImage} />
                }

            </Link>
            <div>
                <Link to={props.editDeckLink}>Edit Deck</Link>
                <span> | </span>
                <Link to={props.viewDeckLink}>View Deck</Link>
            </div>
        </div>
    );
}

// Setting default value for prop.
Deck.defaultProps = {
    header: 'Collection 1',
    link: '/dashboard',
    deckColor: 'black',
    superRareCount: '12',
    cardCount: '20',
    editDeckLink: '/dashboard',
    viewDeckLink: '/dashboard',
};

// Setting expected value for prop.
Deck.propTypes = {
    header: PropTypes.string,
    link: PropTypes.string,
    deckColor: PropTypes.string,
    superRareCount: PropTypes.any,
    cardCount: PropTypes.any,
};

export default Deck;

// CSS Modules
const styles = {
    container: {
        width: '300px',
        textDecoration: 'none',
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: '20px',
    },
    header: {
        marginTop: '1px',
        marginBottom: '1px',
    },
    subHeader: {
        marginTop: '2px',
        marginBottom: '2px',
        color: 'black',
    },
    deckImage: {
        paddingTop: '20px',
        paddingBottom: '20px',
        height: '186px',
    },
    link: {
        textDecoration: 'none',
        color: '#707070',
    }
}