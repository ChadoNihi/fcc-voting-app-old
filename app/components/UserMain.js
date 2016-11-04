import Polls from 'app/components/Polls';

export default ({displayName, polls})=>

export class UserMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isEditing: false};

    this.onSubmit = this.onSubmit.bind(this);
  }

  onNewPollClick() {
    this.setState({isEditing: true});
  }

  onSubmit(title, opts) {
    
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
