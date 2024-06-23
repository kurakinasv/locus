import { NumberString } from 'typings/api';

export const BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : '';

export const STATIC_URL = BASE_URL + '/static';

const getBaseUrl = () => `${BASE_URL}/api`;

const getAuthApiUrl = () => `${getBaseUrl()}/auth`;

const getUserApiUrl = () => `${getBaseUrl()}/user`;

const getGroupApiUrl = () => `${getBaseUrl()}/group`;

const getUserGroupApiUrl = () => `${getBaseUrl()}/user-group`;

const getChoreApiUrl = () => `${getBaseUrl()}/chore`;

const getScheduleApiUrl = () => `${getBaseUrl()}/schedule`;

const getExpenseApiUrl = () => `${getBaseUrl()}/expense`;

const getUserExpenseApiUrl = () => `${getBaseUrl()}/user-expense`;

const getShoppingListApiUrl = () => `${getBaseUrl()}/shopping-list`;

const getNotificationsApiUrl = () => `${getBaseUrl()}/notification`;

enum Endpoints {
  // auth
  login = 'login',
  logout = 'logout',
  register = 'register',

  // user
  getUser = 'getUser',
  getGroupUserExpenses = 'getGroupUserExpenses',
  editProfile = 'editProfile',
  deleteAccount = 'deleteAccount',

  // group
  getGroup = 'getGroup',
  createGroup = 'createGroup',
  editGroup = 'editGroup',
  deleteGroup = 'deleteGroup',
  generateInviteCode = 'generateInviteCode',

  getCurrentGroup = 'getCurrentGroup',
  getUserGroups = 'getUserGroups',
  getGroupMembers = 'getGroupMembers',
  joinGroup = 'joinGroup',
  exitGroup = 'exitGroup',
  switchGroup = 'switchGroup',

  // chore
  getChore = 'getChore',
  getChoresInGroup = 'getChoresInGroup',
  createChore = 'createChore',
  editChore = 'editChore',

  // chore categories
  getChoreCategories = 'getChoreCategories',
  createChoreCategory = 'createChoreCategory',

  // schedule
  getSchedule = 'getSchedule',
  getSchedules = 'getSchedules',
  getScheduledTasks = 'getScheduledTasks',
  createSchedule = 'createSchedule',
  editSchedule = 'editSchedule',
  editScheduledTask = 'editScheduledTask',
  deleteSchedule = 'deleteSchedule',
  deleteScheduleCascade = 'deleteScheduleCascade',

  // expense
  getExpense = 'getExpense',
  getGroupExpenses = 'getGroupExpenses',
  createExpense = 'createExpense',
  editExpense = 'editExpense',
  deleteExpense = 'deleteExpense',
  getUserExpenses = 'getUserExpenses',
  getUsersDebts = 'getUsersDebts',
  editUserDebt = 'editUserDebt',

  // expense categories
  getExpenseCategories = 'getExpenseCategories',
  createExpenseCategory = 'createExpenseCategory',

  // shopping list
  getShoppingLists = 'getShoppingLists',
  getShoppingList = 'getShoppingList',
  createShoppingList = 'createShoppingList',
  editShoppingList = 'editShoppingList',
  deleteShoppingList = 'deleteShoppingList',

  // shopping list items
  getProducts = 'getProducts',
  addProduct = 'addProduct',
  editProduct = 'editProduct',
  deleteProduct = 'deleteProduct',

  // notifications
  getNotifications = 'getNotifications',
  markAsRead = 'markAsRead',
}

enum HTTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type EndpointConfig = {
  url: string;
  method: HTTTPMethods;
  getUrl?: ((id: string) => string) | ((id: string, itemId: string) => string);
};

