import React from 'react';

function About() {
  return (
    <div>
      <h3>Desarrolado por: Jose Enrique Padilla</h3>
      <h4>
        <span style={{ color: '#ee6e73' }}>{new Date().getFullYear()}</span>
      </h4>
    </div>
  );
}

export default About;
