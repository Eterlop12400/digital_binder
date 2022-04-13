import React, {useState} from 'react';
import {Button, Form, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

// Import Image
import logo from '../images/grey-logo.png'




function Login() {

    // Setting a variable for useNavigate().
    const navigate = useNavigate();

    // React States
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');

    /**
     * @param event
     *
     * This will check the form to ensure there are no errors, if there are errors it will display them to the user
     * otherwise it will trigger the login function.
     */
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            login(event);
        }

        setValidated(true);
    };

    /**
     * This function will set the localStorage key item of 'login' to 'signup' which will then change the URL and
     * navigate the user to the sign-up page.
     */
    function signup () {
        localStorage.setItem('login', 'signup');
        navigate('/signup');
        window.location.reload();
    }

    /**
     * @param e
     *
     * This function will prevent the form from submitting, it will then make a POST request to 'auth/signin', passing
     * in data from the form inputs. It will then check to make sure there are no errors. If there are no errors it will
     * then set the localStorage of key 'login' to the response data which is a JWT. It will then redirect the user back
     * to the login page.
     */
    function login(e) {
        e.preventDefault();
        async function fetchUser() {
            const userData = await axios.post('/auth/signin', {
                email: document.querySelector('#email').value,
                password: document.querySelector('#password').value
            })
            return userData.data;
        }
        fetchUser()
            .then(r => {
                if (error !== ' ') {
                    const data = JSON.stringify(r);
                    localStorage.setItem('login', data);
                    navigate('/dashboard');
                    window.location.reload();
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

    return (
        <main style={styles.background}>
            <header style={styles.headerContainer}>
                <img src={logo} alt='three binders next to each other' />
                <h1 style={styles.headerText}>Digital Binder</h1>
            </header>
            <div style={styles.main}>
                <div style={styles.container}>
                    <h2 style={styles.header}>Login</h2>
                    <Form style={styles.formContainer} noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className='mb-3'>
                            <Form.Group controlId='email' style={styles.formInput}>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type='email' placeholder='Enter an Email' required onChange={() => {
                                    setError('')
                                }} />
                                <Form.Control.Feedback type='invalid'>
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='password' style={styles.formInput}>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type='password' placeholder='Enter a Password' required onChange={() => {
                                    setError('')
                                }} />
                                <Form.Control.Feedback type='invalid'>
                                    Please provide a valid password.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <p style={styles.error}>{error}</p>
                        </Row>
                            <Button variant='success' type='submit' style={styles.loginBtn}>
                                Login
                            </Button>
                    </Form>
                    <p style={styles.logout} onClick={signup}>Sign Up</p>
                </div>
            </div>
        </main>
    );
}

export default Login;

// CSS Modules
const styles = {
    main: {
       width: '50%',
       margin: 'auto',
    },
    header: {
        marginBottom: '50px',
        color: '#707070',
    },
    input: {
        width: '120%',
    },
    container: {
        display: 'flex',
        height: '600px',
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
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    formInput: {
        marginBottom: '20px',
    },
    loginBtn: {
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
    error: {
        color: 'red',
    },
}
