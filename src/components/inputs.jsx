import React from 'react';
import Rx from 'rx';
import RxReact from 'rx-react';
import {isDefined, getData, propagable, propagableObsevable} from '../helpers';
import Label from './label';
import BaseComponent from "./base"

export class InputField extends BaseComponent {
  constructor(props){
    super(props);

    this.parentSubject = new Rx.Subject();
    this.childrenObservable = this.parentSubject.merge(this.props.observeOn);

    this.labelObs = this.childrenObservable.map(x => { return { data: x.data.labelProps }});
    this.inputObs = this.childrenObservable.map(x => { return { data: x.data.inputProps }});
    //this.inputErrorsObs =
      //this.childrenObservable.map(x => { return { data: x.data.inputErrors }});
  }

  componentDidMount(){
    this.parentSubject.onNext({data: {
      labelProps: this.props.labelProps,
      inputProps: this.props.inputProps,
      //inputErrors: this.props.inputErrors
    }})
  }

  render(){return (
    <div>
      <Label observeOn={this.labelObs} />
      <Input observeOn={this.inputObs} />
      <InputErrors observeOn={this.inputErrorsObs} />
    </div>
  )}
}

export class Input extends BaseComponent {
  render(){return (
    <input {...propagable(this.props, this.state)} />
  )}
}

export class InputErrors extends BaseComponent {
  renderErrorMessage(str) {
    return <span className="help-block">{str}</span>;
  }

  render() {
    return <div>
      {this.state.errorMessages.map(this.renderErrorMessage)}
    </div>;
  }
}
