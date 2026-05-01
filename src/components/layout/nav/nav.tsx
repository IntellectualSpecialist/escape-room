import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const';

type NavProps = {
  isUserAuth: boolean;
}

const NavLinks = [
  {
    to: AppRoute.Root,
    text: 'Квесты'
  },
  {
    to: AppRoute.Contacts,
    text: 'Контакты'
  },
  {
    to: AppRoute.MyQuests,
    text: 'Мои бронирования'
  }
];

const Nav = ({isUserAuth}: NavProps): JSX.Element => {
  const clearNavLinks = isUserAuth ? NavLinks : NavLinks.filter(({to}) => to !== AppRoute.MyQuests);

  return (
    <nav className="main-nav header__main-nav">
      <ul className="main-nav__list">
        {!!NavLinks?.length &&
          clearNavLinks.map(({to, text}) => {
            const defaultClass = to === AppRoute.Root ? 'link not-disabled' : 'link';
            const activeClass = 'active';

            return (
              <li key={text} className="main-nav__item">
                <NavLink
                  to={to}
                  className={({isActive}) =>
                    isActive ? `${defaultClass} ${activeClass}` : defaultClass}
                >
                  {text}
                </NavLink>
              </li>);
          })}
      </ul>
    </nav>
  );
};

export default Nav;
