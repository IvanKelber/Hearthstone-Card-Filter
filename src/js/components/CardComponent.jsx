var React = require('react');
var Button = require('./Structures.jsx').Button;
var DropDown = require('./Structures.jsx').DropDown;
var RadioGroup = require("./Structures.jsx").RadioGroup;

var Card = React.createClass({
  getInitialState: function() {
    return {
      image: "",
      gold: false,
      className: "default-div"
    }
  },
  switchToGold: function() {
    this.setState({
      image: this.state.gold ? this.props.card_json.img : this.props.card_json.imgGold,
      gold: !this.state.gold
    })
  },
  scaleUp: function() {
    this.setState({
      className: "mousedover-div"
    });
  },
  scaleDown: function() {
    this.setState({
      className: "default-div"
    });
  },
  componentWillMount: function() {

    this.setState({
      image: this.props.card_json.img
    });
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      image: nextProps.card_json.img
    })
  },
  render: function() {
    return (
      <div className={this.state.className} >
        <img className="card" src={this.state.image} onClick={this.switchToGold}
          onMouseOver={this.scaleUp} onMouseOut={this.scaleDown}/>
      </div>
    );
  }
});

var Row = React.createClass({
  getInitialState: function() {
    return {
      cards: [],
      width: 0
    }
  },
  componentWillMount: function() {
    this.setState({
      cards: this.props.cards,
      width: Object.keys(this.props.cards).length
    });
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      cards: nextProps.cards
    });
  },
  render: function() {
    var spots = [];
    var count = 0;
    for (card in this.state.cards) {
      spots.push(<Card card_json={this.state.cards[card]} key={count}/>);
      count++;
    }    return (
      <div className="centered-div">
        {spots}
      </div>
    );
  }
});


var App = React.createClass({
  getInitialState: function() {
    return {
      initialCards: [],
      cards: []
    }
  },
  componentWillMount: function() {
    this.setState({
      initialCards: this.props.cards,
      cards: this.props.cards
    })
  },
  onlyMinions: function(event) {
    var filtered_cards = this.state.initialCards;
    filtered_cards = filtered_cards.filter(function(item) {
      return item["type"].toLowerCase() == "minion";
    });
    this.setState({cards: filtered_cards});
  },
  onlySpells: function(event) {
    var filtered_cards = this.state.initialCards;
    filtered_cards = filtered_cards.filter(function(item) {
      return item["type"].toLowerCase() == "spell";
    });
    this.setState({cards: filtered_cards});
  },
  typeFilter: function(value) {
    console.log(value);
    var filtered_cards = this.state.initialCards;
    if(value!=="All"){
      filtered_cards = filtered_cards.filter(function(item) {
        return item["type"].toLowerCase()+"s" == value.toLowerCase();
      });
    }
    this.setState({cards: filtered_cards});
  },
  manaFilter: function(value) {
    var filtered_cards = this.state.initialCards;
    if(value!=="N/A"){
      filtered_cards = filtered_cards.filter(function(item) {
        return item["cost"] == value;
      });
    }
    this.setState({cards: filtered_cards});
  },
  render: function() {

    return(
      <div>
        <span className="filter-span">
        <div>
          <h3 className="radio-heading">Filter By Card Type</h3>
          <div className="filter-div">
            <RadioGroup onValueUpdate={this.typeFilter} values={["Minions","Spells","Weapons","Heros"]} name="type_group"/>
          </div>
        </div>

        <div>
          <h3 className="mana-heading">Filter By Mana Cost</h3>
          <div className="mana-div">
            <DropDown onValueUpdate={this.manaFilter} values={[0,1,2,3,4,5,6,7,8,9,10]}/>
          </div>
        </div>
        </span>
        <div className="centered-div">
          <Row cards={this.state.cards}/>
        </div>
      </div>

    );
  }
});

module.exports = {
Card: Card,
Row: Row,
App: App,
// FilterableGrid: FilterableGrid
}
