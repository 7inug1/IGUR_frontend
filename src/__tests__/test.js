/* eslint-disable testing-library/no-debugging-utils */
import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from "react-router-dom";
import { faker } from '@faker-js/faker';
import InstagramUserInput from '../components/InstagramUserInput';

test('submitting the form calls onSubmit with the right Instagram user input', async () => {
  render(
    <Router>
      <InstagramUserInput onSubmit={handleSubmit} />
    </Router>
  );
  
  const testUsername = faker.internet.userName();
  const handleSubmit = jest.fn();
  const instagramUsernameInput = screen.getByLabelText(/username/i);
  const submitButton = screen.getByRole('button', { type: "submit" });
  
  await userEvent.type(instagramUsernameInput, testUsername);
  await userEvent.click(submitButton);
  expect(instagramUsernameInput.value).toBe(testUsername);
});
