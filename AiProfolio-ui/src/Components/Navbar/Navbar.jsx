import "./Navbar.css"
import React from 'react';

function Navbar({navbar, data}) {
    const sections = ["experiences", "projects", "skills", "education"];


    return (
        <nav id="template-navbar" 
        style={navbar?.background}>
            <ul id='template-navbar-list'style={navbar?.list}>
                <li>
                    <a style={navbar?.item} href="#header">Home</a>
                </li>
                {sections.map((section) => {
                    return data[section][0] && 
                    <li key={section}>
                        <a style={navbar?.item} href={`#${section}`}>{capitalizeFirstLetter(section)}</a>
                    </li>
                })}
            </ul>
        </nav>
    );
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Navbar
