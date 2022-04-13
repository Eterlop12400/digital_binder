import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

// Import Components
import Header from '../components/Header';
import Collections from '../components/Collection';



function MyCollection() {

    // Setting a variable for useNavigate().
    let navigate = useNavigate();

    // React States
    const [collectionInfo, setCollectionInfo] = useState([]);
    const [collectionTotal, setCollectionTotal] = useState({
        numOfCollections: 0,
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
         * the collections the user has and the rarity of each card in that collection. Data retrieved will then be saved
         * in a React state.
         */
        async function fetchUser() {
            const user = await axios.get(`/user/${userId}`, {
                headers: {
                    Bearer: userData.token
                }
            })
            let superRares = 0;
            let collectionTotal = 0;
            let collectionArray = [];
            let userCollection = user.data.Collections;
            for (let col in userCollection) {
                let collectionSuper = 0;
                userCollection[col].totalCards = userCollection[col].Cards.length;
                collectionTotal++;
                for (let card in userCollection[col].Cards) {
                    if (userCollection[col].Cards[card].rarity === 'Super Rare') {
                        superRares++;
                        collectionSuper++;
                    }
                }
                userCollection[col].totalSupers = collectionSuper;
                collectionArray.push(userCollection[col]);
                setCollectionInfo(collectionArray);
                setCollectionTotal({numOfCollections: collectionTotal});
                setSuperRareTotal({numOfSuperRares: superRares});
            }
        }
        fetchUser();
    }, []);

    return (
        <main>
            <Header header='Digital Binder' />
            <header style={styles.header}>
                <h1 style={styles.h1}>My Collection</h1>
                <p style={styles.subHeader}>Total Collections: <span>{collectionTotal.numOfCollections}</span></p>
                <p style={styles.subHeader}>Super Rares: <span>{superRareTotal.numOfSuperRares}</span></p>
            </header>
            <div style={styles.menu}>
            <Button variant='success' style={styles.btn} onClick={() => {
                navigate('/collection/new');
                window.location.reload();
            }}>
                Add Collection
            </Button>
            </div>
            <div style={styles.container}>
                {collectionInfo.map(collection => (
                    <Collections
                        key={collection.id}
                        header={collection.name}
                        link={`/collection/${collection.id}`}
                        viewCollectionLink={`/collection/${collection.id}`}
                        editCollectionLink={`/collection/${collection.id}/edit`}
                        binderColor={collection.color}
                        cardCount={collection.totalCards}
                        superRareCount={collection.totalSupers}
                    />
                ))}
            </div>
        </main>
    );
}

export default MyCollection;

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