import React from 'react';

const Highlight = ({ title, para ,id }) => {
    return (
        <div id={id} className="highlight">
        <h3 className="highlight__subtitle">{title}</h3>
        <p className="highlight__para">{para}</p>
   </div>
    );
}

export default Highlight;
