export enum RouterPaths {
  main = '/',
  auth = 'auth',
  faq = 'faq',
  entry = 'entry',
  createGroup = 'createGroup',
  enterGroup = 'enterGroup',
  group = 'group',
  chores = 'chores',
  expenses = 'expenses',
  shoppingLists = 'shoppingLists',
  groupSettings = 'settings',
  profileSettings = 'profileSettings',

  uiKit = 'uiKit',
}

export const routes: {
  [key in keyof typeof RouterPaths]: { mask: RouterPaths; full: string };
} = {
  main: { mask: RouterPaths.main, full: RouterPaths.main },
  auth: { mask: RouterPaths.auth, full: `/${RouterPaths.auth}` },
  faq: {
    mask: RouterPaths.faq,
    full: `/${RouterPaths.faq}`,
  },
  entry: {
    mask: RouterPaths.entry,
    full: `/${RouterPaths.entry}`,
  },
  createGroup: {
    mask: RouterPaths.createGroup,
    full: `/${RouterPaths.entry}/${RouterPaths.createGroup}`,
  },
  enterGroup: {
    mask: RouterPaths.enterGroup,
    full: `/${RouterPaths.entry}/${RouterPaths.enterGroup}`,
  },
  group: {
    mask: RouterPaths.group,
    full: `/${RouterPaths.group}`,
  },
  chores: {
    mask: RouterPaths.chores,
    full: `/${RouterPaths.group}/${RouterPaths.chores}`,
  },
  expenses: {
    mask: RouterPaths.expenses,
    full: `/${RouterPaths.group}/${RouterPaths.expenses}`,
  },
  shoppingLists: {
    mask: RouterPaths.shoppingLists,
    full: `/${RouterPaths.group}/${RouterPaths.shoppingLists}`,
  },
  groupSettings: {
    mask: RouterPaths.groupSettings,
    full: `/${RouterPaths.group}/${RouterPaths.groupSettings}`,
  },
  profileSettings: {
    mask: RouterPaths.profileSettings,
    full: `/${RouterPaths.profileSettings}`,
  },

  uiKit: {
    mask: RouterPaths.uiKit,
    full: `/${RouterPaths.group}/${RouterPaths.uiKit}`,
  },
};
