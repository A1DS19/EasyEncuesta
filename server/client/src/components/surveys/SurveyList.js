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
      ) : null;
    }
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
