import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions';

export class StripePayment extends Component {
  render() {
    return (
      <StripeCheckout
        name='EasyEncuesta'
        description='Comprar 5 creditos por 5$.'
        amount={500} //Cantidad en centavos
        token={(token) => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className='btn'>AGREGAR CREDITOS</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, { handleToken })(StripePayment);
