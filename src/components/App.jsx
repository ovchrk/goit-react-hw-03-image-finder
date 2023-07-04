import React, { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

class App extends Component {
  state = {
    value: "",
    page: 1,
  }


  onSearch = value => {
    this.setState({ value, page: 1 })
  } 

  render() {
    const { value } = this.state;
  
    return (<div>
      <Searchbar onSubmit={this.onSearch}></Searchbar>
      <ImageGallery query={value} page={this.state.page}>
       
      </ImageGallery>
      
    </div>)
  }
}

export { App };