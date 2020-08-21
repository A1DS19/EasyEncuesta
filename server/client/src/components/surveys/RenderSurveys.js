import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteSurvey } from '../../actions';
import { withRouter } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';

export class RenderSurveys extends Component {
  deleteSurvey(surveyId, history) {
    this.props.deleteSurvey(surveyId, history);
  }

  render() {
    const surveys = this.props.surveys;

    return _.map(
      surveys,
      ({ yes, no, body, dateSent, lastResponded, title, _id }) => {
        let data = {
          labels: ['Si', 'No'],
          datasets: [
            {
              label: [body],
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: [yes, no],
            },
          ],
        };
        let lastResponse = `Ultima respuesta el: ${new Date(
          lastResponded
        ).toLocaleDateString()} a las: ${new Date(
          lastResponded
        ).toLocaleTimeString()}`;
        return (
          <div
            key={_id}
            className='card'
            style={{ outline: '1.5px solid #A9A9A9' }}
          >
            <div className='card-content'>
              <a
                href='#'
                className='right red-text'
                style={{ cursor: 'pointer' }}
                onClick={() => this.deleteSurvey(_id, this.props.history)}
              >
                {' '}
                <i className='small material-icons'>delete</i>{' '}
              </a>
              <span className='card-title'>{title}</span>
              <p>{body}</p>
              <p className='right'>
                Enviado el: {new Date(dateSent).toLocaleDateString()}
              </p>
              <br />
              <p className='right' style={{ fontSize: '11px' }}>
                {new Date(lastResponded).toLocaleTimeString() === 'Invalid Date'
                  ? 'No hay respuestas!'
                  : lastResponse}
              </p>
            </div>
            <Bar
              data={data}
              options={{
                responsive: true,
                legend: { display: true, position: 'right' },
              }}
            />
          </div>
        );
      }
    ).reverse();
  }
}

export default connect(null, { deleteSurvey })(withRouter(RenderSurveys));
