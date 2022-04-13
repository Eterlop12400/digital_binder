import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// Import Images
import blackBinder from '../images/black-binder.png';
import blueBinder from '../images/blue-binder.png';

function Collection(props) {
    return (
        <div style={styles.container}>
            <Link to={props.link} style={styles.link}>
                <h1 style={styles.header}>{props.header}</h1>
                <p style={styles.subHeader}>Super Rare: <span>{props.superRareCount}</span></p>
                <p style={styles.subHeader}>Cards: <span>{props.cardCount}</span></p>
                {props.binderColor === 'black' &&
                    <img src={blackBinder} alt='black binder' style={styles.binderImage} />
                }
                {props.binderColor === 'blue' &&
                    <img src={blueBinder} alt='blue binder' style={styles.binderImage} />
                }
            </Link>
            <div>
                <Link to={props.editCollectionLink}>Edit Collection</Link>
                <span> | </span>
                <Link to={props.viewCollectionLink}>View Collection</Link>
            </div>
        </div>
    );
}

// Setting default value for prop.
Collection.defaultProps = {
    header: 'Collection 1',
    link: '/dashboard',
    binderColor: 'black',
    superRareCount: '12',
    cardCount: '20',
    editCollectionLink: '/dashboard',
    viewCollectionLink: '/dashboard',
};

// Setting expected value for prop.
Collection.propTypes = {
    header: PropTypes.string,
    link: PropTypes.string,
    binderColor: PropTypes.string,
    superRareCount: PropTypes.any,
    cardCount: PropTypes.any,
};

export default Collection;

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
    binderImage: {
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    link: {
        textDecoration: 'none',
        color: '#707070',
    }
}