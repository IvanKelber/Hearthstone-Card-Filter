var React = require('react');

var Button = React.createClass({
  getInitialState: function() {
    return {
      text: "Filter"
    }
  },
  componentWillMount: function() {
    this.setState({
      text: this.props.text
    })
  },
  update: function() {
    this.props.onValueUpdate();
  },
  render: function() {
    return(
      <button onClick={this.update}>{this.state.text}</button>
    );
  }
});


var DropDown = React.createClass({
  getInitialState: function() {
    return {
      selectValue: "N/A",
      values: []
    }
  },
  componentWillMount: function() {
    this.setState({
      values: this.props.values
    });
  },
  update: function(event) {
    this.setState({
      selectValue: event.target.value
    },function() {
      this.props.onValueUpdate(this.state.selectValue);
    });
  },
  render: function() {
    var options = [<option value={"N/A"}>{"N/A"}</option>];
    for (var option in this.state.values) {
      options.push(<option value={option}>{option}</option>);
    }
    return(
      <select defaultValue={this.state.selectValue} onChange={this.update}>
        {options}
      </select>
    );
  }
});

var RadioGroup = React.createClass({
  getInitialState: function() {
    return {
      selectValue: "All",
      values: []
    }
  },
  componentWillMount: function() {
    this.setState({
      values: this.props.values
    });
  },
  update: function(event) {
    this.setState({
      selectValue: event.target.value
    },function() {
      this.props.onValueUpdate(this.state.selectValue);
    });
  },
  render: function() {
    var options = [<span>All<input className="radio-button"
      onChange={this.update} type="radio" name={this.props.name} value="All" defaultValue="true"/></span>];
    for (var i = 0; i < this.state.values.length; i++) {
      option = this.state.values[i];
      options.push(<span>{option}<input className="radio-button"
        onChange={this.update} type="radio" name={this.props.name} value={option} key={option}/></span>);
    }

    return(
      <div className="radio_group">
        {options}
      </div>
    );
  }
})

module.exports = {
  DropDown: DropDown,
  Button: Button,
  RadioGroup: RadioGroup
}
