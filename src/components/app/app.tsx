import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import BookingPage from '../../pages/booking-page/booking-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import QuestPage from '../../pages/quest-page/quest-page';
import { AppRoute } from '../../const';
import { authorizationStatus, isAuth } from '../../utils';
import PrivateRoute from '../private-route/private-route';
import PageWrapper from '../layout/page-wrapper/page-wrapper';

const App = (): JSX.Element => (
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

          <Route path={AppRoute.Booking} element={<BookingPage />} />

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
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
