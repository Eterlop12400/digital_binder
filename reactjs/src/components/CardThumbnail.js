import React from 'react';
import {Link} from 'react-router-dom';

// Import Images
import cardImage from '../images/card-small.png';

function CardThumbnail(props) {

    return (
        <Link to={props.link} style={styles.nav}>
            <div style={styles.container}>
                {props.cardImage === false &&
                    <img src={cardImage} alt='card thumbnail' style={styles.img}/>
                }
                {props.cardImage !== false &&
                    <img src={props.cardImage} alt='card thumbnail' style={styles.img}/>
                }
                <div style={styles.subContainer}>
                    <p style={styles.cardName}>{props.name}</p>
                    <p style={styles.p}>{props.rarity}</p>
                </div>
            </div>
        </Link>
    );
}

// Setting default value for prop.
CardThumbnail.defaultProps = {
    cardImage: false,
    name: 'name',
    rarity: 'rarity',
    link: '/dashboard'
};

export default CardThumbnail;

// CSS Modules
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: '25px',
        marginLeft: '15px',
        marginRight: '15px',
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '176px',
        justifyContent: 'space-between',
    },
    input: {
        padding: '6px',
        color: 'black',
        fontSize: '18px',
        borderRadius: '3px',
        boxShadow: '1px 1px 1px lightgray',
    },
    img: {
        height: '269px',
        width: '197px',
        borderRadius: '3px',
        boxShadow: '3px 3px 8px gray',
    },
    cardName: {
        margin: '0',
        padding: '0',
        marginLeft: '0',
        width: '120px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginTop: '3px',
    },
    p: {
        margin: '0',
        padding: '0',
        marginTop: '3px',
    },
    nav: {
        textDecoration: 'none',
        color: '#707070',
    },
}
