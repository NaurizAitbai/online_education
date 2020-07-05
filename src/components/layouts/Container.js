import React from 'react';


const Container = ({ children }) => {
    const style = {
        width: '75%',
        margin: '20px auto auto'
    }

    return (
        <div style={style}>{children}</div>
    )
}

export default Container;