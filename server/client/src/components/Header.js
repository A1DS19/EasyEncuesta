import M from 'materialize-css/dist/js/materialize';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StripePayment from './StripePayment';

export class Header extends Component {
  componentDidMount() {
    const sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Fragment>
            <li>
              <a className='red btn' href='/auth/google'>
                Login con Google
              </a>
            </li>
            <li>
              <Link to='/about' className='yellow darken-3 btn'>
                Sobre esta Aplicacion
              </Link>
            </li>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <li>
              <StripePayment />
            </li>
            <li style={{ margin: '0 10px' }}>
              <button className='btn yellow darken-3 white-text'>
                Creditos Disponibles:{' '}
                <span style={{ fontSize: '16px' }}>
                  {this.props.auth.credits}
                </span>
              </button>
            </li>
            <li>
              <button className='btn red'>
                <a href='/api/logout'>Cerrar Sesion</a>
              </button>
            </li>
            <li>
              <button className='btn yellow darken-3 white-text'>
                <Link to='/about'>Sobre esta Aplicacion</Link>
              </button>
            </li>
          </Fragment>
        );
    }
  }

  render() {
    const auth = this.props.auth;
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to={auth !== false ? '/surveys' : '/'} className=' brand-logo'>
            EasyEncuesta
          </Link>

          <a href='#' data-target='mobile-demo' className='sidenav-trigger'>
            <i className='material-icons'>menu</i>
          </a>

          <ul className='right hide-on-med-and-down'>{this.renderContent()}</ul>

          <ul className='sidenav center' id='mobile-demo'>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, null)(Header);
