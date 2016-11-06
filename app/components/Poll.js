export default ( {title, optHist} )=> {
  onSubmit(ev) {
    // this.props.params.
  }

  return (
    <div>
      <form>
        <h3>{title}</h3>
        <select required>
          {Object.keys(optHist).map(opt=>{
            return <option>{opt}</option>;
          })}
        </select>
        <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--accent' onSubmit={onSubmit} type='submit'>Vote</button>
      </form>
      <div>TODO chart</div>
    </div>
  );
}
