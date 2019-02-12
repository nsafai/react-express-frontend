/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    // State holds values returned from server
    this.state = {
      about: null,
      message: null,
      max: 99,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // Use Fetch to call API. The /test route returns a simple string
    // This call in componentDidMount will only be called once
    fetch('/about').then(res => res.json()).then((json) => {
      console.log(json)
      const { about } = json // Get a value from JSON object
      this.setState({ about }) // Set a value on state with returned value
    }).catch((err) => {
      // Handle errors
      console.log(err.message)
    })

    // Let's call another API
    this.getNumber(this.state.max)
  }

  getNumber(max) {
    // Wrapping the API call in a function allow you to make calls to this
    // API as often as needed.

    // This calls a route and passes value in the query string.
    fetch(`/random/?n=${max}`).then(res => res.json()).then((json) => {
      console.log('>', json)
      this.setState({
        message: json.value,
      })
    }).catch((err) => {
      console.log(err.message)
    })
  }

  handleChange(event) {
    this.setState({max: event.target.value});
  }

  renderMessage() {
    // Used to conditionally render data from server.
    // Returns null if message is null otherwise returns
    // a populated JSX element.
    const { message } = this.state
    if (message === null) {
      return undefined
    }

    return <h1>{message}</h1>
  }

  render() {
    const { about } = this.state

    return (
      <div className="App">
        <p>
          <strong>About: </strong>
          {about}
        </p>
        <div>{this.renderMessage()}</div>
        <div>
          <label>
            Max:
            <input type="text" value={this.state.max} onChange={this.handleChange} />
          </label>
          <button
            type="button"
            onClick={() => {
              this.getNumber(this.state.max)
            }}
          >
          Random
          </button>
        </div>
      </div>
    );
  }
}

export default App;
