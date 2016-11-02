import { Link } from 'react-router';

export default ({polls})=>
  <div>
    {polls.map(poll, i)=>{
      return <Link to={'/poll/'+poll.id} key={i} >{poll.title}</Link>;
    }}
  </div>;
