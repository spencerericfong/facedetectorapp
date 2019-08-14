import React from 'react';
import Logo from '../Logo/Logo.js';
import './About.css';

const About = () => {
    return (
        <div>
            <h1 className="f-5-l"> Not Face Blind </h1>
            <div className="center">
                <Logo />
            </div>
            <div className='center'>
                <article className='f4 mw9 b nested-links a: var(--white)'>
                    <p>Welcome to <strong>Not Face Blind</strong>! This is a simple web application I made from scratch that detects and outlines faces in images that you provide through a url. This is my very first full stack web application, which I developed after teaching myself web development starting from zero knowledge whatsoever. The front end and website design was built in <strong>React.js</strong>, using a few royalty-free and/or open source assets along with the CSS toolkit <a href="https://tachyons.io/">TACHYONS</a>. The server is a RESTful API I designed using <strong>Node.js</strong> and <strong>Express.js</strong>. For users, I created a relational database using <strong>PostgreSQL</strong> to store necessary information. Furthermore, this website is deployed on the cloud platform <strong>Heroku</strong>. The face detection API itself is powered freely by <a href="https://www.clarifai.com/">Clarifai</a>. Feel free to check out the <a href="https://github.com/spencerericfong/not-face-blind">source code</a> for more documentation.</p>
                    <p>A quick disclaimer about registering and signing in: <strong>I DO NOT USE YOUR DATA FOR ANYTHING AT ALL.</strong></p>
                    <p>Feel free to provide fake names and fake emails all you'd like, because I'm not going to be using any of that data for anything. I probably won't even be looking at any of it, unless the site breaks or someone runs into some bugs.</p>
                    <p>With that all said, I hope you like the site and app. Thanks for visiting!</p>
                </article>
            </div>
        </div>
    );
}

export default About;
