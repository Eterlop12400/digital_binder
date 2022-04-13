import React, {useEffect, useState} from 'react';
import Header from '../components/Header';

import BackButton from '../components/BackButton';
import SingleLineDisplay from '../components/SingleLineDisplay';
import HalfLineDisplay from '../components/HalfLineDisplay';
import TextAreaDisplay from '../components/TextAreaDisplay';
import TripleLineDisplay from '../components/TripleLineDisplay';
import {Button, Modal} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

function CardView() {

    // React States
    const [show, setShow] = useState(false);
    const [cardInfo, setCardInfo] = useState({
        name: '',
        rarity: '',
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

    // Setting a variable for useParams().
    const params = useParams();

    // Setting a variable for useNavigate().
    const navigate = useNavigate();

    useEffect(() => {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);

        /**
         * @returns {Promise<void>}
         * This function will make an axios GET request using the card id for the params for the URL. It will then get
         * card information and set the data returned to the cardInfo state.
         */
        async function fetchCard() {
            const card = await axios.get(`/card/${params.id}`, {
                headers: {
                    Bearer: userData.token
                }
            })

            setCardInfo({
                name: card.data.name,
                rarity: card.data.rarity,
                cardType: card.data.type,
                cardImage: card.data.cardImage,
                faction: card.data.faction,
                characteristics: card.data.characteristics,
                cardEffect: card.data.effect,
                damage: card.data.damage,
                power: card.data.power,
                support: card.data.support,
            })
        }
        fetchCard();
    }, [params.id]);

    /**
     * This function will get the JWT data from localStorage and use that data in the axios GET request using the
     * urlParams to make a call to delete the card with the id that was passed into the request. It will then navigate
     * the user back the page they were previously on.
     */
    function handleDelete() {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);

        async function deleteCard() {
            await axios.get(`/card/${params.id}/delete`, {
                headers: {
                    Bearer: userData.token
                }
            })
        }
        deleteCard();
        navigate(-1);
    }

    return (
        <main>
            <Header header='Digital Binder' />
            <h1 style={styles.h1}>Card Details</h1>
            <div style={styles.subMenuContainer}>
                <BackButton />
                <div>
                    <Button variant='danger' type='submit' style={styles.submitButton} onClick={handleShow}>
                        Remove Card
                    </Button>
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
                    <Modal.Title>Remove Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this card?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='danger' onClick={() => {handleDelete()}}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

        </main>
    );
}

export default CardView;

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
}