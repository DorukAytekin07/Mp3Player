import React from "react";
import Songs from "./songs.json"
export default class Song extends React.Component{
    //yarin bunu basina mp3player ekle base ksimina bde oyle dene amk
    state = {
        play: false,
        index:0
    }
    sarkilar = [];
    songState = "Pause"
    songs = Songs.songs.map(song => this.sarkilar.push(song));
    playingSong = new Audio(this.sarkilar[this.state.index].url);

    togglePlay = () => {
        this.setState({ play: !this.state.play ? true : false }, () => {
          this.state.play ? this.playingSong.play() : this.playingSong.pause();
        });
    }
    playAudio(){
        console.log("play function ici"+this.state.play)
        this.playingSong.pause();
        this.playingSong = new Audio(this.sarkilar[this.state.index].url)
        this.playingSong.play()
    }
    forward(){
        this.playingSong.pause();
        if(this.state.index == this.sarkilar.length-1){
            console.log("buna girdi")
            this.setState({
                index:this.state.index-10,
                play:true
            })
        }
        else{
            this.setState({
                index:++this.state.index,
                play:true
            }) 
        }
        
    }
    
    backward(){
        this.playingSong.pause();
        if(this.state.index == 0){
            this.setState({
                index:this.sarkilar.length-1,
                play:true
            })
        }
        else{
            this.setState({
                index:--this.state.index,
                play:true
            })
        }
    }
    
    render(){
        this.state.play ? this.songState="Pause" : this.songState = "Play";
        this.playAudio()
        return(
            <div className="parent-div">
                <h1 className="title">Music Player</h1>
                <div className="song-div">
                    <img className="song-img" src={this.sarkilar[this.state.index].imgUrl} alt="image" />
                    <p>{this.sarkilar[this.state.index].title}</p>
                    <p>{this.sarkilar[this.state.index].singer}</p>
                    <div className="buttons-div">
                        <button onClick={this.backward.bind(this)}>Prev</button>
                        <button onClick={this.togglePlay.bind(this)}>{this.songState}</button>
                        <button onClick={this.forward.bind(this)}>Next</button>
                    </div>
                </div>
            </div>
        )
    }
}