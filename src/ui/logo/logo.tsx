import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

const Logo = (): JSX.Element => {
  const { pathname } = useLocation();

  return pathname as AppRoute === AppRoute.Root ? (
    <span className="logo header__logo">
      <svg width={134} height={52} aria-hidden="true">
        <use xlinkHref="#logo" />
      </svg>
    </span>) : (
    <Link
      className="logo header__logo"
      to={AppRoute.Root}
      aria-label="Перейти на Главную"
    >
      <svg width={134} height={52} aria-hidden="true">
        <use xlinkHref="#logo" />
      </svg>
    </Link>
  );
};

export default Logo;
