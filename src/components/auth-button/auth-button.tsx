import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type AuthButtonProps = {
  isUserAuth: boolean;
}

const AuthButton = ({isUserAuth}: AuthButtonProps) => (isUserAuth ?
  <a className="btn btn--accent header__side-item" href="#">
    Выйти
  </a> :
  <Link
    className="btn header__side-item header__login-btn"
    to={AppRoute.Login}
  >
    Вход
  </Link>
);

export default AuthButton;
