import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import SortSurveys from './SortSurveys';
import RenderSurveys from './RenderSurveys';

export class SurveyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: [...props.surveys],
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ surveys: [...props.surveys] });
  }

  componentDidMount() {
    this.props.fetchSurveys();
  }

  sortSurveys = (surveys) => {
    this.setState({ surveys: [...surveys] });
    console.log(surveys);
  };

  render() {
    {
      return this.state.surveys.length > 0 ? (
        <div>
          <SortSurveys
            surveys={this.state.surveys}
            sortSurveys={this.sortSurveys}
          />
          <RenderSurveys surveys={this.state.surveys} />
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h6>
            Maes solo apreten 'Login con google' tienen que tener una cuenta en
            google, apreten agregar creditos el numero de la tarjeta es{' '}
            <span style={{ color: 'red', fontSize: '15px' }}>
              4242 4242 4242 4242, 01/29{' '}
            </span>
            es la fecha y el codigo es
            <span style={{ color: 'red', fontSize: '15px' }}> 123 </span> y
            apreten pagar y luego apreten el{' '}
            <span style={{ color: 'red', fontSize: '30px' }}>+</span> de la
            parte de abajo y sigan los pasos.
          </h6>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
