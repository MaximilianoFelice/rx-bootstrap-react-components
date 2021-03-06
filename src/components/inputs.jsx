import React from 'react';
import Rx from 'rx';
import RxReact from 'rx-react';
import {isDefined, propagable} from '../helpers';
import Label from './label';
import BaseComponent from "./base";

export class UserEditableField extends BaseComponent {
  constructor(props){
    super(props);

    this.labelObs =
      this.props.observeOn
        .map(state => state && state.labelProps)
        .filter(isDefined);

    this.inputObs =
      this.props.observeOn
        .map(state => state && state.inputProps)
        .filter(isDefined);

    this.errorsObs =
      this.props.observeOn
        .map(state => state.errors)
        .filter(isDefined)
        .map(errors => { return {errors} })
  }

  hasError() { return this.state.errors && this.state.errors.length; }

  renderField(){
    return(<div></div>)
  }

  renderHint(){
    if(!this.state.hint) return(null)
        
    return(<span className="hint">{this.state.hint}</span>)
  }

  render() {
    return (
      <div className={`form-group ${this.hasError() && "has-error"}`}>
        <Label observeOn={this.labelObs} {...this.state.labelProps}/>
        {this.renderField()}
        {this.renderHint()}
        <InputErrors observeOn={this.errorsObs} errors={this.state.errors}/>
      </div>
    )
  }
}

export class InputField extends UserEditableField {
  renderField(){
    return(<Input observeOn={this.inputObs} {...this.state.inputProps}/>)
  }
}

export class Input extends BaseComponent {
  render() {
    return <input
      className={this.state.className || "form-control"}
      {...propagable(this.props, this.state)}
    />;
  }
}

export class InputErrors extends BaseComponent {
  renderErrorMessage(str, i) {
    return (
      <li key={`error-message-${i}`}>{str}</li>
    );
  }

  render() {
    const errors =
      isDefined(this.state.errors) &&
      this.state.errors.map(this.renderErrorMessage);

    return <span className="help-block"><ul>{errors}</ul></span>;
  }
}
