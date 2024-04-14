import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { EnterLayout } from 'components/layout/EnterLayout';
import { GroupLayout } from 'components/layout/GroupLayout';
import { RouterPaths } from 'config/routes';
import { Auth } from 'pages/Auth';
import { Chores } from 'pages/Chores';
import { CreateGroup } from 'pages/CreateGroup';
import { EnterGroup } from 'pages/EnterGroup';
import { Entry } from 'pages/Entry';
import { Expenses } from 'pages/Expenses';
import { Faq } from 'pages/Faq';
import { GroupSettings } from 'pages/GroupSettings';
import { Main } from 'pages/Main';
import { ProfileSettings } from 'pages/ProfileSettings';
import { ShoppingLists } from 'pages/ShoppingLists';
import { UIKit } from 'pages/UIKit';
import { useRootStore, useUserStore } from 'store/RootStore/hooks';

const Router: FC = () => {
  const { isDev } = useRootStore();
  const { isAuth, inGroup } = useUserStore();

  const authNoGroupRoutes = (
    <>
      <Route path={RouterPaths.entry} element={<Entry />} />
      <Route path={`${RouterPaths.entry}/${RouterPaths.createGroup}`} element={<CreateGroup />} />
      <Route path={`${RouterPaths.entry}/${RouterPaths.enterGroup}`} element={<EnterGroup />} />
    </>
  );

  const inGroupRoutes = (
    <>
      <Route path={RouterPaths.chores} element={<Chores />} />
      <Route path={RouterPaths.expenses} element={<Expenses />} />
      <Route path={RouterPaths.shoppingLists} element={<ShoppingLists />} />
      <Route path={RouterPaths.groupSettings} element={<GroupSettings />} />
      {isDev && <Route path={RouterPaths.uiKit} element={<UIKit />} />}
      <Route index element={<Navigate to={RouterPaths.chores} replace />} />
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route element={<EnterLayout />} errorElement={<div>EnterLayout error</div>}>
            {!isAuth && <Route path={RouterPaths.auth} element={<Auth />} />}
            {isAuth && !inGroup && authNoGroupRoutes}
            {isAuth && <Route path={RouterPaths.profileSettings} element={<ProfileSettings />} />}
            {isDev && <Route path={RouterPaths.faq} element={<Faq />} />}
          </Route>
          {isAuth && inGroup && (
            <Route path={RouterPaths.group} element={<GroupLayout />}>
              {inGroupRoutes}
            </Route>
          )}
        </Route>
        <Route
          path="*"
          element={
            <Navigate
              to={!isAuth ? RouterPaths.auth : !inGroup ? RouterPaths.entry : RouterPaths.group}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default observer(Router);
