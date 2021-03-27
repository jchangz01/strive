// user context for the App
// so that user data can be shared across all points in the App

// see:
// https://www.digitalocean.com/community/tutorials/react-react-native-navigation
// https://reactjs.org/docs/context.html
// https://medium.com/@danfyfe/using-react-context-with-functional-components-153cbd9ba214

import * as React from 'react';

export const UserContext = React.createContext(null);