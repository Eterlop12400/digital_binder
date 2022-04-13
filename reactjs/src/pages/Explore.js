import React, {useEffect, useState} from 'react';
import axios from 'axios';

// Import Components
import Header from '../components/Header';
import GameTile from '../components/GameTile';


function Explore() {

    // React States
    const [gameInfo, setGameInfo] = useState([]);

    useEffect(() => {
        let userData = localStorage.getItem('login');
        userData = JSON.parse(userData);

        /**
         * @returns {Promise<void>}
         * This function using an axios GET request to '/game' which will then take the data returned and loop through it
         * pushing each game into the gameArray which will then be saved using React state by setting gameInfo.
         */
        async function fetchGames() {
            const game = await axios.get(`/game`, {
                headers: {
                    Bearer: userData.token
                }
            })
            let gameArray = [];
            let gameInfo = game.data;

            /*
            This will loop through each game in the returned data and will push each game into an array.
             */
            for (let col in gameInfo) {
                    gameArray.push(gameInfo[col]);
                }
            setGameInfo(gameArray);
        }
        fetchGames();
    }, []);

    return (
        <main>
            <Header header='Digital Binder' />
            <header style={styles.header}>
                <h1 style={styles.h1}>Select a Game </h1>
            </header>
            <div style={styles.container}>
                {gameInfo.map(game => (
                    <GameTile
                        key={game.id}
                        gameTitle={game.name}
                        gameImg={game.gameImage}
                        link={`/explore/${game.id}`}
                    />
                ))}
            </div>
        </main>
    );
}

export default Explore;

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
}