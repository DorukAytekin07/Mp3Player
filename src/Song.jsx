import React, { useEffect, useState } from "react";
import Songs from "./songs.json"
export default class Song extends React.Component{

    state = {
        play: false,
        index:0,
        duration:0
    }
    manager
    sarkilar = [];
    songState = "Pause"
    songs = Songs.songs.map(song => this.sarkilar.push(song));
    playingSong = new Audio(this.sarkilar[this.state.index].url);

    togglePlay = () => {
        this.setState({ play: !this.state.play ? true : false }, () => {
          this.state.play ? this.playingSong.play() : this.playingSong.pause();
        });
        if(this.playingSong.paused){
            this.startTimer(true);
        }
        else{
            this.startTimer(false)
        }
    }
    forward(){
        this.startTimer(false);
        this.playingSong.pause();
        this.startTimer(true);
        
        if(this.state.index == this.sarkilar.length-1){
            this.setState({
                index:0,
                play:true,
                duration:0
            })
            
            this.playingSong.pause()
            this.playingSong = new Audio(this.sarkilar[this.state.index-(this.sarkilar.length-1)].url)
            this.playingSong.play();
        }
        else{
            
            this.setState({
                index:++this.state.index,
                play:true,
                duration:0
            }) 
            this.startTimer(false);
            this.playingSong.pause()
            this.playingSong = new Audio(this.sarkilar[this.state.index].url)
            this.playingSong.play();
            this.startTimer(true);
        }
        
    }
    
    backward(){
        this.startTimer(false);
        this.playingSong.pause();
        this.startTimer(true);
        if(this.state.index == 0){
            this.setState({
                index:this.sarkilar.length-1,
                play:true,
                duration:0
            })
            this.playingSong.pause()
            this.playingSong = new Audio(this.sarkilar[this.state.index+(this.sarkilar.length-1)].url)
            this.playingSong.play();
        }
        else{
            this.startTimer(false);
            this.setState({
                index:--this.state.index,
                play:true,
                duration:0
            })
            this.startTimer(false);
            this.playingSong.pause()
            this.playingSong = new Audio(this.sarkilar[this.state.index].url)
            this.playingSong.play();
            this.startTimer(true);
        }
    }
    startTimer = (start) => {    
        if(start){
            this.manager = setInterval(() => {
                if (this.playingSong.ended) {
                  this.forward()
                }else{
                    this.setState({duration:parseInt(this.state.duration)+1})
                }
              }, [1000]);
            } else{
                clearInterval(this.manager)
            }
        }
        
    settimer(songtime){
        this.setState({
            duration:songtime
        })
        this.playingSong.currentTime = songtime
        
        
    }
    render(){
            this.state.play ? this.songState="Pause" : this.songState = "Play";
            return(
                <div className="parent-div" >
                    {/* <h1 className="title">Music Player</h1> */}
                    <div className="song-div">
                        <img className="song-img" src={this.sarkilar[this.state.index].imgUrl} alt="image" />
                        <p>{this.sarkilar[this.state.index].title}</p>
                        <p>{this.sarkilar[this.state.index].singer}</p>
                        <div>
                            <input className="time-slider" type="range" onChange={(e) => this.settimer(e.currentTarget.value)} value={this.state.duration} max={this.playingSong.duration ? this.playingSong.duration : 100}/>
                        </div>
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