import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
axios.defaults.headers.common['Content-Type'] = 'application/json';
class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:9090/posts')
      .then(response => this.setState({ posts: response.data }));
  }

  updatePost(id, text) {
    axios.put(`http://localhost:9090/posts/${id}`, { text }).then(response => {
      const updatedPost = response.data;
      
      const updatedPosts = this.state.posts.map(post => {
        if (post.id === updatedPost.id) {
          return { post, ...updatedPost };
        } else {
          return post;
        }
      });

      this.setState({ posts: updatedPosts });
    });
  }

  deletePost(id) {
    axios.delete(`http://localhost:9090/posts/${id}`).then(response => {
      this.setState({
        posts: this.state.posts.filter(post => post.id !== id),
      });
    });
  }
  //https://practiceapi.devmountain.com/api/posts
  
  createPost(text) {
    const date = new Date().toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
 
    axios
      .post('http://localhost:9090/posts', { text, date })
      .then(results =>
        this.setState({ posts: [results.data, ...this.state.posts] })
      );
  }
  //https://practiceapi.devmountain.com/api/posts/filter?text=${text}
  findPost(text) { 
    if (text) {
      axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${text}`)
        .then(response => {
          this.setState({
            posts: response.data
          })
        })
    }
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header findPost={this.findPost.bind(this)}/>

        <section className="App__content">
          <Compose createPostFn={ this.createPost} />    

          {posts.map(post => (
            <Post
              key={post.id}
              text={post.text}
              date={post.date}
              id={post.id}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
