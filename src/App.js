import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceDectector from './components/FaceDetector/FaceDetector.js';
import Rank from './components/Rank/Rank.js';
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import Particles from 'react-particles-js';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

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

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signIn',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: new Date(),
    },
};

toast.configure();

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined,
            },
        });
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        };
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onPictureSubmit = () => {
        this.setState({imageUrl: this.state.input});
            fetch('http://localhost:3000/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: this.state.input,
                }),
            })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id,
                        }),
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count }))
                        })
                        .catch(console.log);
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => {
                console.log(err);
                toast.error("Error loading image.", {
                    position: toast.POSITION.TOP_CENTER
                })
            });
    }

    onRouteChange = (route) => {
        if (route === 'signIn' || route === 'register') {
            this.setState(initialState);
        }
        else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({route: route});
    }

    invalidLogin = () => {
        toast.error("Invalid login.", {
            position: toast.POSITION.TOP_CENTER
        });
    }

    render() {
        const { imageUrl, box, route, isSignedIn } = this.state;
        return (
        <div className="App">
            <Particles className='particles' params={particlesOptions} />
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
            { route === 'home'
                ?   <div>
                        <h1 className="f-5-l">Not Face Blind</h1>
                        <Logo />
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
                        <FaceDectector box={box} imageUrl={imageUrl}/>
                    </div>
                :   (
                        route === 'signIn'
                        ?   <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} invalidLogin={this.invalidLogin}/>
                        :   <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    )
            }
        </div>
        );
    }
}

export default App;
