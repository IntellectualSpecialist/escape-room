import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFoundPage = (): JSX.Element => (
  <>
    <Helmet>
      <title>Страница не найдена - Escape Room</title>
    </Helmet>
    <h1>404 Not Found</h1>
    <Link to="/">Вернуться на главную</Link>
  </>
);

export default NotFoundPage;
