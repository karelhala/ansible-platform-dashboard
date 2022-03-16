import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';

React.useLayoutEffect = React.useEffect;

global.React = React;
