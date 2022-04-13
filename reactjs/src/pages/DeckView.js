import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {Button, Form, Modal} from 'react-bootstrap';

// Import Components
import Header from '../components/Header';
import Thumbnail from '../components/CardThumbnail';
import DeckTile from '../components/DeckTile';
import BackButton from '../components/BackButton';


function DeckView() {

    // Setting a variable for useParams().
    const params = useParams();

    // Setting a variable for useNavigate().
    const navigate = useNavigate();

    // React States
    const [show, setShow] = useState(false);
    const [cardInfo, setCardInfo] = useState([]);
    const [query, setQuery] = useState('');
    const [deckInfo, setDeckInfo] = useState({
        title: '',
        iconColor: '',
        description: '',
        totalCards: 0,
        totalSupers: 0,
        totalRares: 0,
        totalCommons: 0,
    });


    // Global variables for the Boostrap Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /**
     * This function will make an axios GET request to delete a specific deck. Afterwards, the user will be redirected
     * to the previous page they were on last.
     */
    function handleDelete() {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);

        async function deleteDeck() {
            await axios.get(`/deck/${params.id}/delete`, {
                headers: {
                    Bearer: userData.token
                }
            })
        }
        deleteDeck();
        navigate(-1);
    }

    useEffect(() => {
        let common = 0;
        let rare = 0;
        let superRares = 0;
        let totalDeckCards = 0;
        let cardArray = [];

        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);

        /**
         * @returns {Promise<void>}
         * This function will make an axios GET request to get information of a specific deck. Based on the data
         * received back from the axios request. It will then be saved to a React state.
         */
        async function fetchDeck() {
            const deck = await axios.get(`/deck/${params.id}`, {
                headers: {
                    Bearer: userData.token
                }
            });

            // If the data is null, it will redirect the user back to the main deck page.
            if (deck.data === null) {
                navigate('/deck/');
            }

            let deckCard = deck.data.Cards;

            // This loop will go through each card in a deck and take count of the rarity.
            for (let card in deckCard) {
                totalDeckCards++;

                if (deckCard[card].rarity === 'Super Rare') {
                    superRares++;
                } else if(deckCard[card].rarity === 'Rare') {
                    rare++;
                } else if(deckCard[card].rarity === 'Common') {
                    common++;
                }

                cardArray.push(deckCard[card]);
            }
            setCardInfo(cardArray)
            setDeckInfo({
                title: deck.data.name,
                iconColor: deck.data.color,
                description: deck.data.description,
                totalCards: totalDeckCards,
                totalSupers: superRares,
                totalRares: rare,
                totalCommons: common
            });
        }
        fetchDeck();
    }, [navigate, params.id]);

    // This will filter through an array based on user input.
    const getFilteredItems = (query, items) => {
        if(!query) {
            return items;
        }
        return items.filter(card => card.name.toLowerCase().includes(query));
    }
    
    // Setting a variable for filteredItems.
    const filteredItems = getFilteredItems(query, cardInfo);

    return (
        <main>
            <Header header='Digital Binder' />
            <DeckTile
                deckColor={deckInfo.iconColor}
                name={deckInfo.title}
                deckDetails={deckInfo.description}
                cardTotal={deckInfo.totalCards}
                superRare={deckInfo.totalSupers}
                rare={deckInfo.totalRares}
                common={deckInfo.totalCommons}
            />
            <div style={styles.subContainer}>
                <BackButton />
                <Form.Control
                    style={styles.searchBar}
                    aria-label='search bar'
                    type='text'
                    id='searchInput'
                    placeholder='Browse Cards...'
                    onChange={(e) => {
                        setQuery(e.target.value.toLowerCase())
                    }}
                />
                <Button variant='danger' type='submit' style={styles.submitButton} onClick={handleShow}>
                    Delete Deck
                </Button>
            </div>
            <div style={styles.cardContainer}>
                {filteredItems.map(card => (
                    <Thumbnail
                        key={card.id}
                        name={card.name}
                        rarity={card.rarityShorthand}
                        link={`/card/${card.id}`}
                        cardImage={card.cardImage}
                    />
                ))}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Deck</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this deck?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='danger' onClick={handleDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}

export default DeckView;

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
        justifyContent: 'space-between',
    },
    searchBar: {
        width: '203px',
    }
}