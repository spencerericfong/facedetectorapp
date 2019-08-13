import React from 'react';
import Logo from '../Logo/Logo.js';

const About = () => {
    return (
        <div>
            <h1 className="f-5-l"> Not Face Blind </h1>
            <div className="center">
                <Logo />
            </div>
            <article className='f3'>
                <p>This is an About page!</p>
            </article>
        </div>
    );
}

export default About;
