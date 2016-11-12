import React from 'react';
import Polls from './Polls';
import {postPoll} from '../actions';

export default class UserMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isEditing: false};

    this.onSubmit = this.onSubmit.bind(this);
  }

  onNewPollClick() {
    this.setState({isEditing: true});
  }

  onSubmit(ev) {
    var title = ev.target.elements['poll-title-inp'].value.trim(),
        opts = ev.target.elements['poll-opts-inp'].value.split('\n').map(opt=> opt.trim());
    ev.preventDefault();

    if (opts.length>1 && opts.every(opt=>opt.length>0)) {
      postPoll({
        title,
        opts
      });
      this.setState({isEditing: false});
    }
  }

  render() {
    return (
      <div>
        <button id='new-poll-btn' className={"mdl-button mdl-js-button mdl-button--fab mdl-button--colored"+(this.state.isEditing ? " none" : "")} onClick={onNewPollClick}>
          <i className="material-icons">add</i>
        </button>
        <PollForm className={(this.state.isEditing ? "" : "none")} />
        <h2>Your polls:</h2>
        <Polls polls={polls} />
      </div>
    );
  }
}
