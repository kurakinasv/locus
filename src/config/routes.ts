export enum RouterPaths {
  auth = 'auth',
  buffer = 'buffer',
  faq = 'faq',
  main = '/main/:groupId',
  chores = 'chores',
  expenses = 'expenses',
  shoppingLists = 'shoppingLists',
  groupSettings = 'groupSettings',
  profileSettings = '/profileSettings',
}

export const routes = {
  auth: {
    mask: RouterPaths.auth,
  },
  main: {
    mask: RouterPaths.main,
    id: (id: number | string) => `/main/${String(id)}`,
  },
  chores: {
    mask: RouterPaths.chores,
    id: (id: number | string) => `/main/${String(id)}/chores`,
  },
  expenses: {
    mask: RouterPaths.expenses,
    id: (id: number | string) => `/main/${String(id)}/expenses`,
  },
  shoppingLists: {
    mask: RouterPaths.shoppingLists,
    id: (id: number | string) => `/main/${String(id)}/shoppingLists`,
  },
  groupSettings: {
    mask: RouterPaths.groupSettings,
    id: (id: number | string) => `/main/${String(id)}/groupSettings`,
  },
  profileSettings: {
    mask: RouterPaths.profileSettings,
  },
  buffer: {
    mask: RouterPaths.buffer,
  },
  faq: {
    mask: RouterPaths.faq,
  },
};
