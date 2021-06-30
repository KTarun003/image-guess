import './App.css';
import React, {Component} from 'react';
import words from "./words";
const sstk = require("shutterstock-api");

sstk.setAccessToken("v2/WHBvTEFHaHFiTXg0dUl5V0xxdmtlUWptNWNrZ1llTjYvMzA0MTAzNTQxL2N1c3RvbWVyLzQvR0JONWx4M2JHQkpGWHdFVS1PQXh4STFVUVQwZlI2cVB2LVhnZl9QMFF4NW9nS0cteHRORFFubXprQjUzWVpMbWpNdnl2RXBnbjNFN1hwQXd6UnhhQTB6VXhQZlBfV0dGaWdJRUxvSXZqeDdsRXlhMVdlWTNBTHNUaWdrN0FTU1FLa2NDX0lDWW01aFBWY3ZPYmduZlEycGtyRlh4b1kyZDlGTDhmdlRGbUo1eUgyWWhjUnFWX0QzOUJva0l0UFQ3dVlkbFZwRUpzUWtETS0xMU1aeENPdy80eWlGN051d1kzNnE3d0dMLUJUb0tB");

const winText = <div className="row">
    <div className="col-md-3"/>
    <h1 className="col-md-6">You Win!!!</h1>
    <div className="col-md-3"/>
</div>;

class App extends Component {
    constructor(props) {
        super(props);
        this.state ={
            src:"",
            input:"",
            word: words[Math.floor(Math.random() * 1000)],
            prediction: "",
            win:false
        }
    }

    componentDidMount() {
        const queryParams = {
            "query": this.state.word,
            "image_type": "photo",
        };
        const imagesApi = new sstk.ImagesApi();
        imagesApi.searchImages(queryParams)
            .then(({data}) => {
                if(data.length === 0){
                    alert("Error: Fetching Image!!");
                }
                else {
                    let index = Math.floor(Math.random() * 20);
                    console.log(index)
                    this.setState({src: data[index].assets.preview.url});
                    console.log(data[index].assets.preview.url);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleInput(e){
        this.setState({input: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.input + "  " + this.state.word)
        if(this.state.word.includes(this.state.input)){
            this.setState({win:true});
        }
    }

    predictWord(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: this.state.src })
        };
        fetch('http://127.0.0.1:5000/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ prediction: data.word }));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Image Guess Game</h1>
                </header>
                <div className="container">
                    <div className="row">
                        <img className="col-md-8" src={this.state.src} alt="The Word" height="350" width="350"/>
                    </div>
                    <div className="row">
                        <input className="col-md-6 " type="text" value={this.state.input} onChange={this.handleInput.bind(this)}/>
                        <button className="col-md-2 btn btn-primary" type="submit" onClick={this.handleSubmit.bind(this)} >Submit</button>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Do you want to predict word using AI?</label>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-success" onClick={this.predictWord.bind(this)} >Yes</button>
                        </div>
                        <div className="col-md-4">
                            <label>Predicted Word : </label>
                            <h4>{this.state.prediction}</h4>
                        </div>
                    </div>
                    {this.state.win?winText:""}
                </div>
            </div>
        );
    }
}

export default App;