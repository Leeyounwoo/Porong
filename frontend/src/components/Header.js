import React, { useEffect } from 'react';


export default function Header({ bback, name }) {


    
    return (
        <>
            <button>{bback ? '<' : ''}</button>
            <span>{name}</span>
            <button>hamburger</button>
        </>
    )
}

