import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// Import Component
import Header from '../components/Header';

// Import Image
import BlackBinder from '../images/black-binder.png';


function CollectionEdit() {

    // Setting a variable for useParams().
    const params = useParams();

    // Setting a variable for useNavigate().
    const navigate = useNavigate();

    // React States
    const [validated, setValidated] = useState(false);
    const [collectionInfo, setCollectionInfo] = useState({
        title: '',
        iconColor: '',
        description: '',
    });

    useEffect(() => {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);

        /**
         * @returns {Promise<void>}
         * This function will make an axios GET request to retrieve a specific collection information which will then
         * be stored into React state. It will also update the image color based on what color value was saved for the
         * collection.
         */
        async function fetchCollection() {
            const collection = await axios.get(`/collection/${params.id}`, {
                headers: {
                    Bearer: userData.token
                }
            })
            setCollectionInfo({title: collection.data.name, iconColor: collection.data.color, description: collection.data.description});

            if (collection.data.color === 'blue') {
                let select = document.querySelector('#collectionColor');
                select.value = 'blue'
            }
        }
        fetchCollection();
    }, [params.id]);

    /**
     * This function will get user information from a JWT that is in localStorage, create a data object for the collection
     * and will make an axios POST request to update an existing collection based on the params.id. It will then redirect
     * the user to the previous page they were on.
     */
    function updateCollectionInfo() {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);
        let decodedUser = jwt_decode(userData.token);
        let currentUserId = decodedUser.id;

        let data = {
            name: document.querySelector('#collectionName').value,
            description: document.querySelector('#collectionDescription').value,
            color: document.querySelector('#collectionColor').value,
            userId: currentUserId,
        }

        async function updateCollection() {
            await axios.post(`/collection/${params.id}`, data,{
                headers: {
                    Bearer: userData.token
                },
            })
        }
        updateCollection();
        navigate(-1);
    }

    /**
     * @param event
     *
     * This will check the form to ensure there are no errors, if there are errors it will display them to the user
     * otherwise it will trigger the updateCollectionInfo function.
     */
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            event.preventDefault();
            updateCollectionInfo();
        }

        setValidated(true);
    };

    return (
        <main>
            <Header header='Digital Binder' />
            <h1 style={styles.h1}>Edit {collectionInfo.title}</h1>
            <div style={styles.imgContainer}>
                <img src={BlackBinder} alt='black binder icon' />
            </div>
            <div style={styles.container}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='collectionName'>
                    <Form.Label>Collection Name:</Form.Label>
                    <Form.Control type='text' placeholder='Enter a collection name...' defaultValue={collectionInfo.title} required />
                    <Form.Control.Feedback type='invalid'>
                        Please provide a valid name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='collectionColor'>
                    <Form.Label>Collection Icon Color:</Form.Label>
                    <Form.Select aria-label='Collection Icon Color' required>
                        <option value='black'>Black (Default)</option>
                        <option value='blue'>Blue</option>
                    </Form.Select>
                </Form.Group>
                <br />
                <Form.Group className='mb-3' controlId='collectionDescription'>
                    <Form.Label>Collection Description:</Form.Label>
                    <Form.Control as='textarea' rows={3} placeholder='Enter a collection description...' defaultValue={collectionInfo.description} required />
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

export default CollectionEdit;

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
}