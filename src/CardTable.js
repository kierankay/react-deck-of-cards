import React, { Component } from "react";
import Card from "./Card";
import axios from "axios"

class CardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckId: '',
      faceUpCards: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount(){
    let result = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    this.setState({deckId: result.data.deck_id});
  }

  async handleClick(){
    let result = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`);
    this.setState({
      faceUpCards: [...this.state.faceUpCards, result.data.cards[0]]
    })
  }

  render(){
    return (
      <div style={{width: "100vw"}}>
        <button onClick={this.handleClick}>GIMME A CARD</button>
        {this.state.faceUpCards.map(card => {
          return <Card card={card} key={card.code}/>
        })}
      </div>
    )
  }
}

export default CardTable;