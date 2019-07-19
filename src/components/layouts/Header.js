import React from 'react';
import {Link} from 'react-router-dom';

function Header(){
    return(
        <header style={headerStyle}>
            <h1>TodoList</h1>
            <Link style={linkStyle} to="/">Home</Link> | 
            <Link style={linkStyle} to="/about"> About</Link>
        </header>
    )
}

const headerStyle = {
    background: '#333',
    padding: '10px',
    textAlign: 'center',
    color: '#fff'
}
const linkStyle ={
    color:'#fff',
    textDecoration:'none'
}
export default Header;