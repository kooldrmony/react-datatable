import React from 'react';

//CSS was done inline to demonstrate another option for adding CSS
const title = {
    fontSize: "72px",
    color: 'blue',
    textAlign: 'center',
}

const Title = ({ pageTitle }) => {
  return (
    <div>
      <h2 style={title}>
        {pageTitle}
      </h2>
    </div>
  );
}

export default Title;