import React, { Component } from 'react';
import Checkbox from './Checkbox'
import trash from './rubbish-bin.svg';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAnllNtCGAF9PAZaXrh85_LULbMQUKWXdQ",
  authDomain: "task-manager-eureca.firebaseapp.com",
  databaseURL: "https://task-manager-eureca.firebaseio.com",
  projectId: "task-manager-eureca",
  storageBucket: "task-manager-eureca.appspot.com",
  messagingSenderId: "882482790219"
};
firebase.initializeApp(config);

const db=firebase.database().ref('tasks');

class Task extends Component {
  constructor(props){
    super(props);
    this.state={
      itemChecked: props.isChecked
    }
    this.handleChange2 = this.handleChange2.bind(this);
    this.delete = this.delete.bind(this);

  }

  componentDidMount(){
    console.log("task mount: ",this.props.isChecked);
    //this.setState({itemChecked: this.props.isChecked});
  }

  componentDidUpdate(){
    console.log("task update: ", this.state.isChecked);
  }

  handleChange2(check){
    this.setState({itemChecked: check})
    this.props.changed(this.props.txt,check);
  }

  delete(){
    this.props.delete(this.props.txt);
  }
  
  render() {
    return (
        <li className='the-task'
          key={this.props.key}>
          <Checkbox id="unchecked" label={this.props.txt} isChecked={this.state.itemChecked} handleChange={this.handleChange2}/>
          <div className='lateral-task'>
            <div className="dot" style={{backgroundColor: this.props.labelColor}}> 
            </div>
            <button className="delete-btn"
                    onClick ={this.delete}>
            <img src={trash} className="delete-btn-img" alt="delete"/>
            </button>
          </div>
          
        </li>
        
      
    );
  }
}

export default Task;