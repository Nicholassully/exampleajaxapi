import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      blogs: []
    };
  }

  componentDidMount(){
    fetch("http://localhost:3001/api/blogs")
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((response) => {
        console.log("there")
        this.setState({blogs: response.blogs})
      });
  }

  render() {
    const blogsHtml = this.state.blogs.map((b) => <li>{b.content}</li>);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ul>
          {blogsHtml}
        </ul>
      </div>
    );
  }
}

export default App;
