import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

// Import Components
import Header from '../components/Header';
import SetTile from '../components/SetTile';
import BackButton from '../components/BackButton';

function Set() {

    // React States
    const [setInfo, setSetInfo] = useState([]);

    // Setting a variable for useParams().
    const params = useParams();


    useEffect(() => {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);

        /**
         * @returns {Promise<void>}
         * This function is using an axios GET request to '/game' which will then take the data returned and loop through it
         * pushing each set in each game into the setArray which will then be saved using React state by setting setInfo.
         */
        async function fetchGames() {
            const game = await axios.get(`/game/${params.id}`, {
                headers: {
                    Bearer: userData.token
                }
            })
            let setArray = [];
            let gameInfo = game.data.Sets;

            /*
            This will loop through each game in the returned data and will push each game into an array.
            */
            for (let col in gameInfo) {
                setArray.push(gameInfo[col]);
            }
            setSetInfo(setArray);
        }
        fetchGames();
    }, [params.id]);

    return (
        <main>
            <Header header='Digital Binder' />
            <header style={styles.header}>
                <h1 style={styles.h1}>Select a Set</h1>
            </header>
            <div style={styles.subContainer}>
                <BackButton />
            </div>
            <div style={styles.container}>
                {setInfo.map(set => (
                    <SetTile
                        key={set.id}
                        setTitle={set.name}
                        setImg={set.gameImage}
                        link={`/set/${set.id}`}
                    />
                ))}
            </div>
        </main>
    );
}

export default Set;

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
        marginBottom: '120px',
        color: '#707070',
        marginTop: '30px',
    },
    h1: {
        fontSize: '36px',
        marginBottom: '0',
    },
    subContainer: {
        display: 'flex',
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexWrap: 'wrap',
        marginBottom: '50px',
    }
}