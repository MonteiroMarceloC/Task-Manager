import React, { Component } from 'react';
import Task from './Task'
import FlipMove from 'react-flip-move'

class TaskItems extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log("entires mount: ",this.props.entries);

  }

  componentDidUpdate(){
    console.log("entires: ",this.props.entries);
  }
 
  render() {
    var filteredItems = this.props.entries.filter((e)=>(
      e.labelText==this.props.label || this.props.label =='All'
    ))
    
    var listItems = filteredItems.map((i)=>(
      <Task delete ={this.props.delete}
            changed={this.props.changed2}
              key={i.key} txt={i.txt}
              labelColor={i.labelColor}
              labelText={i.labelText}
              isChecked={i.isChecked}>
        </Task>
    ));
  
    return (
      <ul className="task-list">
      <FlipMove duration={200} easing="ease-out">
          {listItems}
          
      </FlipMove>
      </ul>
    );
  }
};

export default TaskItems;