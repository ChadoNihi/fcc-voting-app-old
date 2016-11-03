export default ( {title, options} )=> {
  return (
    <div>
      <h3>{title}</h3>
      <select>
        {options.map(opt=>{
          return <option></option>;
        })}
      </select>
    </div>
  );
}
