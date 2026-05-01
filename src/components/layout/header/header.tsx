import Logo from '../../../ui/logo/logo';
import Nav from '../nav/nav';
import AuthButton from '../../auth-button/auth-button';

type HeaderProps = {
  isUserAuth: boolean;
  isLoginPage: boolean;
}

const Header = ({isUserAuth, isLoginPage}: HeaderProps): JSX.Element => (
  <header className="header">
    <div className="container container--size-l">
      <Logo />

      <Nav isUserAuth={isUserAuth} />

      <div className="header__side-nav">
        {!isLoginPage && <AuthButton isUserAuth={isUserAuth} />}

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

export default Header;
