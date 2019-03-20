import React, { Component } from 'react';
import Checkbox from './Checkbox'
import trash from './rubbish-bin.svg';


class Task extends Component {
  constructor(props){
    super(props);
    this.state={
      itemChecked: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);

  }

  componentDidMount(){

  }

  componentDidUpdate(){
  }

  handleChange(event){
    this.setState({itemChecked: !this.state.itemChecked});
  }

  delete(key){
    this.props.delete(key);
  }
  
  render() {
    return (
        <li className='the-task'
          key={this.props.key}>
          <Checkbox id="unchecked" label={this.props.txt} />
          <div className='lateral-task'>
            <div class="dot" style={{backgroundColor: this.props.labelColor}}> 
            </div>
            <button className="delete-btn"
                    onClick ={()=>this.delete(this.props.key)}>
            <img src={trash} className="delete-btn-img" alt="delete"/>
            </button>
          </div>
          
        </li>
        
      
    );
  }
}

export default Task;