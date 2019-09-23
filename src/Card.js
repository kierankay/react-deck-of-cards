import React, { Component } from "react";
import './Card.css'

class Card extends Component {
  render() {
    return (
      <div className="card">
        <img src={this.props.card.image} alt={this.props.card.code} />
      </div>
    );
  }
}

export default Card;