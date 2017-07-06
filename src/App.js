import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const Card = (props) => {
		return (
    <div style={{margin:'1em'}}>
      <img width="75" src={props.avatar_url}/>
      <div style={{display:'inline-block',marginLeft:10}}>
          <div style = {{fontSize:'1.25em',fontWeight:'bold'}}>
          {props.name}
          </div>
          <div>{props.company}</div>
    </div>
    </div>
    )
}

let data = [
	{avatar_url:"https://avatars3.githubusercontent.com/u/810438?v=3",
          name : "Dan Abramov",
          company : "Facebook"},
  {
  avatar_url :"https://avatars0.githubusercontent.com/u/931533?v=3",
          name :"Arun Bharadwaj",
          company :"Facebook"
  }
];

const CardList = (props) => {
	return (
  <div>
    {props.cards.map(card =><Card key = {card.id} {...card}/>)}
  </div>
  )
}

class Form extends Component {
	state = {userName :''}
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    	.then(resp => {
      	this.props.onSubmit(resp.data);
        this.setState({userName:''})
      })
  };
	render() {
  	return(
    	<form onSubmit={this.handleSubmit}>
      <input 
      type="text" 
      value = {this.state.userName}
      onChange = {(event) => this.setState({userName:event.target.value})}
      placeholder="GitHub Username" required/>
      <button type="Submit">Add Card</button>
      </form>
    )
  }
}

class App extends Component {
	state = {
  	cards : [
        // {avatar_url:"https://avatars3.githubusercontent.com/u/810438?v=3",
        //         name : "Dan Abramov",
        //         company : "Facebook"},
        // {
        // avatar_url :"https://avatars0.githubusercontent.com/u/931533?v=3",
        //         name :"Arun Bharadwaj",
        //         company :"Facebook"
        // }
		]
  };
  
  addNewCard = (cardInfo) => {
  	this.setState( prevState => ({
    	cards: prevState.cards.concat(cardInfo)
    }));
  }
	render () {
  	return (
    <div>
        <Form onSubmit = {this.addNewCard}/>
        <CardList cards = {this.state.cards}/>
    </div>
    )
  }
}
export default App;
