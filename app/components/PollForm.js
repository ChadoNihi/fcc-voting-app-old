export default ({onSubmit})=>
  <form>
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input className="mdl-textfield__input" type="text" id="poll-title-inp" required>
      <label className="mdl-textfield__label" for="poll-title-inp">Title</label>
    </div>
    <div className="mdl-textfield mdl-js-textfield">
      <textarea className="mdl-textfield__input" type="text" rows= "3" id="poll-opts-inp" required></textarea>
      <label className="mdl-textfield__label" for="poll-opts-inp">Option per line...</label>
    </div>
    <button className='' onSubmit={onSubmit}></button>
  </form>;
