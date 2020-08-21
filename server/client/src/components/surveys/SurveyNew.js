import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

//Varia la visibilidad entre SurveyForm y SurveyFormReview basado en state
//Cuando se sale del todo de surveyNew los datos del formulario de surveyForm tambien se quitan.Por eso el import de reduxForm

export class SurveyNew extends Component {
  state = { showFormReview: false };

  renderSurveyForm() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onBackClick={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderSurveyForm()}</div>;
  }
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
