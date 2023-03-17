// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

// src/setupTests.js
import { server } from "./mocks/server.js";
// Establish API mocking before all tests.
beforeAll(() => {
  delete window.location;
  window.location = new URL("http://localhost");
  server.listen();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
// Clean up after the tests are finished.
afterAll(() => {
  server.close();
});

