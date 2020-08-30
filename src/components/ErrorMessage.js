import React from 'react'

const ErrorMessage = ({ errorValue }) => (
    <div style={styles.container}>
        <p style={styles.errorText}>{errorValue}</p>
    </div>
)

const styles = {
    container: {
        marginLeft: 25
    },
    errorText: {
        color: 'red'
    }
}

export default ErrorMessage