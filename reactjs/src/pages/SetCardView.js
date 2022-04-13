import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Import Components
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import SingleLineDisplay from '../components/SingleLineDisplay';
import HalfLineDisplay from '../components/HalfLineDisplay';
import TextAreaDisplay from '../components/TextAreaDisplay';
import TripleLineDisplay from '../components/TripleLineDisplay';


function SetCardView() {

    // Setting a variable for useParams().
    const params = useParams();

    // Setting a variable for useNavigate().
    const navigate = useNavigate();

    // React States
    const [show, setShow] = useState(false);
    const [collectionInfo, setCollectionInfo] = useState([]);
    const [deckInfo, setDeckInfo] = useState([]);
    const [dropDownCategory, setDropDownCategory] = useState('collection');
        const [cardInfo, setCardInfo] = useState({
        name: '',
        rarity: '',
        rarityShorthand: '',
        cardType: '',
        cardImage: '',
        faction: '',
        characteristics: '',
        cardEffect: '',
        damage: '',
        power: '',
        support: '',
    });

    // Global variables for the Boostrap Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);
        let decodedUser = jwt_decode(userData.token);
        let userId = decodedUser.id;
        let collectionArray = [];
        let deckArray = [];

        /**
         * @returns {Promise<void>}
         * This function uses an axios GET call to 'card/${params.id}' and with the data returned it will then check to
         * make sure the data returned isn't null.
         */
        async function fetchCard() {
            const card = await axios.get(`/card/${params.id}`, {
                headers: {
                    Bearer: userData.token
                }
            })

            if (card.data === null || card.data.setId === null) {
                navigate(-1);
            }

            /**
             * @returns {Promise<void>}
             * This function will make a axios GET request to get the user information. Based on the information returned
             * it will then be run through a loop so that we can get user decks and user collections.
             */
            async function fetchUser() {
                const user = await axios.get(`/user/${userId}`, {
                    headers: {
                        Bearer: userData.token
                    }
                })
                let userCollection = user.data.Collections;

                for (let col in userCollection) {
                    collectionArray.push(userCollection[col]);
                }

                let userDeck = user.data.Decks;

                for (let deck in userDeck) {
                    deckArray.push(userDeck[deck]);
                }
                setDeckInfo(deckArray);
                setCollectionInfo(collectionArray);
                collectionCheck(collectionArray, deckArray);
            }

            setCardInfo({
                name: card.data.name,
                rarity: card.data.rarity,
                rarityShorthand: card.data.rarityShorthand,
                cardType: card.data.type,
                cardImage: card.data.cardImage,
                faction: card.data.faction,
                characteristics: card.data.characteristics,
                cardEffect: card.data.effect,
                damage: card.data.damage,
                power: card.data.power,
                support: card.data.support,
            });
            fetchUser();
        }
        fetchCard();
    }, [navigate, params.id]);

    /**
     * @param e
     * This function will toggle the dropdown menu based on if the toggle is on collection or deck.
     */
    function radioChange (e) {
        if (e.target.id === 'inline-radio-1') {
            setDropDownCategory('collection');
        } else if (e.target.id === 'inline-radio-2') {
            setDropDownCategory('deck');
        }
    }


    function collectionCheck (collection, deck) {
        if (collection.length === 0 && deck.length === 0) {
            setDropDownCategory('none');
        } else if (collection.length === 0) {
            document.querySelector('.collectionContainer').style.display = 'none';
            setDropDownCategory('deck');
            document.querySelector('#inline-radio-2').checked = true;
        } else if (deck.length === 0) {
            document.querySelector('.deckContainer').style.display = 'none';
            setDropDownCategory('collection');
        }
    }


    function addCard () {
        let collectionId;
        let deckId;
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);

        if (dropDownCategory === 'collection') {
            let collection = document.querySelector('.collectionList').children;
            for (let col in collection) {
                if (collection[col].selected === true) {
                    collectionId = collection[col].id;
                    collectionId = parseInt(collectionId);
                }
            }

            let data = {
                name: cardInfo.name,
                rarity: cardInfo.rarity,
                rarityShorthand: cardInfo.rarityShorthand,
                type: cardInfo.cardType,
                cardImage: cardInfo.cardImage,
                faction: cardInfo.faction,
                characteristics: cardInfo.characteristics,
                effect: cardInfo.cardEffect,
                damage: cardInfo.damage,
                power: cardInfo.power,
                support: cardInfo.support,
                collectionId: collectionId,
            }

            /**
             * @returns {Promise<void>}
             * This function will make an axios POST request, passing in the card data object to create a card.
             */
            async function createCard() {
                await axios.post(`/card`, data, {
                    headers: {
                        Bearer: userData.token
                    }
                });
            }
            createCard();

        } else if (dropDownCategory === 'deck') {
            let deck = document.querySelector('.deckList').children;
            for (let col in deck) {
                if (deck[col].selected === true) {
                    deckId = deck[col].id;
                }
            }

            let data = {
                name: cardInfo.name,
                rarity: cardInfo.rarity,
                rarityShorthand: cardInfo.rarityShorthand,
                type: cardInfo.cardType,
                cardImage: cardInfo.cardImage,
                faction: cardInfo.faction,
                characteristics: cardInfo.characteristics,
                effect: cardInfo.cardEffect,
                damage: cardInfo.damage,
                power: cardInfo.power,
                support: cardInfo.support,
                deckId: deckId,
            }

            /**
             * @returns {Promise<void>}
             * This function will make an axios POST request, passing in the card data object to create a card.
             */
            async function createCard() {
                await axios.post(`/card`, data, {
                    headers: {
                        Bearer: userData.token
                    }
                });
            }
            createCard();
        }
        handleShow();
    }

    return (
        <main>
            <Header header='Digital Binder' />
            <h1 style={styles.h1}>Card Details</h1>
            <div style={styles.subMenuContainer}>
                <BackButton />
                <div style={styles.menuContainer}>
                    <div style={styles.menu}>
                        {dropDownCategory !== 'none' &&
                            <Form.Group>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className='mb-3'>
                                        <Form.Check
                                            inline
                                            className='collectionContainer'
                                            label='Collection'
                                            name='group1'
                                            type={type}
                                            id={`inline-${type}-1`}
                                            value='Collection'
                                            defaultChecked={true}
                                            onChange={radioChange}
                                        />
                                        <Form.Check
                                            inline
                                            className='deckContainer'
                                            label='Deck'
                                            name='group1'
                                            type={type}
                                            value='Deck'
                                            id={`inline-${type}-2`}
                                            onChange={radioChange}
                                        />
                                    </div>
                                ))}
                            </Form.Group>
                        }
                    </div>
                        {dropDownCategory === 'collection' &&
                            <div style={styles.menu}>
                            <Form.Group controlId='collectionItems'>
                                <Form.Select defaultValue='Choose...' style={styles.dropdown} className='collectionList'>
                                    {collectionInfo.map(collection => (
                                        <option key={collection.id} id={collection.id}>{collection.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Button variant='success' type='submit' onClick={addCard}>
                            Add Card
                            </Button>
                            </div>
                        }
                        {dropDownCategory === 'deck' &&
                            <div style={styles.menu}>
                            <Form.Group controlId='deckItems'>
                                <Form.Select defaultValue='Choose...' style={styles.dropdown} className='deckList'>
                                    {deckInfo.map(deck => (
                                        <option key={deck.id} id={deck.id}>{deck.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Button variant='success' type='submit' onClick={addCard}>
                            Add Card
                            </Button>
                            </div>
                        }

                        {dropDownCategory === 'none' &&
                        <p>No Deck or Collections Available!</p>
                        }
                </div>
            </div>
            <div style={styles.cardContainer}>
                <img src={cardInfo.cardImage} alt='clash of bonds card' style={styles.card} />
                <div style={styles.cardInfo}>
                    <SingleLineDisplay labelName='Card Name' displayValue={cardInfo.name} />
                    <SingleLineDisplay labelName='Rarity' displayValue={cardInfo.rarity} />
                    <div style={styles.multiDisplayContainer}>
                        <HalfLineDisplay labelName='Card Type' displayValue={cardInfo.cardType} />
                        <HalfLineDisplay labelName='Faction' displayValue={cardInfo.faction} />
                    </div>
                    <SingleLineDisplay labelName='Characteristics' displayValue={cardInfo.characteristics} />
                    <TextAreaDisplay labelName='Card Effect' displayValue={cardInfo.cardEffect} />
                    <div style={styles.multiDisplayContainer}>
                        <TripleLineDisplay labelName='Damage' displayValue={cardInfo.damage} />
                        <TripleLineDisplay labelName='Power' displayValue={cardInfo.power} />
                        <TripleLineDisplay labelName='Support' displayValue={cardInfo.support} />
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Card Added</Modal.Title>
                </Modal.Header>
                <Modal.Body>The card was added successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='success' onClick={() => {
                        navigate(-1);
                    }}>
                        Return to Set
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}

export default SetCardView;

// CSS Modules
const styles = {
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '15px',
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
    h1: {
        textAlign: 'center',
        marginTop: '30px',
        marginBottom: '50px',
        color: '#707070',
    },
    multiDisplayContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardInfo: {
        marginLeft: '15px',
    },
    subMenuContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '25px',
        alignContent: 'center',
    },
    card: {
        width: '417px',
        height: '631px',
        borderRadius: '3px',
        boxShadow: '3px 3px 8px gray',
    },
    menu: {
        display: 'flex',
    },
    menuContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    dropdown: {
      width: '200px',
    },
}
