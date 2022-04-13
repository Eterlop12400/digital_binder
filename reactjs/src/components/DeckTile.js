import React from 'react';

// Import Images
import blackDeck from '../images/black-deck.png';
import blueDeck from '../images/blue-deck.png';

function DeckTile(props) {

    return (
        <div style={styles.container}>
            {props.deckColor === 'black' &&
                <img src={blackDeck} alt='black binder' style={styles.deckImage} />
            }
            {props.deckColor === 'blue' &&
                <img src={blueDeck} alt='blue binder' style={styles.deckImage} />
            }
            <div style={styles.subContainer}>
                <h2>{props.name}</h2>
                <p>Common: <span>{props.common}</span> | Rare: <span>{props.rare}</span> | Super Rare: <span>{props.superRare}</span></p>
                <p>Total Cards: <span>{props.cardTotal}</span></p>
                <p style={styles.details}>{props.deckDetails}</p>
            </div>
        </div>
    );
}

// Setting default value for prop.
DeckTile.defaultProps = {
    name: 'Deck Name',
    deckColor: 'black',
    cardTotal: '0',
    common: '0',
    rare: '0',
    superRare: '0',
    deckDetails: 'Deck Details...'
};

export default DeckTile;

// CSS Modules
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '75px',
        marginTop: '50px',
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#707070',
    },
    subContainer: {
        marginLeft: '30px',
    },
    details: {
        margin: '0',
        padding: '0',
        width: '500px',
        height: '80px',
        textOverflow: 'ellipsis',
    },
    deckImage: {
      height: '186px',
    },
}
