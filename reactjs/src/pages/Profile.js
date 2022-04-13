import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// Import Component
import Header from '../components/Header';

// Import Image
import userIcon from '../images/profilePic.png';


function Profile() {

    // React States
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const [profileInfo, setProfileInfo] = useState({
        firstName: '',
        lastName: '',
        bio: '',
        email: '',
    });

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        bio: '',
        email: '',
        password: '',
        id: '',
    });

    // Global variables for the Boostrap Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);
        let decodedUser = jwt_decode(userData.token);
        let userId = decodedUser.id;

        /**
         * @returns {Promise<void>}
         * This function will take information from localStorage with the key 'login' which is a JWT which is then
         * decoded and the user ID is passed into the axios GET call in the URL. Based on the information returned it
         * will set the profileInfo React state and the user React state.
         */
        async function fetchUser() {
            const user = await axios.get(`/user/${userId}`, {
                headers: {
                    Bearer: userData.token
                }
            })
            setProfileInfo({firstName: user.data.firstName, lastName: user.data.lastName, bio: user.data.bio, email: user.data.email});
            setUser({
                firstName: user.data.firstName,
                lastName: user.data.lastName,
                bio: user.data.bio,
                email: user.data.email,
                password: user.data.password,
                id: user.data.id
            });
        }
        fetchUser();
    }, []);

    /**
     * This function will set a data object filled with user information based on form input. It will then make an axios
     * POST request to update the user information.
     */
    function updateUserInfo() {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);
        let decodedUser = jwt_decode(userData.token);
        let userId = decodedUser.id;

        let data = {
            firstName: document.querySelector('#firstName').value,
            lastName: document.querySelector('#lastName').value,
            bio: document.querySelector('#bio').value,
            email: user.email,
            password: user.password,
            id: user.id,
        }

        /**
         * @returns {Promise<void>}
         * This function will make an axios POST request passing in the user data object that was generated above. If
         * the response comes back as a 200 status code it will then display a bootstrap modal to let the user know they
         * have updated their profile information successfully.
         */
        async function updateUser() {
            const user = await axios.post(`/user/${userId}`, data,{
                headers: {
                    Bearer: userData.token
                },
            })
            if(user.status >= 200 || user.status <= 299) {
                handleShow();
                let updateBtn = document.querySelector('.updateButton');
                updateBtn.disabled = true;
            }
        }
        updateUser();
    }

    /**
     * @param event
     *
     * This will check the form to ensure there are no errors, if there are errors it will display them to the user
     * otherwise it will trigger the updateUserInfo function.
     */
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            event.preventDefault();
            updateUserInfo();
        }

        setValidated(true);
    };


    return (
        <main>
            <Header header='Digital Binder' />
            <div style={styles.container}>
                <h1 style={styles.header}>Edit Profile</h1>
                <div style={styles.imgContainer}>
                    <img src={userIcon} alt='abstract user icon' />
                </div>
                <Form style={styles.formContainer} noValidate validated={validated} onSubmit={handleSubmit} onChange={() => {
                    let updateBtn = document.querySelector('.updateButton');

                    if (updateBtn.disabled === true) {
                        updateBtn.disabled = false;
                    }
                }}>

                    <Form.Group className='mb-3' controlId='email'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control readOnly type='email' defaultValue={profileInfo.email} />
                    </Form.Group>

                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId='firstName'>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control type='text' placeholder='Enter first name' defaultValue={profileInfo.firstName} required />
                            <Form.Control.Feedback type='invalid'>
                                Please provide a valid first name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId='lastName'>
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type='text' placeholder='Enter last name' defaultValue={profileInfo.lastName} required />
                            <Form.Control.Feedback type='invalid'>
                                Please provide a valid last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group className='mb-3' controlId='bio'>
                        <Form.Label>Bio:</Form.Label>
                        <Form.Control as='textarea' rows={3} placeholder='Enter a bio...' defaultValue={profileInfo.bio} required />
                        <Form.Control.Feedback type='invalid'>
                            Please provide a valid bio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button className='updateButton' variant='success' type='submit' disabled>
                        Update
                    </Button>
                </Form>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile Updated</Modal.Title>
                </Modal.Header>
                <Modal.Body>The profile was updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleClose}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}

export default Profile;

// CSS Modules
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '30px',
    },
    imgContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '40px',
        height: '150px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
        color: '#707070',
    },
    formContainer: {
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}