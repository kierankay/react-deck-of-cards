import React, { Component } from "react";

class Card extends Component {
  render(){
    return (
      <div style={{position: "fixed", margin: "0 auto"}}>
        <img src={this.props.card.image} alt={this.props.card.code}/>
      </div>
    )
  }
}

export default Card;