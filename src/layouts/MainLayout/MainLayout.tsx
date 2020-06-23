import React, { FunctionComponent } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import Header from '../../components/Header/Header';
import './MainLayout.scss';

const MainLayout: FunctionComponent = ({ children }) => {  
  return (
    <main className='main'>
      <SideBar />
      <div className='containter'>
        <Header />
        <div className='content'>{children}</div>
      </div>
    </main>
  );
};

export default MainLayout;
