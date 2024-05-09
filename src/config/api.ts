const BASE_URL = 'http://localhost:3000';

const getBaseUrl = () => `${BASE_URL}/api`;

const getAuthApiUrl = () => `${getBaseUrl()}/auth`;

enum Endpoints {
  login = 'login',
  logout = 'logout',
  register = 'register',
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
};
