const BASE_URL = 'http://localhost:3000';

const getBaseUrl = () => `${BASE_URL}/api`;

const getAuthApiUrl = () => `${getBaseUrl()}/auth`;

const getUserApiUrl = () => `${getBaseUrl()}/user`;

enum Endpoints {
  login = 'login',
  logout = 'logout',
  register = 'register',
  getUser = 'getUser',
  editProfile = 'editProfile',
  deleteAccount = 'deleteAccount',
}

enum HTTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const ENDPOINTS: Record<Endpoints, { url: string; method: HTTTPMethods }> = {
  // auth
  [Endpoints.login]: {
    url: `${getAuthApiUrl()}/login`,
    method: HTTTPMethods.POST,
  },
  [Endpoints.logout]: {
    url: `${getAuthApiUrl()}/logout`,
    method: HTTTPMethods.POST,
  },
  [Endpoints.register]: {
    url: `${getAuthApiUrl()}/register`,
    method: HTTTPMethods.POST,
  },

  // user
  [Endpoints.getUser]: {
    url: `${getUserApiUrl()}/user`,
    method: HTTTPMethods.GET,
  },
  [Endpoints.editProfile]: {
    url: `${getUserApiUrl()}/user`,
    method: HTTTPMethods.PUT,
  },
  [Endpoints.deleteAccount]: {
    url: `${getAuthApiUrl()}/user`,
    method: HTTTPMethods.DELETE,
  },
};
