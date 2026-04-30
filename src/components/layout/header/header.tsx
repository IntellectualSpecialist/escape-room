import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../../const';

type HeaderProps = {
  isUserAuth: boolean;
  isLoginPage: boolean;
}

const Header = ({isUserAuth, isLoginPage}: HeaderProps): JSX.Element => {
  const {pathname} = useLocation();

  return (
    <header className="header">
      <div className="container container--size-l">
        <a
          className="logo header__logo"
          href="index.html"
          aria-label="Перейти на Главную"
        >
          <svg width="{134}" height="{52}" aria-hidden="true">
            <use xlinkHref="#logo" />
          </svg>
        </a>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className={`link not-disabled ${pathname === AppRoute.Root ? 'active' : ''}`} to={AppRoute.Root}>
                Квесты
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className={`link ${pathname === AppRoute.Contacts ? 'active' : ''}`} to={AppRoute.Contacts}>
                Контакты
              </Link>
            </li>
            {isUserAuth &&
            <li className="main-nav__item">
              <Link className={`link ${pathname === AppRoute.MyQuests ? 'active' : ''}`} to={AppRoute.MyQuests}>
                Мои бронирования
              </Link>
            </li>}
          </ul>
        </nav>
        <div className="header__side-nav">
          {!isLoginPage && (isUserAuth ?
            <a className="btn btn--accent header__side-item" href="#">
            Выйти
            </a> :
            <a
              className="btn header__side-item header__login-btn"
              href="login.html"
            >
          Вход
            </a>)}

          <a
            className="link header__side-item header__phone-link"
            href="tel:88003335599"
          >
        8 (000) 111-11-11
          </a>
        </div>
      </div>
    </header>

  );
};

export default Header;
