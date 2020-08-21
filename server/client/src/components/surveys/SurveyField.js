import React from 'react';

//Componente reutilizable para inputs
//{input} viene de los props de Field automaticamente
//{...input} asigna todos los valores del objeto a <input />

function SurveyField({ input, label, meta }) {
  const { error, touched } = meta;

  return (
    <div>
      <div
        style={{ marginBottom: '20px', fontSize: '15px' }}
        className='red-text'
      >
        {touched === true ? error : null}
      </div>
      <br />
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
    </div>
  );
}

export default SurveyField;
