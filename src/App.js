import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceDectector from './components/FaceDetector/FaceDetector.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
 apiKey: '44f01c9389e94f299758e8ac27fd7071'
});

const particlesOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        }
	}
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
        };
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
            function(response) {
                console.log(response);
            },
            function(err) {
              // there was an error
            }
          );
    }

    render() {
        return (
        <div className="App">
            <Particles className='particles' params={particlesOptions} />
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm
                onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}
            />
            <FaceDectector imageUrl={this.state.imageUrl}/>
        </div>
        );
    }
}

export default App;
