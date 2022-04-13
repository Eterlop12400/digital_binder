import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// Import Components
import Header from '../components/Header';
import Graph from '../components/Graph';

function Dashboard() {

    // React States
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        id: '',
    });
    const [collectionInfo, setCollectionInfo] = useState({
        totalCollections: 0,
        totalCards: 0,
        commons: 0,
        rares: 0,
        superRares: 0,
        chartData: [],
    });
    const [deckInfo, setDeckInfo] = useState({
        totalDecks: 0,
        totalCards: 0,
        commons: 0,
        rares: 0,
        superRares: 0,
        chartData: [],
    });

    useEffect(() => {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);
        let decodedUser = jwt_decode(userData.token);
        let userId = decodedUser.id;

        /**
         * @returns {Promise<void>}
         * This function will make an axios GET call to 'user/${userId}' where userId is the JWT decoded value. Based on
         * the axios call returned value it will then set the user react state. It will also get information about the
         * user's collections and deck and will set the React state collectionInfo and deckInfo.
         */
        async function fetchUser() {
            const user = await axios.get(`/user/${userId}`, {
                headers: {
                    Bearer: userData.token
                }
            })
            setUser({firstName: user.data.firstName, lastName: user.data.lastName, id: user.data.id});

            getDeckOrCollectionInfo(user.data.Collections, 'collection');
            getDeckOrCollectionInfo(user.data.Decks, 'deck');
        }
        fetchUser();
    }, []);

    /**
     * @param userDeckOrCollection
     * @param deckOrCollection
     * This function will take in the information from the params and will loop through the data
     * (user collection or user deck). It will then set the React state based on either the second parameter is 'deck'
     * or 'collection'.
     */
    function getDeckOrCollectionInfo(userDeckOrCollection, deckOrCollection) {
        // Get Deck or Collection Info
        let userDeckOrCollectionInfo = userDeckOrCollection;
        let deckOrCollectionCommon = 0;
        let deckOrCollectionRare = 0;
        let deckOrCollectionSuperRare = 0;
        let deckOrCollectionTotalCards = 0;
        let numOfTotalDeckOrCollections = 0;
        let deckOrCollectionChartData = [['Rarity', 'Number of Cards']];

        if (deckOrCollection === 'collection' || deckOrCollection === 'deck') {
            // This will loop through each collection the user has.
            for (let col in userDeckOrCollectionInfo) {
                deckOrCollectionTotalCards += userDeckOrCollectionInfo[col].Cards.length;
                numOfTotalDeckOrCollections++;

                /*
                 This will loop through each card in each collection a user has and updates the rarity count based on
                 what rarity the card is.
                 */
                for (let card in userDeckOrCollectionInfo[col].Cards) {
                    if (userDeckOrCollectionInfo[col].Cards[card].rarity === 'Super Rare') {
                        deckOrCollectionSuperRare++;
                    } else if (userDeckOrCollectionInfo[col].Cards[card].rarity === 'Rare') {
                        deckOrCollectionRare++;
                    } else if (userDeckOrCollectionInfo[col].Cards[card].rarity === 'Common') {
                        deckOrCollectionCommon++;
                    }
                }
            }

            /*
             If there is no data being returned for any one of the rarities we want to not include it since Google Charts
             does not like receiving data if the result is 0.
             */
            if (deckOrCollectionCommon > 0) {
                deckOrCollectionChartData.push(['Common', deckOrCollectionCommon]);
            }
            if (deckOrCollectionRare > 0) {
                deckOrCollectionChartData.push(['Rare', deckOrCollectionRare]);
            }
            if (deckOrCollectionSuperRare > 0) {
                deckOrCollectionChartData.push(['Super Rare', deckOrCollectionSuperRare]);
            }

            // Based on if the second parameter is 'collection' or 'deck' it will set the React state accordingly.
            if (deckOrCollection === 'collection') {
                setCollectionInfo({
                    totalCollections: numOfTotalDeckOrCollections,
                    totalCards: deckOrCollectionTotalCards,
                    commons: deckOrCollectionCommon,
                    rares: deckOrCollectionRare,
                    superRares: deckOrCollectionSuperRare,
                    chartData: deckOrCollectionChartData,
                });
            } else if (deckOrCollection === 'deck') {
                setDeckInfo({
                    totalDecks: numOfTotalDeckOrCollections,
                    totalCards: deckOrCollectionTotalCards,
                    commons: deckOrCollectionCommon,
                    rares: deckOrCollectionRare,
                    superRares: deckOrCollectionSuperRare,
                    chartData: deckOrCollectionChartData,
                });
            }
        } else {
            console.error(`deckOrCollection must be either 'collection' or 'deck'!`);
            return;
        }
    }

    return (
        <main>
            <Header header='Digital Binder' />
            <h1 style={styles.header}>Welcome Back {user.firstName}!</h1>
            <div style={styles.graphContainer}>
                <Graph header='My Collection(s)'
                       subTopic='Collections'
                       subTopicTotal={collectionInfo.totalCollections}
                       totalCards={collectionInfo.totalCards}
                       link='/collection'
                       linkTitle='View Collection(s)'
                       chartData={collectionInfo.chartData}
                />
                <Graph header='My Deck(s)'
                       subTopic='Decks'
                       subTopicTotal={deckInfo.totalDecks}
                       totalCards={deckInfo.totalCards}
                       link='/deck'
                       linkTitle='View Deck(s)'
                       chartData={deckInfo.chartData}
                />
            </div>
        </main>
    );
}

export default Dashboard;

// CSS Modules
const styles = {
    graphContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    header: {
        textAlign: 'center',
        fontSize: '36px',
        marginBottom: '120px',
        color: '#707070',
        marginTop: '30px',
    },
}
