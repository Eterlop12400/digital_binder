import React from 'react';

function SingleLineDisplay(props) {
    return (
        <div>
            <p style={styles.inputLabel}>{props.labelName}:</p>
            <div style={styles.singleLineContainer}>
                <p style={styles.p}>{props.displayValue}</p>
            </div>
        </div>
    );
}

// Setting default value for prop.
SingleLineDisplay.defaultProps = {
    labelName: 'Label Name',
    displayValue: 'Default Value',
};

export default SingleLineDisplay;

// CSS Modules
const styles = {
    singleLineContainer: {
        display: 'flex',
        backgroundColor: '#003566',
        color: '#FFC300',
        paddingTop: '10px',
        paddingBottom: '10px',
        width: '500px',
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
