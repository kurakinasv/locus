import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { RouterPaths, routes } from 'config/routes';
import { Auth, Chores, Expenses, GroupSettings, Main, ProfileSettings, ShoppingLists } from 'pages';
import { useAuthContext } from 'store';

const Router: FC = () => {
  const { isAuth } = useAuthContext();
  const inGroup = true;
  const groupId = 123;

  return (
    <BrowserRouter>
      {isAuth ? (
        <Routes>
          <Route path={RouterPaths.buffer} element={<div>buffer 2</div>} />
          <Route element={<ProfileSettings />} path={RouterPaths.profileSettings} />
          <Route element={<div>faq</div>} path={RouterPaths.faq} />
          {inGroup && (
            <Route path={RouterPaths.main} element={<Main />}>
              <Route element={<Chores />} path={RouterPaths.chores} />
              <Route element={<Expenses />} path={RouterPaths.expenses} />
              <Route element={<ShoppingLists />} path={RouterPaths.shoppingLists} />
              <Route element={<GroupSettings />} path={RouterPaths.groupSettings} />
              <Route index element={<Navigate to={RouterPaths.chores} replace />} />
            </Route>
          )}
          <Route
            path="*"
            element={
              <Navigate to={inGroup ? routes.main.id(groupId) : RouterPaths.buffer} replace />
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route element={<Auth />} path={RouterPaths.auth} />
          <Route element={<div>faq</div>} path={RouterPaths.faq} />
          <Route path="*" element={<Navigate to={RouterPaths.auth} replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Router;
