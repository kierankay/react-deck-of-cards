import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import './CardTable.css'

class CardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckId: '',
      faceUpCards: [],
      cardsAvailable: true,
      timerId: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    let result = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    let timerId = setInterval(this.handleClick, 2000)
    this.setState({ deckId: result.data.deck_id, timerId });
  }

  async handleClick() {
    let result = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`);
    let cardsAvailable = result.data.remaining > 0 ? true : false;
    console.log(result.data)
    // handle case to clear interval after no cards remain.
    if (cardsAvailable) {
      this.setState({
        faceUpCards: [...this.state.faceUpCards, result.data.cards[0]],
        cardsAvailable
      });
    } else {
      clearInterval(this.state.timerId);
      this.setState({
        cardsAvailable,
        timerId: ''
      });
    }
  }

  render() {
    return (
      <div className="card-container">
        {this.state.cardsAvailable ? <button onClick={this.handleClick}>GIMME A CARD</button> : null}
        <div className="card-table">
          {this.state.faceUpCards.map(card => {
            return <Card card={card} key={card.code} />
          })}
        </div>
      </div>
    );
  }
}

export default CardTable;