export const ENDPOINTS = {
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

  [Endpoints.getGroupUserExpenses]: {
    url: `${getUserExpenseApiUrl()}/group`,
    method: HTTTPMethods.GET,
  },
  [Endpoints.getUserGroups]: {
    url: `${getUserGroupApiUrl()}/user-groups`,
    method: HTTTPMethods.GET,
  },

  // groups
  [Endpoints.getGroup]: {
    url: `${getGroupApiUrl()}/group`,
    method: HTTTPMethods.GET,
    getUrl: (id: string) => `${getGroupApiUrl()}/group/${id}`,
  },
  [Endpoints.createGroup]: {
    url: `${getGroupApiUrl()}/group`,
    method: HTTTPMethods.POST,
  },
  [Endpoints.editGroup]: {
    url: `${getGroupApiUrl()}/group`,
    method: HTTTPMethods.PUT,
  },
  [Endpoints.deleteGroup]: {
    url: `${getGroupApiUrl()}/group`,
    method: HTTTPMethods.DELETE,
  },
  [Endpoints.generateInviteCode]: {
    url: `${getGroupApiUrl()}/invite`,
    method: HTTTPMethods.GET,
  },

  [Endpoints.getCurrentGroup]: {
    url: `${getUserGroupApiUrl()}/current`,
    method: HTTTPMethods.GET,
  },
  [Endpoints.getGroupMembers]: {
    url: `${getUserGroupApiUrl()}/group-members`,
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
  [Endpoints.switchGroup]: {
    url: `${getUserGroupApiUrl()}/switch`,
    method: HTTTPMethods.PUT,
  },

  // chores
  [Endpoints.getChore]: {
    url: `${getChoreApiUrl()}/chore`,
    method: HTTTPMethods.GET,
    getUrl: (choreId: NumberString) => `${getChoreApiUrl()}/chore/${choreId}`,
  },
  [Endpoints.getChoresInGroup]: {
    url: `${getChoreApiUrl()}/chores`,
    method: HTTTPMethods.GET,
    getUrl: (query: string) => `${getChoreApiUrl()}/chores${query}`,
  },
  [Endpoints.createChore]: {
    url: `${getChoreApiUrl()}/chore`,
    method: HTTTPMethods.POST,
  },
  [Endpoints.editChore]: {
    url: `${getChoreApiUrl()}/chore`,
    method: HTTTPMethods.PUT,
    getUrl: (choreId: NumberString) => `${getChoreApiUrl()}/chore/${choreId}`,
  },

  // chore categories
  [Endpoints.getChoreCategories]: {
    url: `${getChoreApiUrl()}/category`,
    method: HTTTPMethods.GET,
  },
  [Endpoints.createChoreCategory]: {
    url: `${getChoreApiUrl()}/category`,
    method: HTTTPMethods.POST,
  },

  // schedule
  [Endpoints.getSchedule]: {
    url: `${getScheduleApiUrl()}/schedule`,
    method: HTTTPMethods.GET,
    getUrl: (scheduleId: NumberString) => `${getScheduleApiUrl()}/schedule/${scheduleId}`,
  },
  [Endpoints.getSchedules]: {
    url: `${getScheduleApiUrl()}/schedules`,
    method: HTTTPMethods.GET,
    getUrl: (query: string) => `${getScheduleApiUrl()}/schedules${query}`,
  },
  [Endpoints.getScheduledTasks]: {
    url: `${getScheduleApiUrl()}/schedules`,
    method: HTTTPMethods.GET,
  },
  [Endpoints.createSchedule]: {
    url: `${getScheduleApiUrl()}/schedule`,
    method: HTTTPMethods.POST,
  },
  [Endpoints.editSchedule]: {
    url: `${getScheduleApiUrl()}/schedule`,
    method: HTTTPMethods.PUT,
    getUrl: (scheduleId: NumberString) => `${getScheduleApiUrl()}/schedule/${scheduleId}`,
  },
  [Endpoints.editScheduledTask]: {
    url: `${getScheduleApiUrl()}/task`,
    method: HTTTPMethods.PUT,
    getUrl: (scheduleId: NumberString) => `${getScheduleApiUrl()}/task/${scheduleId}`,
  },
  [Endpoints.deleteSchedule]: {
    url: `${getScheduleApiUrl()}/schedule`,
    method: HTTTPMethods.DELETE,
    getUrl: (scheduleId: NumberString) => `${getScheduleApiUrl()}/schedule/${scheduleId}`,
  },
  // TODO: use only on dev
  [Endpoints.deleteScheduleCascade]: {
    url: `${getScheduleApiUrl()}/schedule/cascade`,
    method: HTTTPMethods.DELETE,
    getUrl: (scheduleId: NumberString) => `${getScheduleApiUrl()}/cascade/${scheduleId}`,
  },

  // expenses
  [Endpoints.getExpense]: {
    url: `${getExpenseApiUrl()}/expense`,
    method: HTTTPMethods.GET,
    getUrl: (expenseId: NumberString) => `${getExpenseApiUrl()}/expense/${expenseId}`,
  },
  [Endpoints.getGroupExpenses]: {
    url: `${getExpenseApiUrl()}/expenses`,
    method: HTTTPMethods.GET,
    getUrl: (query: string) => `${getExpenseApiUrl()}/expenses${query}`,
  },
  [Endpoints.createExpense]: {
    url: `${getExpenseApiUrl()}/expense`,
    method: HTTTPMethods.POST,
  },
  [Endpoints.editExpense]: {
    url: `${getExpenseApiUrl()}/expense`,
    method: HTTTPMethods.PUT,
    getUrl: (expenseId: NumberString) => `${getExpenseApiUrl()}/expense/${expenseId}`,
  },
  [Endpoints.deleteExpense]: {
    url: `${getExpenseApiUrl()}/expense`,
    method: HTTTPMethods.DELETE,
    getUrl: (expenseId: NumberString) => `${getExpenseApiUrl()}/expense/${expenseId}`,
  },
  [Endpoints.getUserExpenses]: {
    url: `${getUserExpenseApiUrl()}/user-expenses`,
    method: HTTTPMethods.GET,
  },
  [Endpoints.getUsersDebts]: {
    url: `${getUserExpenseApiUrl()}/group`,
    method: HTTTPMethods.GET,
  },
  [Endpoints.editUserDebt]: {
    url: `${getUserExpenseApiUrl()}/debt`,
    method: HTTTPMethods.PUT,
    getUrl: (expenseId: NumberString) => `${getUserExpenseApiUrl()}/debt/${expenseId}`,
  },

  // expense categories
  [Endpoints.getExpenseCategories]: {
    url: `${getExpenseApiUrl()}/categories`,
    method: HTTTPMethods.GET,
  },
  [Endpoints.createExpenseCategory]: {
    url: `${getExpenseApiUrl()}/category`,
    method: HTTTPMethods.POST,
  },

  // shopping lists
  [Endpoints.getShoppingList]: {
    url: `${getShoppingListApiUrl()}/list`,
    method: HTTTPMethods.GET,
    getUrl: (listId: NumberString) => `${getShoppingListApiUrl()}/list/${listId}`,
  },
  [Endpoints.getShoppingLists]: {
    url: `${getShoppingListApiUrl()}/lists`,
    method: HTTTPMethods.GET,
    getUrl: (query: string) => `${getShoppingListApiUrl()}/lists${query}`,
  },
  [Endpoints.createShoppingList]: {
    url: `${getShoppingListApiUrl()}/list`,
    method: HTTTPMethods.POST,
  },
  [Endpoints.editShoppingList]: {
    url: `${getShoppingListApiUrl()}/list`,
    method: HTTTPMethods.PUT,
    getUrl: (listId: NumberString) => `${getShoppingListApiUrl()}/list/${listId}`,
  },
  [Endpoints.deleteShoppingList]: {
    url: `${getShoppingListApiUrl()}/list`,
    method: HTTTPMethods.DELETE,
    getUrl: (listId: NumberString) => `${getShoppingListApiUrl()}/list/${listId}`,
  },

  // shopping list items
  [Endpoints.getProducts]: {
    url: `${getShoppingListApiUrl()}`,
    method: HTTTPMethods.GET,
    getUrl: (listId: NumberString) => `${getShoppingListApiUrl()}/${listId}/items`,
  },
  [Endpoints.addProduct]: {
    url: `${getShoppingListApiUrl()}`,
    method: HTTTPMethods.POST,
    getUrl: (listId: NumberString) => `${getShoppingListApiUrl()}/${listId}/item`,
  },
  [Endpoints.editProduct]: {
    url: `${getShoppingListApiUrl()}`,
    method: HTTTPMethods.PUT,
    getUrl: (listId: NumberString, listItemId: NumberString) =>
      `${getShoppingListApiUrl()}/${listId}/item/${listItemId}`,
  },
  [Endpoints.deleteProduct]: {
    url: `${getShoppingListApiUrl()}`,
    method: HTTTPMethods.DELETE,
    getUrl: (listId: NumberString, listItemId: NumberString) =>
      `${getShoppingListApiUrl()}/${listId}/item/${listItemId}`,
  },

  // notifications
  [Endpoints.getNotifications]: {
    url: `${getNotificationsApiUrl()}/notifications`,
    method: HTTTPMethods.GET,
  },
  [Endpoints.markAsRead]: {
    url: `${getNotificationsApiUrl()}/notification`,
    method: HTTTPMethods.PUT,
    getUrl: (notificationId: NumberString) =>
      `${getNotificationsApiUrl()}/notification/${notificationId}`,
  },
} satisfies Record<Endpoints, EndpointConfig>;
