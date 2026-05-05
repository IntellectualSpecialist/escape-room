import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  isAvailable: boolean;
  route: AppRoute;
  children: JSX.Element;
}

type LocationState = {
  from?: {
    pathname: string;
  };
};

const PrivateRoute = ({isAvailable, route, children}: PrivateRouteProps): JSX.Element => {
  const location = useLocation();

  const state = location.state as LocationState | null;
  const from = state?.from?.pathname ?? {pathname: route};

  return (
    isAvailable ? children : <Navigate state={{from: location}} to={from} />
  );
};

export default PrivateRoute;
