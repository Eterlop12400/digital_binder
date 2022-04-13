import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import axios from 'axios';

// Import Image
import logo from '../images/grey-logo.png';


function SignUp() {

    // React States
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    // Global variables for the Boostrap Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Setting a variable for useNavigate().
    let navigate = useNavigate();

    /**
     * @param event
     *
     * This will check the form to ensure there are no errors, if there are errors it will display them to the user
     * otherwise it will trigger the signUp function.
     */
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            signUp(event);
        }

        setValidated(true);
    };

    /**
     * @param e
     * This function will prevent the form from submitting. It will then make an axios POST request to 'auth/signup',
     * using data from the form inputs. It will then check to make sure there are no errors. If there are no errors it
     * will then display a boostrap modal to the user letting them know they signed up successfully.
     */
    function signUp (e) {
        e.preventDefault();
        async function createUser() {
            await axios.post('/auth/signup', {
                email: document.querySelector('#email').value,
                password: document.querySelector('#password').value,
                firstName: document.querySelector('#firstName').value,
                lastName: document.querySelector('#lastName').value,
                bio: document.querySelector('#bio').value,
            })
        }
        createUser()
            .then(r => {
                if (error !== ' ') {
                    handleShow();
                }
            })
            .catch(function (error) {
                    if (error.response) {
                        let errorMsg = error.response.data;

                        for (let key in errorMsg) {
                            setError(errorMsg[key]);
                        }
                    }
                });
    }

    /**
     * This function will remove localStorage with the key of 'login'. It will then redirect the user back to the login
     * page.
     */
    function back () {
        localStorage.removeItem('login');
        navigate('/login');
        window.location.reload();
    }

    return (
        <main style={styles.background}>
            <header style={styles.headerContainer}>
                <img src={logo} alt='three binders next to each other' />
                <h1 style={styles.headerText}>Digital Binder</h1>
            </header>
            <div style={styles.main}>
                <div style={styles.container}>
                    <h2 style={styles.header}>Sign Up</h2>
                    <Form style={styles.formContainer} noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type='email' placeholder='Enter an Email' required onChange={() => {
                                setError('');
                            }} />
                            <Form.Control.Feedback type='invalid'>
                                Please provide a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='password'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type='password' placeholder='Enter a Password' required onChange={() => {
                                setError('');
                            }} />
                            <Form.Control.Feedback type='invalid'>
                                Please provide a valid password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row className='mb-3'>
                            <Form.Group as={Col} controlId='firstName'>
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control type='text' placeholder='Enter first name' required onChange={() => {
                                    setError('');
                                }} />
                                <Form.Control.Feedback type='invalid'>
                                    Please provide a valid first name.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId='lastName'>
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control type='text' placeholder='Enter last name' required onChange={() => {
                                    setError('');
                                }} />
                                <Form.Control.Feedback type='invalid'>
                                    Please provide a valid last name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Form.Group className='mb-3' controlId='bio'>
                            <Form.Label>Bio:</Form.Label>
                            <Form.Control as='textarea' rows={3} placeholder='Enter a bio...' required onChange={() => {
                                setError('');
                            }} />
                            <Form.Control.Feedback type='invalid'>
                                Please provide a valid bio.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <p style={styles.error}>{error}</p>

                        <p style={styles.message}>Need to go back? <span onClick={back} style={styles.back}>Click here</span></p>

                        <Button variant='success' type='submit' style={styles.signupBtn}>
                            Create Account
                        </Button>
                    </Form>
                </div>
            </div>

            <Modal show={show} onHide={() => {
                back();
                handleClose();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Account Created</Modal.Title>
                </Modal.Header>
                <Modal.Body>Account has been created successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={back}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}

export default SignUp;

// CSS Modules
const styles = {
    main: {
        width: '50%',
        margin: 'auto',
    },
    header: {
        marginBottom: '20px',
        color: '#707070',
    },
    input: {
        width: '120%',
    },
    container: {
        display: 'flex',
        height: 'auto',
        minHeight: '700px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDF6F9',
        borderRadius: '5px',
    },
    background: {
        minHeight: '110vh',
        height: 'auto',
        background: 'linear-gradient(0deg, rgba(0,53,102,1) 0%, rgba(247,247,247,1) 100%)',
    },
    formContainer: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    formInput: {
        marginBottom: '20px',
    },
    signupBtn: {
        width: '100%',
        backgroundColor: '#FFD60A',
        color: '#003566',
        marginBottom: '20px',
    },
    headerContainer: {
        color: '#001D3D',
        height: '250px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '0',
    },
    headerText: {
        marginTop: '0',
        marginBottom: '0',
        fontSize: '40px',
    },
    logout: {
        cursor: 'pointer',
    },
    back: {
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    message: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
}