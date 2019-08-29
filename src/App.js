import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceDectector from './components/FaceDetector/FaceDetector.js';
import Rank from './components/Rank/Rank.js';
import About from './components/About/About.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Footer from './components/Footer/Footer.js';
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
    box: [],
    route: 'about',
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
        const clarifaiFace = data.region_info.bounding_box;
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
        this.state.box.push(box);
        this.setState({box: this.state.box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onPictureSubmit = () => {
        this.setState({imageUrl: this.state.input});
        if (this.state.input === '') {
            return;
        }
            fetch('https://not-face-blind-api.herokuapp.com/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: this.state.input,
                }),
            })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('https://not-face-blind-api.herokuapp.com/image', {
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
                        .catch(err => {
                            console.log(err);
                            toast.error("Oops! An error occurred.", {
                                position: toast.POSITION.TOP_CENTER
                            })
                        });
                }
                for (const region of response.outputs[0].data.regions) {
                    this.displayFaceBox(this.calculateFaceLocation(region));
                }
            })
            .catch(err => {
                console.log(err);
                toast.error("Error loading image. Is the url valid?", {
                    position: toast.POSITION.TOP_CENTER
                })
            });
    }

    onRouteChange = (route) => {
        if (route === 'signIn' || route === 'register' || route === 'about') {
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
                        :   (
                                route === 'register'
                                ?   <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                                :   <About />
                            )
                    )
            }
            <Footer />
        </div>
        );
    }
}

export default App;
