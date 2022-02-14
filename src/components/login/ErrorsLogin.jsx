import React from 'react';

import "./ErrorLogin.css"

const ErrorsLogin = ({errorMessage}) => {

  return ( 
    <p className="errorTextCreateAccount">{errorMessage}</p>
   );
}
 
export default ErrorsLogin;