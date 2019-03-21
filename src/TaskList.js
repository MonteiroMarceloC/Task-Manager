import React, { Component } from 'react';
import TaskItems from './TaskItems'
import AddField from './AddField'
import * as firebase from 'firebase'
import ReactLoading from "react-loading";


const db=firebase.database().ref('tasks');

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
    this.state= {
      items: [],
      label: 'All',
      showalert: false
    }
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this); 
    this.updateItem = this.updateItem.bind(this); 
    this.showMyalert = this.showMyalert.bind(this);
  }


  //CHECKING CONNECTION WITH FIREBASE AND LOADING DATA
  componentDidMount(){
    var currcomp = this;
    //test conection
    let firebaseRef = firebase.database().ref();
    firebaseRef.child('.info/connected').on('value', function(connectedSnap) {
      if (connectedSnap.val() === true) {
        //get items
        let ref =  db.orderByChild('key');
        ref.on('value',function(snap) {
          if(snap.val()){
            var myarray = Object.values(snap.val());
            currcomp.setState({items: myarray, connected: true});
          }  
          else{ //in case there list is empty
            currcomp.setState({items: [], connected: true});
          }
        }); 
      } else {//connection failed: show alert
         console.log("fail");
          var intervalId = setInterval(currcomp.showMyalert, 3000);
          currcomp.setState({intervalId});
      }
    }); 
  }

  showMyalert(){
    this.setState({showalert: true});
    clearInterval(this.state.intervalId);
  }

  componentDidUpdate(){
    console.log("items: ",this.state.items);
  }


  // TASK MANEGER MAIN CONTROLS

  addItem(newItem){
  	if(newItem.txt!==''){
	    newItem['key']=this.state.items.length;
	    var newref=db.push();
	    newref.set(newItem);
	}
  }

  deleteItem(txtToDelete) {
    var ref =  db.orderByChild('txt');
    ref.once('value',function(snap) {
      if(snap.val()){
        var query = ref.equalTo(txtToDelete);
        query.once('child_added',function(snap){
          snap.ref.remove();
        })
      }
    });
  }

  updateItem(t,c){
    var ref =  db.orderByChild('txt');
    ref.once('value',function(snap) {
      if(snap.val()){
        var query = ref.equalTo(t);
        query.once('child_added',function(snap){
          snap.ref.child('isChecked').set(c);
        })
      }
    });
  }
  
  render() {
    return (
      <>
      {//THAT HERE IS THE LIST
      this.state.connected &&
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
                    label= {this.state.label}
                    changed2={this.updateItem}/>
        <AddField add={this.addItem}/>
      </div>
      }

      { //SHOW IN CASE OF ISSUES
        !this.state.connected &&
        <div className="load">
          <br/><br/>        
          <ReactLoading type='spin' color="#fff" />
          <br/><br/>
         { this.state.showalert && 
          <span className="alert">
            It looks like you are offline.<br/>Please go online so that the Task Manager can work perfectly. =)
          </span>
         }
        </div>
      }
      </>
    );
  }
}

export default TaskList;