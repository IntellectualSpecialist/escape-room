import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import BookingPage from '../../pages/booking-page/booking-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import QuestPage from '../../pages/quest-page/quest-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import { isAuth } from '../../utils';
import PrivateRoute from '../private-route/private-route';
import PageWrapper from '../layout/page-wrapper/page-wrapper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { checkAuthAction, fetchQuestsAction } from '../../store/api-actions';
import { selectAuthorizationStatus } from '../../store/user/selectors';
import Loading from '../loading/loading';

const App = (): JSX.Element => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestsAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loading />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<PageWrapper />}>
            <Route index element={<MainPage />} />

            <Route path={AppRoute.Login} element={
              <PrivateRoute isAvailable={!isAuth(authorizationStatus)} route={AppRoute.Root}>
                <LoginPage />
              </PrivateRoute>
            }
            />

            <Route path={AppRoute.Contacts} element={<ContactsPage />} />

            <Route path={AppRoute.Booking} element={
              <PrivateRoute isAvailable={isAuth(authorizationStatus)} route={AppRoute.Login}>
                <BookingPage />
              </PrivateRoute>
            }
            />

            <Route path={AppRoute.Quest} element={<QuestPage />} />

            <Route path={AppRoute.MyQuests} element={
              <PrivateRoute isAvailable={isAuth(authorizationStatus)} route={AppRoute.Login}>
                <MyQuestsPage />
              </PrivateRoute>
            }
            />

            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
