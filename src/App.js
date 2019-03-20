import React, { Component } from 'react';
import logo from './shopping-list.svg';
import './index.css';
import TaskList from './TaskList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className='App-intro'>
            My Task Manager
          </p>
          {/* Inserir uma imagem aqui */}
        </header>
        <TaskList/>
      </div>
    );
  }
}

export default App;