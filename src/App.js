import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 700
            }
        }
	}
}

class App extends Component {
    render() {
        return (
        <div className="App">
            <Particles className='particles' params={particlesOptions} />
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm />
            {/*
            <FaceDectector />*/}
        </div>
        );
    }
}

export default App;
