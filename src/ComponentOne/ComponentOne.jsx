import React from 'react';
import './ComponentOne.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }
  getContractBinary = () => {
    fetch('/api/health')
      .then(response => response.json())
      .then(json => this.setState({ message: json.message }, () => {
      }))
  }

  componentDidMount() {
    this.getContractBinary();
  }

  render() {
    return (
      <div className='card'>
        <p className='message'>{this.state.message}</p>
      </div>
    )
  }

}