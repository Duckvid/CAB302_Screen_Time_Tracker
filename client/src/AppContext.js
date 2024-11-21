import React from 'react';
const AppContext = React.createContext({
  isLoggedIn: 'loading', // loading | true | false
  isProUser: false, //  true | false
  requestIsProUser: () => Promise.resolve(false),
});
export default AppContext;
