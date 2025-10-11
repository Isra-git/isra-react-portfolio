import React from 'react';

export default function PortfolioDetail (props) {

const id= props.match.params.id;

return(
<div>
    <h2>Estas en la pagina de:  {id} </h2>
</div>
);

}