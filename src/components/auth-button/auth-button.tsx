import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

type AuthButtonProps = {
  isUserAuth: boolean;
}
type ReactEventHandler = React.MouseEventHandler<HTMLAnchorElement>

const AuthButton = ({isUserAuth}: AuthButtonProps) => {
  const dispatch = useAppDispatch();

  const handleButtonClick: ReactEventHandler = (evt) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (isUserAuth ?
    <a
      className="btn btn--accent header__side-item"
      href="#"
      onClick={handleButtonClick}
    >
      Выйти
    </a> :
    <Link
      className="btn header__side-item header__login-btn"
      to={AppRoute.Login}
    >
    Вход
    </Link>
  );
};

export default AuthButton;
