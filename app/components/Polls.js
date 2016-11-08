import { Link } from 'react-router';

export default ({polls})=>
  <ul className='mdl-list'>
    {polls.map((poll, i)=>{
      return (
        <li className='mdl-list__item'>
          <span className='mdl-list__item-primary-content'>
            <Link to={'/poll/'+poll.id} key={i}>{poll.title}</Link>
          </span>
        </li>
      );
    })}
  </ul>;
