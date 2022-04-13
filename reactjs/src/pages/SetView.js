import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Form} from 'react-bootstrap';

// Import Components
import Header from '../components/Header';
import Thumbnail from '../components/CardThumbnail'
import BackButton from '../components/BackButton';


function SetView() {

    // React States
    const [set, setSet] = useState({name: ''});
    const [cardInfo, setCardInfo] = useState([]);
    const [query, setQuery] = useState('');

    // Setting a variable for useParams().
    const params = useParams();

    // This will filter through an array based on user input.
    const getFilteredItems = (query, items) => {
        if(!query) {
            return items;
        }
        return items.filter(card => card.name.toLowerCase().includes(query));
    }

    // Setting a variable for filteredItems.
    const filteredItems = getFilteredItems(query, cardInfo);

    useEffect(() => {
        let cardArray = [];

        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);

        /**
         * @returns {Promise<void>}
         * This function is using an axios GET request with the params id to get data specific to the id of the set. The
         * data is then being looped through and being pushed into an array which is then being set to a React state.
         */
        async function fetchSet() {
            const set = await axios.get(`/set/${params.id}`, {
                headers: {
                    Bearer: userData.token
                }
            })

            let setCard = set.data.Cards;

            /*
            This will loop through each card in the set and will be pushed into the cardArray.
             */
            for (let card in setCard) {
                cardArray.push(setCard[card]);
            }
            
            setCardInfo(cardArray);
            setSet({name: set.data.name})
        }
        fetchSet();
    }, [params.id]);


    return (
        <main>
            <Header header='Digital Binder' />
            <header style={styles.header}>
                <h1 style={styles.h1}>{set.name}</h1>
            </header>
            <div style={styles.subContainer}>
                <BackButton />
                <div style={styles.searchContainer}>
                    <Form.Control
                        type='text'
                        id='searchInput'
                        aria-label='search bar'
                        placeholder='Browse Cards...'
                        onChange={(e) => {
                            setQuery(e.target.value.toLowerCase())
                        }}
                    />
                </div>
            </div>
            <div style={styles.cardContainer}>
                {filteredItems.map(value => (
                        <Thumbnail
                        key={value.id}
                        name={value.name}
                        rarity={value.rarityShorthand}
                        link={`/set/card/${value.id}`}
                        cardImage={value.cardImage}
                    />
                ))}
            </div>
        </main>
    );
}

export default SetView;

// CSS Modules
const styles = {
    cardContainer: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    subContainer: {
        display: 'flex',
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexWrap: 'wrap',
        marginBottom: '50px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '120px',
        color: '#707070',
        marginTop: '30px',
    },
    h1: {
        fontSize: '36px',
        marginBottom: '0',
    },
    searchContainer: {
        marginLeft: '30%',
    },
}