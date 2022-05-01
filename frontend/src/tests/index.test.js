import React from 'react';

describe('test', () => {
  test('equal', () => {
    expect(<div />).toEqual(<div />);
  });
});
const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => {
    return mockUseNavigate;
  },
}));
