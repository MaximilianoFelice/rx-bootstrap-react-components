import React from 'react';
import Rx from 'rx';
import RxReact from 'rx-react';
import BaseComponent from "./base";

export class Tab extends BaseComponent {

  className(){
    return `tab-pane ${this.props.active && "active"} ${this.props.paneClassName}`
  }

  render(){
    return(
      <div className={this.className()}>
        {this.props.children}
      </div>
    )
  }
}

export class Tabs extends BaseComponent {
  constructor(props) {
    super(props);

    this.state.tabs = this.props.children;

    this.state.activeTab =
      this.state.tabs.find(c => c.props.active) ||
      this.state.tabs[0];
  }

  _renderNav() {
    if (!this.state.tabs) return;

    return (
      <ul className={`nav nav-tabs ${this.props.className}`}>
        {this.state.tabs.map((t, i) =>
          this._renderNavLink(t, i)
        )}
      </ul>
    )
  }

  _renderNavLink(tab, i) {
    return ( 
      <li
        key={`tabs-nav-link-${i}-${tab.props.name}`}
        className={`${this.state.activeTab === tab && "active"} ${tab.props.className}`}>
        <a
          onClick={_ => this.setState({activeTab: tab})}
          style={{cursor: "pointer"}}>
            {tab.props.name}
        </a>
      </li>
    )
  }

  render() {
    return (
      <div>
        {this._renderNav()}

        <div className={`tab-content ${this.props.paneClassName}`}>
          {this.state.tabs.map( tab => {
            return React.cloneElement(tab, {active: tab == this.state.activeTab, key: tab.props.name})
          })}
        </div>
      </div>
    );
  }
}