import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Checkbox extends React.Component {
  constructor(props){
    super(props);
    this.state={
      
    }
    this.handleChange = this.handleChange.bind(this);

  }
    
    static propTypes = {
      hasError: PropTypes.bool,
      id: PropTypes.string.isRequired,
      indeterminate: PropTypes.bool,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['default', 'switch']),
    };
    static defaultProps = {
      hasError: false,
      indeterminate: undefined,
      type: 'default',
    };
  
    componentDidMount() {
      // Apply the indeterminate attribute of the checkbox input
      this.selector.indeterminate = this.props.indeterminate;
    }
  
    componentDidUpdate(prevProps) {
      if (prevProps.indeterminate !== this.props.indeterminate) {
        this.selector.indeterminate = this.props.indeterminate;
      }
    }
    handleChange(e){
      this.props.handleChange(!this.props.isChecked);
    }

    render() {
      const { id, label, type, indeterminate, hasError, isChecked, handleChange,...inputProps } = this.props;
      const checkboxClassname = `
        m-checkbox
        ${type === 'switch' && 'm-checkbox--switch'}
        ${hasError && 'm-checkbox--has-error'}
      `;
      
      const inputClassname = `
        m-checkbox__input
        ${type === 'switch' && 'm-checkbox--switch__input'}
        ${hasError && 'm-checkbox--has-error__input'}
      `;
      
      const labelClassname = `
        m-checkbox__label
        ${type === 'switch' && 'm-checkbox--switch__label'}
      `;
  
      return (
        <div className={checkboxClassname}>
          <input
            type="checkbox"
            className={inputClassname}
            ref={el => (this.selector = el)}
            id={id}
            checked = {this.props.isChecked}
            onClick={this.handleChange}
            {...inputProps}
          />
        <label className={labelClassname} htmlFor={id}>{label}</label>
        </div>
      );
    }
  }

  export default Checkbox;