import { Header } from '../pages/Header.tsx';
import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
}
