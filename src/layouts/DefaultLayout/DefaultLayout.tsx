import { Header } from '../../components/Header/Header.tsx';
import { Outlet } from 'react-router-dom';
import { LayoutContainer } from './DefaultLayout.styles.ts';
import { FC } from 'react';

export const DefaultLayout: FC = () => {
  return (
    <LayoutContainer>
      <Header />

      <Outlet />
    </LayoutContainer>
  );
};
