import { matchPath, Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { AppRoute } from '../../../const';
import { authorizationStatus, isAuth } from '../../../utils';

const PageWrapper = (): JSX.Element => {
  const {pathname} = useLocation();
  const isQuestPage = Boolean(matchPath(AppRoute.Quest, pathname));
  const isBookingPage = Boolean(matchPath(AppRoute.Booking, pathname));
  let mainClassName = 'page-content';
  let isLoginPage = false;

  if (isQuestPage) {
    mainClassName = 'decorated-page quest-page';
  } else if (isBookingPage) {
    mainClassName = 'page-content decorated-page';
  } else {
    switch (pathname as AppRoute) {
      case AppRoute.Root:

        mainClassName = 'page-content';

        break;

      case AppRoute.Login:
        mainClassName = 'decorated-page login';
        isLoginPage = true;

        break;

      case AppRoute.MyQuests:
        mainClassName = 'page-content decorated-page';

        break;

      case AppRoute.Contacts:
        mainClassName = 'page-content decorated-page';

        break;
    }
  }

  return (
    <div className={'wrapper'}>
      <Header isLoginPage={isLoginPage} isUserAuth={isAuth(authorizationStatus)} />

      <main className={mainClassName}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
export default PageWrapper;
