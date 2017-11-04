import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      blogs: [],
      inputBlog: "",
      editableBlog: { content: "" }
    };
  }

  componentDidMount(){
    this.listBlogs();
  }

  listBlogs = () => {
    fetch("http://localhost:3001/api/blogs")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({blogs: response.blogs})
      });
  }

  deleteBlog = (id) => {
    fetch("http://localhost:3001/api/blogs/" + id, { method: "DELETE" })
      .then((response) => {
        this.listBlogs();
      });
  }

  handleChangeOfNewBlog = (event) => {
    this.setState({inputBlog: event.target.value});
  }

  createBlog = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({ content: this.state.inputBlog });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: body
    }

    fetch("http://localhost:3001/api/blogs/", requestOptions)
      .then((response) => {
        this.listBlogs();
      });
  }

  populateEditBox = (id, content) => {
    this.setState({editableBlog: { id: id, content: content}});
  }

  handleChangeOfEditableBlog = (event) => {
    const content = event.target.value;
    this.setState((prevState) => {
      return {
        editableBlog: {
          id: prevState.editableBlog.id,
          content: content
        }
      };
    });
  }

  updateBlog = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({ content: this.state.editableBlog.content });

    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: body
    }

    const url = "http://localhost:3001/api/blogs/" + this.state.editableBlog.id;
    fetch(url, requestOptions)
      .then((response) => {
        this.listBlogs();
      });
  }

  render() {
    const blogsHtml = this.state.blogs.map((b) =>
      <li>{b.content}
        <button onClick={this.deleteBlog.bind(this, b._id)}>Delete</button>
        <button onClick={this.populateEditBox.bind(this, b._id, b.content)}>Edit</button>
      </li>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <input value={this.state.inputBlog} onChange={this.handleChangeOfNewBlog} placeholder='new blog'/>
        <button onClick={this.createBlog}>Create blog</button>
        <ul>
          {blogsHtml}
        </ul>

        <input value={this.state.editableBlog.content} onChange={this.handleChangeOfEditableBlog} />
        <button onClick={this.updateBlog}>Save</button>
      </div>
    );
  }
}

export default App;
