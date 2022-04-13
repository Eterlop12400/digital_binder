import React from 'react';

// Import Images
import blackBinder from '../images/black-binder.png';
import blueBinder from '../images/blue-binder.png';

function CollectionTile(props) {

    return (
        <div style={styles.container}>
            {props.binderColor === 'black' &&
                <img src={blackBinder} alt='black binder' style={styles.binderImage} />
            }
            {props.binderColor === 'blue' &&
                <img src={blueBinder} alt='blue binder' style={styles.binderImage} />
            }
            <div style={styles.subContainer}>
                <h2>{props.name}</h2>
                <p>Common: <span>{props.common}</span> | Rare: <span>{props.rare}</span> | Super Rare: <span>{props.superRare}</span></p>
                <p>Total Cards: <span>{props.cardTotal}</span></p>
                <p style={styles.details}>{props.collectionDetails}</p>
            </div>
        </div>
    );
}

// Setting default value for prop.
CollectionTile.defaultProps = {
    name: 'Collection Name',
    binderColor: 'black',
    cardTotal: '0',
    common: '0',
    rare: '0',
    superRare: '0',
    collectionDetails: 'Collection Details...'
};

export default CollectionTile;

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
    img: {

    },
    details: {
        margin: '0',
        padding: '0',
        width: '500px',
        height: '80px',
        textOverflow: 'ellipsis',
    },
    nav: {
        textDecoration: 'none',
        color: '#707070',
    },
}
