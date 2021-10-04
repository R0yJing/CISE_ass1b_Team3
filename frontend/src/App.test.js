// import { render, screen } from '@testing-library/react';
// import App from './App';
import react from 'react';

import {wrapper} from 'enzyme';
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// it('renders without crashing', () =>{
//   const div = document.createElement('div');
//   ReactDOM.render(<App/>, div);
//   ReactDOM.unmountComponentAtNode(div);
  
// })



const SubmissionForm = require('./components/SubmissionForm');

test('Indetifies if a DOI string is the correct format', () => {
  expect(3).toBe(3);
  

  expect(wrapper(<SubmissionForm/>).instance().checkDOI()).toBe(true);
});