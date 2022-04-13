import React from 'react';

function TripleLineDisplay(props) {
    return (
        <div>
            <p style={styles.inputLabel}>{props.labelName}:</p>
            <div style={styles.tripleLineContainer}>
                <p style={styles.p}>{props.displayValue}</p>
            </div>
        </div>
    );
}

// Setting default value for prop.
TripleLineDisplay.defaultProps = {
    labelName: 'Label Name',
    displayValue: 'Default Value',
};

export default TripleLineDisplay;

// CSS Modules
const styles = {
    tripleLineContainer: {
        display: 'flex',
        backgroundColor: '#003566',
        color: '#FFC300',
        paddingTop: '10px',
        paddingBottom: '10px',
        width: '156px',
        borderRadius: '3px',
        marginBottom: '10px',
    },
    p: {
        marginBottom: '0',
        marginLeft: '10px',
    },
    inputLabel: {
        marginBottom: '2px',
    }
}
