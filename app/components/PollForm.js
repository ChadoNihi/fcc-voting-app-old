export default ({onSubmit})=>
  <form>
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input className="mdl-textfield__input" type="text" id="poll-title-inp" pattern="\S{2,}" required>
      <label className="mdl-textfield__label" for="poll-title-inp">Title</label>
      <span className="mdl-textfield__error">Must be longer than 1 char.</span>
    </div>
    <div className="mdl-textfield mdl-js-textfield">
      <textarea className="mdl-textfield__input" type="text" rows= "3" id="poll-opts-inp" required></textarea>
      <label className="mdl-textfield__label" for="poll-opts-inp">Option per line... Min. 2 options!</label>
    </div>
    <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--accent' onSubmit={onSubmit} type='submit'>Create</button>
  </form>;
