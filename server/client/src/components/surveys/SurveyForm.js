import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import validateEmail from '../../utils/validateEmail';
import { FIELDS } from './formFields';

export class SurveyForm extends Component {
  renderSubmit() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          type='text'
          key={name}
          name={name}
          label={label}
          component={SurveyField}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderSubmit()}

          <Link to='/surveys' className='red btn-flat white-text'>
            <i className='material-icons left'>cancel</i>
            CANCELAR
          </Link>

          <button type='submit' className='teal btn-flat right white-text'>
            CONTINUAR
            <i className='material-icons right'>arrow_forward</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = ({ title, from, subject, body, recipients }) => {
  const errors = {};

  if (!title) {
    errors.title = 'Debe proporcionar un titulo!';
  }
  if (!from) {
    errors.from = 'Debe proporcionar un email!';
  } else {
    errors.from = validateEmail(from);
  }
  if (!subject) {
    errors.subject = 'Debe proporcionar un asunto!';
  }
  if (!body) {
    errors.body = 'Debe proporcionar un cuerpo!';
  }
  if (!recipients) {
    errors.recipients = 'Debe proporcionar uno o mas destinatarios!';
  } else if (recipients[recipients.length - 1] === ',') {
    errors.recipients = "El ultimo caracter no puede ser '','' ";
  } else {
    errors.recipients = validateEmails(recipients);
  }

  return errors;
};

export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false, //No destruir inputs al unmount (true por default)
})(SurveyForm);
