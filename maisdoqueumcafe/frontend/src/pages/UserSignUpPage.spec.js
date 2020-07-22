import React from 'react';
import { render , cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserSignupPage } from './UserSignupPage';

beforeEach(cleanup);

describe('UserSignUpPage', () => {
    
    describe('layout', () => {

        it('has header of Sign Up', () => {
            const { container } = render(<UserSignupPage />)
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');
        });
        it('has input for display name', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Your display name');
            expect(displayNameInput).toBeInTheDocument();
        });
        it('has input for username', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Your username');
            expect(usernameInput).toBeInTheDocument();
        });
        it('has input for password', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput).toBeInTheDocument();
        });
        it('has paswword type for password input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput.type).toBe('password');
        });
        it('has input for password repeat', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordRepeat = queryByPlaceholderText('Repeat your password');
            expect(passwordRepeat).toBeInTheDocument();
        });
        it('has paswword type for password repeat input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordRepeat = queryByPlaceholderText('Repeat your password');
            expect(passwordRepeat.type).toBe('password');
        });
        it("has submit button", () => {
            const { container } = render(<UserSignupPage />);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument
        })
    });
    describe('Interactions', () => {

        const changeEvent = (content) => {
            return { 
                target: {
                    value: content
                }
            }
        };

        const mockAsyncDelayed = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({});
                    }, 300)
                })
            })
        }

        let button, displayNameInput, usernameInput, passwordInput, passwordRepeatInput;

        const setupForSubmit = (props) => {

            const rendered = render(
                <UserSignupPage {...props}/>
            );

            const { container, queryByPlaceholderText } = rendered;

            usernameInput = queryByPlaceholderText('Your username');
            passwordInput = queryByPlaceholderText('Your password');
            displayNameInput = queryByPlaceholderText('Your display name');
            passwordRepeatInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(usernameInput, changeEvent('my-user-name'));
            fireEvent.change(passwordInput, changeEvent('P4ssword'));
            fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'));

            button = container.querySelector('button');
            return rendered;
        }

        it('sets the displayName value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Your display name');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));

            expect(displayNameInput).toHaveValue('my-display-name');
        });

        it('sets the username value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Your username');

            fireEvent.change(usernameInput, changeEvent('my-user-name'));

            expect(usernameInput).toHaveValue('my-user-name');
        });

        it('sets the password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');

            fireEvent.change(passwordInput, changeEvent('P4ssword'));

            expect(passwordInput).toHaveValue('P4ssword');
        });

        it('sets the password repeat value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordRepeatInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(passwordRepeatInput, changeEvent('my-password-repeat'));

            expect(passwordRepeatInput).toHaveValue('my-password-repeat');
        });

        it('calls postSignup when the fields are valid and the actions are provided in props', () => { // We will pretend we are sending an http call to the back end (mocking)
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({}) // mock function. In javascript asynchronous are handle with promise function. Here we should mock a promise function
            };
            
            setupForSubmit({ actions });

            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1); // we expect our mock function to be called
        });

        it('It does not throw exception when clicking the button when actions not provided in props', () => { // We will pretend we are sending an http call to the back end (mocking)
            const { container, queryByPlaceholderText } = setupForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow(); 
        });

        it('calls post with user body when the fields are valid', () => { // We will pretend we are sending an http call to the back end (mocking)
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({}) // mock function. In javascript asynchronous are handle with promise function. Here we should mock a promise function
            };
            
            setupForSubmit({ actions });

            const expectedUserObject = {
                username: 'my-user-name',
                displayName: 'my-display-name',
                password: 'P4ssword'
            }
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        });

        it('does not allow the user to click the signup button when there is an ongoing api call', () => { // We will pretend we are sending an http call to the back end (mocking)
            const actions = {
                postSignup: mockAsyncDelayed()
            };
            
            setupForSubmit({ actions });
            fireEvent.click(button);

            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });

        it('displays spinner when there is an ongoing api call', () => { // We will pretend we are sending an http call to the back end (mocking)
            const actions = {
                postSignup: mockAsyncDelayed()
            };
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Loading...');
            expect(spinner).toBeInTheDocument();
        });
    });
});