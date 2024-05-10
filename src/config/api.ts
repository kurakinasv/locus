const BASE_URL = 'http://localhost:3000';

export const STATIC_URL = BASE_URL + '/static';

const getBaseUrl = () => `${BASE_URL}/api`;

const getAuthApiUrl = () => `${getBaseUrl()}/auth`;

const getUserApiUrl = () => `${getBaseUrl()}/user`;

const getUserGroupApiUrl = () => `${getBaseUrl()}/user-group`;

const getChoreApiUrl = () => `${getBaseUrl()}/chore`;

enum Endpoints {
  login = 'login',
  logout = 'logout',
  register = 'register',
  getUser = 'getUser',
  editProfile = 'editProfile',
  deleteAccount = 'deleteAccount',
  getCurrentGroup = 'getCurrentGroup',
  getUserGroups = 'getUserGroups',
  joinGroup = 'joinGroup',
  exitGroup = 'exitGroup',

  createChore = 'createChore',
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

  [Endpoints.getCurrentGroup]: {
    url: `${getUserGroupApiUrl()}/current`,
    method: HTTTPMethods.GET,
  },
  [Endpoints.getUserGroups]: {
    url: `${getUserGroupApiUrl()}/user-groups`,
    method: HTTTPMethods.GET,
  },
  [Endpoints.joinGroup]: {
    url: `${getUserGroupApiUrl()}/join`,
    method: HTTTPMethods.POST,
  },
  [Endpoints.exitGroup]: {
    url: `${getUserGroupApiUrl()}/leave`,
    method: HTTTPMethods.DELETE,
  },

  // chores
  [Endpoints.createChore]: {
    url: `${getChoreApiUrl()}/chore`,
    method: HTTTPMethods.POST,
  },
};
