import { Link } from 'react-router-dom';

const NotFoundPage = (): JSX.Element => (
  <div className='container'>
    <h1>404 Not Found</h1>
    <Link to="/">Вернуться на главную</Link>
  </div>
);

export default NotFoundPage;
