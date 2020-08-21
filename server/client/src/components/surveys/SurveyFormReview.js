import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { submitSurvey } from '../../actions';
import { withRouter } from 'react-router-dom';

import { FIELDS } from './formFields';

function SurveyFormReview({ onBackClick, formValues, submitSurvey, history }) {
  //FormValues viene de mapStateToProps como prop por lo cual se puede destructurar
  //Iterar sobre FIELDS y desplegar valor con {formvalues[name]}
  //Cuando el survey se alla mandado en el action creator para redireccionar al user si usa withRouter para tener acceso al history object y se pasa al action creator y se llama history.push('/route')

  const formList = _.map(FIELDS, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Favor Confirmar Datos</h5>
      {formList}

      <div style={{ marginTop: '20px' }}>
        <button
          className='yellow white-text darken-3 btn-flat left'
          onClick={onBackClick}
        >
          <i className='material-icons left'>arrow_back</i>
          Atras
        </button>

        <button
          onClick={() => submitSurvey(formValues, history)}
          className='btn-flat green white-text right'
        >
          <i className='material-icons right'>email</i>
          Enviar Encuesta
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, { submitSurvey })(
  withRouter(SurveyFormReview)
);
