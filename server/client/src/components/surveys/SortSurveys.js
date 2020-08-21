import { Collapsible, CollapsibleItem, Icon } from 'react-materialize';
import React, { Component } from 'react';

//Por hacer:Botones mas array de objetos para el map y arreglar estilos de sorting

export class SortSurveys extends Component {
  sortSurveys(e) {
    const surveys = this.props.surveys;
    switch (e.target.value) {
      case 'TITULO_ASC': {
        surveys.sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          } else {
            return -1;
          }
        });
        return this.props.sortSurveys(surveys);
      }
      case 'TITULO_DESC': {
        surveys.sort((a, b) => {
          if (a.title < b.title) {
            return 1;
          } else {
            return -1;
          }
        });
        return this.props.sortSurveys(surveys);
      }
      case 'SI_ASC': {
        surveys.sort((a, b) => {
          if (a.yes < b.yes) {
            return 1;
          } else {
            return -1;
          }
        });
        return this.props.sortSurveys(surveys);
      }

      case 'SI_DESC': {
        surveys.sort((a, b) => {
          if (a.yes > b.yes) {
            return 1;
          } else {
            return -1;
          }
        });
        return this.props.sortSurveys(surveys);
      }

      case 'NO_ASC': {
        surveys.sort((a, b) => {
          if (a.no < b.no) {
            return 1;
          } else {
            return -1;
          }
        });
        return this.props.sortSurveys(surveys);
      }

      case 'NO_DESC': {
        surveys.sort((a, b) => {
          if (a.no > b.no) {
            return 1;
          } else {
            return -1;
          }
        });
        return this.props.sortSurveys(surveys);
      }

      case 'RECIENTE': {
        surveys.sort((a, b) => new Date(a.dateSent) - new Date(b.dateSent));
        return this.props.sortSurveys(surveys);
      }

      case 'ANTIGUO': {
        surveys.sort((a, b) => new Date(b.dateSent) - new Date(a.dateSent));
        return this.props.sortSurveys(surveys);
      }

      default:
        return this.props.surveys;
    }
  }

  render() {
    return (
      <Collapsible accordion>
        <CollapsibleItem
          expanded={false}
          header='Opciones de Sorting'
          node='ul'
          icon={<Icon>settings</Icon>}
        >
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={(e) => this.sortSurveys(e)}
              className='waves-effect waves-light btn-small'
              value='TITULO_ASC'
            >
              Titulo DESC
            </button>

            <button
              onClick={(e) => this.sortSurveys(e)}
              className='waves-effect waves-light btn-small'
              value='TITULO_DESC'
            >
              Titulo ASC
            </button>

            <button
              onClick={(e) => this.sortSurveys(e)}
              className='waves-effect waves-light btn-small'
              value='SI_ASC'
            >
              Si DESC
            </button>

            <button
              onClick={(e) => this.sortSurveys(e)}
              className='waves-effect waves-light btn-small'
              value='SI_DESC'
            >
              Si ASC
            </button>

            <button
              onClick={(e) => this.sortSurveys(e)}
              className='waves-effect waves-light btn-small'
              value='NO_ASC'
            >
              No DESC
            </button>

            <button
              onClick={(e) => this.sortSurveys(e)}
              className='waves-effect waves-light btn-small'
              value='NO_DESC'
            >
              No ASC
            </button>

            <button
              onClick={(e) => this.sortSurveys(e)}
              className='waves-effect waves-light btn-small'
              value='RECIENTE'
            >
              Mas Reciente
            </button>

            <button
              onClick={(e) => this.sortSurveys(e)}
              className='waves-effect waves-light btn-small'
              value='ANTIGUO'
            >
              Mas Antiguo
            </button>
          </div>
        </CollapsibleItem>
      </Collapsible>
    );
  }
}

export default SortSurveys;
