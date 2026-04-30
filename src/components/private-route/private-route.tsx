import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  isAvailable: boolean;
  route: AppRoute;
  children: JSX.Element;
}

const PrivateRoute = ({isAvailable, route, children}: PrivateRouteProps): JSX.Element => (
  isAvailable ? children : <Navigate to={route} />
);

export default PrivateRoute;
