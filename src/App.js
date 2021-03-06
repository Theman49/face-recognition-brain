import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from "./components/Signin/Signin";
import Registration from "./components/Registration/Registration";
import Navigation from "./components/Navigation/Navigation";
import Logo from './components/Logo/Logo';
import Rank from "./components/Rank/Rank";
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "2acb60de4ec649de94e890c5f4efc022"
});



const particlesOption = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response =>  this.displayFaceBox(this.calculateFaceLocation(response))
    .catch(err => console.log(err))
    );
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
    console.log(route, this.state.isSignedIn);
  }


  render(){
      return (
        <div className="App">
          <Particles className="particles"
              params={particlesOption}
          />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
          {this.state.route === 'home'
            ? <div>
                <Logo />
                <Rank />
                <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
              </div>
            : ( 
              this.state.route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange}/>
              : <Registration onRouteChange={this.onRouteChange}/>
            )
          }
        </div>
      );
  }
  
}

export default App;
