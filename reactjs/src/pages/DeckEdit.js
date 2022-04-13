import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// Import Component
import Header from '../components/Header';

// Import Image
import BlackDeck from '../images/black-deck.png';


function DeckEdit() {
    // Setting a variable for useParams().
    const params = useParams();

    // Setting a variable for useNavigate().
    const navigate = useNavigate();

    // React States
    const [validated, setValidated] = useState(false);
    const [deckInfo, setDeckInfo] = useState({
        title: '',
        iconColor: '',
        description: '',
    });

    useEffect(() => {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);

        /**
         * @returns {Promise<void>}
         * This function will make an axios GET request to retrieve a specific deck information which will then
         * be stored into React state. It will also update the image color based on what color value was saved for the
         * deck.
         */
        async function fetchDeck() {
            const deck = await axios.get(`/deck/${params.id}`, {
                headers: {
                    Bearer: userData.token
                }
            })
            setDeckInfo({title: deck.data.name, iconColor: deck.data.color, description: deck.data.description});

            if (deck.data.color === 'blue') {
                let select = document.querySelector('#deckColor');
                select.value = 'blue';
            }
        }
        fetchDeck();
    }, [params.id]);

    /**
     * This function will get user information from a JWT that is in localStorage, create a data object for the deck
     * and will make an axios POST request to update an existing deck based on the params.id. It will then redirect
     * the user to the previous page they were on.
     */
    function updateDeckInfo() {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);
        let decodedUser = jwt_decode(userData.token);
        let currentUserId = decodedUser.id;

        let data = {
            name: document.querySelector('#deckName').value,
            description: document.querySelector('#deckDescription').value,
            color: document.querySelector('#deckColor').value,
            userId: currentUserId,
        }

        async function updateDeck() {
            await axios.post(`/deck/${params.id}`, data,{
                headers: {
                    Bearer: userData.token
                },
            })
        }
        updateDeck();
        navigate(-1);
    }

    /**
     * @param event
     *
     * This will check the form to ensure there are no errors, if there are errors it will display them to the user
     * otherwise it will trigger the updateDeckInfo function.
     */
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            event.preventDefault();
            updateDeckInfo();
        }

        setValidated(true);
    };

    return (
        <main>
            <Header header='Digital Binder' />
            <h1 style={styles.h1}>Edit {deckInfo.title}</h1>
            <div style={styles.imgContainer}>
                <img src={BlackDeck} alt='black deck icon' style={styles.img} />
            </div>
            <div style={styles.container}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='deckName'>
                        <Form.Label>Deck Name:</Form.Label>
                        <Form.Control type='text' placeholder='Enter a deck name...' defaultValue={deckInfo.title} required />
                        <Form.Control.Feedback type='invalid'>
                            Please provide a valid name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='deckColor'>
                        <Form.Label>Deck Icon Color:</Form.Label>
                        <Form.Select aria-label='Deck Icon Color' required>
                            <option value='black'>Black (Default)</option>
                            <option value='blue'>Blue</option>
                        </Form.Select>
                    </Form.Group>
                    <br />
                    <Form.Group className='mb-3' controlId='deckDescription'>
                        <Form.Label>Deck Description:</Form.Label>
                        <Form.Control as='textarea' rows={3} placeholder='Enter a deck description...' defaultValue={deckInfo.description} required />
                        <Form.Control.Feedback type='invalid'>
                            Please provide a valid description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div style={styles.buttonContainer}>
                        <Button variant='secondary' style={styles.cancelButton} onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button variant='primary' type='submit' style={styles.submitButton}>
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
        </main>
    );
}

export default DeckEdit;

const styles = {
    container: {
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    h1: {
        textAlign: 'center',
        marginTop: '30px',
        marginBottom: '50px',
        color: '#707070',
    },
    submitButton: {
        backgroundColor: '#5CB85C',
        borderColor: 'lightgray',
    },
    cancelButton: {
        backgroundColor: 'lightgray',
        color: 'black',
        borderColor: 'lightgray',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px',
    },
    imgContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '50px',
    },
    img: {
        height: '187px',
    },
}