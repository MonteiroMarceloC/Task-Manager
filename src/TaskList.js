import React, { Component } from 'react';
import TaskItems from './TaskItems'
import AddField from './AddField'

const taskLabels =[
  {name: 'All',
  color: '#AAA'},
  {name: 'Home',
  color: '#00A86B'},
  {name: 'Study',
  color: '#FFD700'},
  {name: 'Work',
  color: '#FF4500'},
];

class TaskList extends Component {
  constructor(props){
    super(props);
    this.state={
      items: [],
      label: 'All'
    }

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this); 

  }

  componentDidUpdate(){
    console.log(this.state.label);
  }

  addItem(newItem){
    this.setState((prevState) => {
      return {
        items: prevState.items.concat(newItem),
      }
    });
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });
   
    this.setState({
      items: filteredItems
    });
  }
  
  render() {
    return (
      <div className="Task-list-cont">
        <div className='task-label-cont'>
        {taskLabels.map((e)=>(
          <button className='task-label'
          style={{backgroundColor: e.color}}
          onClick={() => this.setState({label: e.name})}
          >
          <span className='label-text'>{e.name}</span>
          </button>
        ))}
        </div>

        <TaskItems entries={this.state.items}
                    delete = {this.deleteItem}
                    label= {this.state.label}/>

        <AddField add={this.addItem}/>
      </div>
      
    );
  }
}

export default TaskList;