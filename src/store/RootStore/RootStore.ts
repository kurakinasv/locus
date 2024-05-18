import { makeAutoObservable } from 'mobx';

import AuthStore from 'store/AuthStore';
import ChoreCategoriesStore from 'store/ChoreCategoriesStore';
import ChoresStore from 'store/ChoresStore';
import ExpenseCategoriesStore from 'store/ExpenseCategoriesStore';
import ExpensesStore from 'store/ExpensesStore';
import GroupMemberStore from 'store/GroupMemberStore';
import GroupStore from 'store/GroupStore';
import SchedulesStore from 'store/SchedulesStore/SchedulesStore';
import ShoppingListStore from 'store/ShoppingListStore';
import UIStore from 'store/UIStore';
import UserStore from 'store/UserStore';

class RootStore {
  readonly uiStore: UIStore<unknown>;

  readonly authStore: AuthStore;
  readonly userStore: UserStore;
  readonly groupStore: GroupStore;
  readonly groupMemberStore: GroupMemberStore;
  readonly choresStore: ChoresStore;
  readonly choreCategoriesStore: ChoreCategoriesStore;
  readonly schedulesStore: SchedulesStore;
  readonly expensesStore: ExpensesStore;
  readonly expenseCategoriesStore: ExpenseCategoriesStore;
  readonly shoppingListStore: ShoppingListStore;

  readonly isDev: boolean;

  constructor() {
    makeAutoObservable(this);

    this.isDev = import.meta.env.DEV;

    this.uiStore = new UIStore();

    this.authStore = new AuthStore(this);
    this.userStore = new UserStore(this);
    this.groupStore = new GroupStore(this);
    this.groupMemberStore = new GroupMemberStore(this);
    this.choresStore = new ChoresStore(this);
    this.choreCategoriesStore = new ChoreCategoriesStore(this);
    this.schedulesStore = new SchedulesStore(this);
    this.expensesStore = new ExpensesStore(this);
    this.expenseCategoriesStore = new ExpenseCategoriesStore(this);
    this.shoppingListStore = new ShoppingListStore(this);
  }
}

export default RootStore;
