import { matchPath, Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { AppRoute } from '../../../const';
import { authorizationStatus, isAuth } from '../../../utils';

const PageWrapper = (): JSX.Element => {
// const authorizationStatus = useAppSelector(selectAuthorizationStatus);
// const offers = useAppSelector(selectOffers);
// const favorites = useAppSelector(selectFavorites);
// const currentCityName = useAppSelector(selectCity);

  // const currentOffers = useMemo(() => filterOffersByCity(offers, currentCityName), [offers, currentCityName]);

  const {pathname} = useLocation();
  const isQuestPage = Boolean(matchPath(AppRoute.Quest, pathname));
  const isBookingPage = Boolean(matchPath(AppRoute.Booking, pathname));
  // const pageClassName = '';
  let mainClassName = 'page-content';
  let isLoginPage = false;
  // const hasFooter = false;
  // let shouldRenderUser = true;

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
