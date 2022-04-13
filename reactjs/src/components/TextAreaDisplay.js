import React from 'react';

function TextAreaDisplay(props) {
    return (
        <div>
            <p style={styles.inputLabel}>{props.labelName}:</p>
            <div style={styles.textAreaContainer}>
                <p style={styles.p}>{props.displayValue}</p>
            </div>
        </div>
    );
}

// Setting default value for prop.
TextAreaDisplay.defaultProps = {
    labelName: 'Label Name',
    displayValue: 'Default Value',
};

export default TextAreaDisplay;

// CSS Modules
const styles = {
    textAreaContainer: {
        display: 'flex',
        backgroundColor: '#003566',
        color: '#FFC300',
        paddingTop: '10px',
        paddingBottom: '10px',
        width: '500px',
        borderRadius: '3px',
        marginBottom: '10px',
        height: '195px',
        textOverflow: 'ellipsis',
    },
    p: {
        marginBottom: '0',
        marginLeft: '10px',
        marginRight: '10px',
    },
    inputLabel: {
        marginBottom: '2px',
    }
}
