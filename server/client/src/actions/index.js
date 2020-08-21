import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, DELETE_SURVEY, SAVE_DRAFT } from './types';

export const fetchUser = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: response.data });
  };
};

export const handleToken = (token) => {
  return async (dispatch) => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const submitSurvey = (formValues, history) => {
  return async (dispatch) => {
    const res = await axios.post('/api/surveys', formValues);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res });
  };
};

export const fetchSurveys = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
  };
};

export const deleteSurvey = (surveyId, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/surveys/delete/${surveyId}`);
    history.push('/surveys');
    dispatch({ type: DELETE_SURVEY, payload: surveyId });
  };
};
