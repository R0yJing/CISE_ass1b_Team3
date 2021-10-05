import React from 'react';
import ReactDom from 'react-dom';
import SubmissionForm from './components/SubmissionForm';
import App from './App';

import {render} from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import "@testing-library/jest-dom";

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});

it('renders without crashing', () =>{
  const div = document.createElement('div');
  ReactDom.render(<App/>, div);
  ReactDom.unmountComponentAtNode(div);
})

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<SubmissionForm />, div)
})

// test("Doi checker works", () => {
//   const wrapper = TestRenderer.create(<SubmissionForm />);
//   const inst = wrapper.getInstance();
//   expect(inst.checkDOI()).toEqual(false);
//  })

////Also doesn't work
// test("Doi checker works", () => {
//   const testRenderer = TestRenderer.create(<SubmissionForm />);
//   const testInstance = testRenderer.root;
  
//   expect(testInstance.findByType(SubmissionForm).checkDOI).toEqual(false);
//  })

//I want to cry this is the worst thing ever!!!
// test("Doi checker works", () => {
//   const wrapper = TestRenderer.create(<SubmissionForm />);
//   const inst = wrapper.root;
//   const subType = inst.findByType(<SubmissionForm />);
//   console.log(subType);
//   //expect(inst.checkDOI()).toEqual(false);
//  })