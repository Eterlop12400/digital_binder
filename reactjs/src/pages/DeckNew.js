import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Form} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";

// Import Component
import Header from "../components/Header";

// Import Image
import BlackDeck from "../images/black-deck.png";


function DeckNew() {

    // Setting a variable for useNavigate().
    const navigate = useNavigate();

    // React States
    const [validated, setValidated] = useState(false);

    /**
     * This function will create a deck data object and call the newCollection function passing in the data object
     * to create a new deck and redirect the user.
     */
    function createDeck() {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);
        let decodedUser = jwt_decode(userData.token);
        let userId = decodedUser.id;

        let data = {
            name: document.querySelector('#deckName').value,
            description: document.querySelector('#deckDescription').value,
            color: document.querySelector('#deckColor').value,
            userId: userId,
        }

        /**
         * @returns {Promise<void>}
         * This function will make an axios POST request to '/deck' using the deck data object to create
         * a new deck. It will then redirect the user to the page they were previously on.
         */
        async function newDeck() {
            await axios.post(`/deck`, data,{
                headers: {
                    Bearer: userData.token
                },
            })
        }
        newDeck();
        navigate(-1);
    }

    /**
     * @param event
     *
     * This will check the form to ensure there are no errors, if there are errors it will display them to the user
     * otherwise it will trigger the createDeck function.
     */
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            event.preventDefault();
            createDeck();
        }

        setValidated(true);
    };

    return (
        <main>
            <Header header='Digital Binder' />
            <h1 style={styles.h1}>New Deck</h1>
            <div style={styles.imgContainer}>
                <img src={BlackDeck} alt='black deck icon' style={styles.img} />
            </div>
            <div style={styles.container}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="deckName">
                        <Form.Label>Deck Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter a deck name..." required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="deckColor">
                        <Form.Label>Deck Icon Color:</Form.Label>
                        <Form.Select aria-label="Deck Icon Color" required>
                            <option value="black">Black (Default)</option>
                            <option value="blue">Blue</option>
                        </Form.Select>
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3" controlId="deckDescription">
                        <Form.Label>Collection Description:</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder='Enter a deck description...' required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div style={styles.buttonContainer}>
                        <Button variant="secondary" style={styles.cancelButton} onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" style={styles.submitButton}>
                            Create
                        </Button>
                    </div>
                </Form>
            </div>
        </main>
    );
}

export default DeckNew;

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