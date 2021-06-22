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
                let index = Math.floor(Math.random() * 20);
                this.setState({src: data[index].assets.preview.url});
                console.log(data[index].assets.preview.url);
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

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Image Guess Game</h1>
                </header>
                <div className="row">
                    <div className="col-md-2"/>
                    <img className="col-md-8" src={this.state.src} alt="The Word" height="300" width="300"/>
                    <div className="col-md-2"/>
                </div>
                <div className="row">
                        <div className="col-md-2"/>
                        <input className="col-md-6 " type="text" value={this.state.input} onChange={this.handleInput.bind(this)}/>
                    <button className="col-md-2" type="submit" onClick={this.handleSubmit.bind(this)} >Submit</button>
                        <div className="col-md-2"/>
                </div>
                {this.state.win?winText:""}
            </div>
        );
    }
}

export default App;