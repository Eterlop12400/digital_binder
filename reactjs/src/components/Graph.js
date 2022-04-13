import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';


function Graph(props) {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>{props.header}</h1>
            <div style={styles.subtopicContainer}>
                <p>{props.subTopic}: <span> {props.subTopicTotal}</span></p>
                <p>Total Cards: <span> {props.totalCards}</span></p>
            </div>
            <Chart
                chartType='PieChart'
                data={props.chartData}
                width={'100%'}
                height={'250px'}
            />
            <nav style={styles.navLink}>
                <NavLink to={props.link}>{props.linkTitle}</NavLink>
            </nav>
        </div>
    );
}

// Setting default value for prop.
Graph.defaultProps = {
    header: 'Graph Title',
    subTopic: 'Sub Topic',
    subTopicTotal: '2',
    totalCards: '15',
    chartData: [
        ['Rarity', 'Number of Cards'],
        ['Common', 11],
        ['Rare', 2],
        ['Super Rare', 2],
    ],
    link: '/dashboard',
    linkTitle: 'Dashboard',
};

// Setting expected value for prop.
Graph.propTypes = {
    header: PropTypes.string,
    subTopic: PropTypes.string,
    subTopicTotal: PropTypes.any,
    totalCards: PropTypes.any,
    chartData: PropTypes.array,
    link: PropTypes.string,
    linkTitle: PropTypes.string,
};

export default Graph;

// CSS Modules
const styles = {
    container: {
        height: '500px',
        width: '450px',
        backgroundColor: '#FCF9F9',
        boxShadow: '1px 1px 5px gray',
        borderRadius: '2px',
        marginBottom: '30px',
    },
    header: {
        textAlign: 'center',
        paddingTop: '30px',
    },
    subtopicContainer: {
       display: 'flex',
       justifyContent: 'space-between',
       paddingLeft: '20px',
       paddingRight: '20px',
    },
    navLink: {
        textAlign: 'center',
        marginTop: '60px',
    }
}