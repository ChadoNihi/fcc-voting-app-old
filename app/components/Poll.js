export default ( {title, options, optHist} )=> {
  return (
    <div>
      <h3>{title}</h3>
      <select required>
        {options.map(opt=>{
          return <option>{opt}</option>;
        })}
      </select>
    </div>
  );
}
