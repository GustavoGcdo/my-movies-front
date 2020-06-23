import Icon from '@material-ui/core/Icon';
import React, { FunctionComponent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './SideBar.scss';
import { homeRoute, profilesRoute, watchlistRoute } from '../../constants/routes.constants';

const SideBar: FunctionComponent<RouteComponentProps> = (props) => {
  function getClassMenuItem(route: string) {
    const isActiveRoute = isActive(route);
    if (isActiveRoute) {
      return `menu-item active`;
    }
    return `menu-item`;
  }

  function isActive(route: string) {
    const activeRoute = props.location.pathname;
    return activeRoute === route;
  }

  return (
    <aside className='sidebar-container'>
      <div className='side-header'>
        <div className='logo'></div>
      </div>
      <div className='menu'>
        <div className='title-separator'>
          <span>Menu</span>
        </div>
        <Link className={getClassMenuItem(homeRoute)} to={homeRoute}>
          <Icon>home</Icon>
          <span className='name-title'>Home</span>
        </Link>
        <Link className={getClassMenuItem(profilesRoute)} to={profilesRoute}>
          <Icon>group</Icon>
          <span className='name-title'>Perfis</span>
        </Link>
        <Link className={getClassMenuItem(watchlistRoute)} to={watchlistRoute}>
          <Icon>live_tv</Icon>
          <span className='name-title'>Meus Filmes</span>
        </Link>
      </div>
    </aside>
  );
};

export default withRouter(SideBar);
