import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

// Import Components
import Header from '../components/Header';
import Decks from '../components/Deck';


function MyDeck() {
    // Setting a variable for useNavigate().
    let navigate = useNavigate();

    // React States
    const [deckInfo, setDeckInfo] = useState([]);
    const [deckTotal, setDeckTotal] = useState({
        numOfDecks: 0,
    });
    const [superRareTotal, setSuperRareTotal] = useState({
        numOfSuperRares: 0,
    });
    

    useEffect(() => {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);
        let decodedUser = jwt_decode(userData.token);
        let userId = decodedUser.id;

        /**
         * @returns {Promise<void>}
         * This function will make an axios GET request to get user data, based on the data returned it will populate all
         * the decks the user has and the rarity of each card in that deck. Data retrieved will then be saved
         * in a React state.
         */
        async function fetchUser() {
            const user = await axios.get(`/user/${userId}`, {
                headers: {
                    Bearer: userData.token
                }
            })
            let superRares = 0;
            let deckTotal = 0;
            let deckArray = [];
            let userDeck = user.data.Decks;
            for (let col in userDeck) {
                let deckSuper = 0;
                userDeck[col].totalCards = userDeck[col].Cards.length;
                deckTotal++;
                for (let card in userDeck[col].Cards) {
                    if (userDeck[col].Cards[card].rarity === 'Super Rare') {
                        superRares++;
                        deckSuper++;
                    }
                }
                userDeck[col].totalSupers = deckSuper;
                deckArray.push(userDeck[col]);
                setDeckInfo(deckArray);
                setDeckTotal({numOfDecks: deckTotal});
                setSuperRareTotal({numOfSuperRares: superRares});
            }
        }
        fetchUser();
    }, []);

    return (
        <main>
            <Header header='Digital Binder' />
            <header style={styles.header}>
                <h1 style={styles.h1}>My Deck</h1>
                <p style={styles.subHeader}>Total Decks: <span>{deckTotal.numOfDecks}</span></p>
                <p style={styles.subHeader}>Super Rares: <span>{superRareTotal.numOfSuperRares}</span></p>
            </header>
            <div style={styles.menu}>
                <Button variant='success' style={styles.btn} onClick={() => {
                    navigate('/deck/new');
                    window.location.reload();
                }}>
                    Add Deck
                </Button>
            </div>
            <div style={styles.container}>
                {deckInfo.map(deck => (
                    <Decks
                        key={deck.id}
                        header={deck.name}
                        link={`/deck/${deck.id}`}
                        viewDeckLink={`/deck/${deck.id}`}
                        editDeckLink={`/deck/${deck.id}/edit`}
                        deckColor={deck.color}
                        cardCount={deck.totalCards}
                        superRareCount={deck.totalSupers}
                    />
                ))}
            </div>
        </main>
    );
}

export default MyDeck;

// CSS Modules
const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    header: {
        textAlign: 'center',
        marginBottom: '60px',
        color: '#707070',
        marginTop: '30px',
    },
    h1: {
        fontSize: '36px',
        marginBottom: '0',
    },
    subHeader: {
        marginTop: '4px',
        marginBottom: '4px',
        color: 'black',
    },
    menu: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '60px',
    },
    btn: {
        width: '150px',
        height: '50px',
        backgroundColor: '#003566',
        color: '#FFC300',
    },
}