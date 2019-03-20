import React, { Component } from 'react';
import plus from './plus.svg'

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

class AddField extends Component {
    constructor(props){
      super(props);
      this.state={
        showinput: false,
        selectedLabel: 'All',
        selectBG: '#aaa',
      }      
    this.addItem = this.addItem.bind(this);
    this.handleSelect = this.handleSelect.bind(this);


    }

    componentDidUpdate(){

    }

    handleSelect(e){
        var who = Array.prototype.slice.call(e.target.childNodes).filter((o)=>(o.selected));
        this.setState({selectedLabel: who[0].value,
        selectBG: who[0].style.backgroundColor});

    }

    addItem(e){
        if(this.state.showinput){
          if(e.target.value!==""){
            var newItem = {
              txt: this._inputElement.value,
              labelText: this.state.selectedLabel,
              labelColor: this.state.selectBG,
            };
            this.setState({showinput: false});
            this._inputElement.value="";
            this.props.add(newItem);
          }
        } else{
          this.setState({showinput: true});
        }
      }

    render() {
        return (
        <div className="list-header">
          
            {this.state.showinput &&
            <>
              <input className='add-input' 
                    placeholder="New to do"
                    autoFocus
                    ref={(a)=> this._inputElement=a}>
              </input>
              <select style={{backgroundColor: this.state.selectBG}}
              onChange={this.handleSelect}>
              {taskLabels.map((e)=>(
                <option value={e.name}
                style={{backgroundColor: e.color}}
                >{e.name}</option>
                ))}
                </select>
            </>}
            
            <button className='add-btn' onClick={this.addItem}>
            <img src={plus} height='20px'></img>
            </button>
          
        </div>
        );
    }
}

export default AddField;