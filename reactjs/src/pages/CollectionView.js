import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {Button, Form, Modal} from 'react-bootstrap';

// Import Components
import Header from '../components/Header';
import Thumbnail from '../components/CardThumbnail';
import CollectionTile from '../components/CollectionTile';
import BackButton from '../components/BackButton';


function CollectionView() {

    // Setting a variable for useParams().
    const params = useParams();

    // Setting a variable for useNavigate().
    const navigate = useNavigate();

    // React States
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState('');
    const [cardInfo, setCardInfo] = useState([]);
    const [collectionInfo, setCollectionInfo] = useState({
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
     * This function will make an axios GET request to delete a specific collection. Afterwards, the user will be redirected
     * to the previous page they were on last.
     */
    function handleDelete() {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);

        async function deleteCollection() {
            await axios.get(`/collection/${params.id}/delete`, {
                headers: {
                    Bearer: userData.token
                }
            })
        }
        deleteCollection();
        navigate(-1);
    }

    // This will filter through an array based on user input.
    const getFilteredItems = (query, items) => {
        if(!query) {
            return items;
        }
        return items.filter(card => card.name.toLowerCase().includes(query));
    }

    // Setting a variable for filteredItems.
    const filteredItems = getFilteredItems(query, cardInfo);

    useEffect(() => {
        let common = 0;
        let rare = 0;
        let superRares = 0;
        let totalCollectionCards = 0;
        let cardArray = [];

        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);

        /**
         * @returns {Promise<void>}
         * This function will make an axios GET request to get information of a specific collection. Based on the data
         * received back from the axios request. It will then be saved to a React state.
         */
        async function fetchCollection() {
            const collection = await axios.get(`/collection/${params.id}`, {
                headers: {
                    Bearer: userData.token
                }
            });
            
            // If the data is null, it will redirect the user back to the main collection page.
            if (collection.data === null) {
                navigate('/collection/');
            }

            let collectionCard = collection.data.Cards;

            // This loop will go through each card in a collection and take count of the rarity.
            for (let card in collectionCard) {
                totalCollectionCards++;

                if (collectionCard[card].rarity === 'Super Rare') {
                    superRares++;
                } else if(collectionCard[card].rarity === 'Rare') {
                    rare++;
                } else if(collectionCard[card].rarity === 'Common') {
                    common++;
                }


                cardArray.push(collectionCard[card]);
            }
                setCardInfo(cardArray);
                setCollectionInfo({
                    title: collection.data.name,
                    iconColor: collection.data.color,
                    description: collection.data.description,
                    totalCards: totalCollectionCards,
                    totalSupers: superRares,
                    totalRares: rare,
                    totalCommons: common
                });
            }
        fetchCollection();
    }, [navigate, params.id]);
    
    return (
        <main>
            <Header header='Digital Binder' />
            <CollectionTile
                binderColor={collectionInfo.iconColor}
                name={collectionInfo.title}
                collectionDetails={collectionInfo.description}
                cardTotal={collectionInfo.totalCards}
                superRare={collectionInfo.totalSupers}
                rare={collectionInfo.totalRares}
                common={collectionInfo.totalCommons}
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
                    Delete Collection
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
                    <Modal.Title>Delete Collection</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this collection?</Modal.Body>
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

export default CollectionView;

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