import { AuthorizationStatus } from '../const';

const authorizationStatus = AuthorizationStatus.Auth;
const isAuth = (authStatus: AuthorizationStatus): boolean => authStatus === AuthorizationStatus.Auth;

export {isAuth, authorizationStatus};
