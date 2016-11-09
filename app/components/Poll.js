import React from 'react';
import {postVote} from '../actions';

export class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedOpt: undefined};

    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(ev) {
    this.setState({selectedOpt: ev.target.value});
  }

  onSubmit(ev) {
    ev.preventDefault();
    if (this.state.selectedOpt) {
      postVote(this.props.params.id, this.state.selectedOpt);
    }
  }

  render() {
    return (
      <div>
        <form >
          <h3>{this.props.title}</h3>
          <select value={this.state.selectedOpt || ""} onChange={this.handleChange} required>
            {Object.keys(optHist).map(opt=>{
              return <option value={this.props.opt}>{this.props.opt}</option>;
            })}
          </select>
          <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--accent' onSubmit={onSubmit} type='submit'>Vote</button>
        </form>
        <div>TODO chart</div>
      </div>
    );
  }
}
