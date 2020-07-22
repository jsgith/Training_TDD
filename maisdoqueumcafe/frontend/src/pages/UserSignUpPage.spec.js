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

            fireEvent.change(passwordInput, changeEvent('my-password'));

            expect(passwordInput).toHaveValue('my-password');
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
            const { container, queryByPlaceholderText } = render(
                <UserSignupPage actions={actions}/>
            );

            const displayNameInput = queryByPlaceholderText('Your display name');
            const usernameInput = queryByPlaceholderText('Your username');
            const passwordInput = queryByPlaceholderText('Your password');
            const passwordRepeatInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(usernameInput, changeEvent('my-user-name'));
            fireEvent.change(passwordInput, changeEvent('my-password'));
            fireEvent.change(passwordRepeatInput, changeEvent('my-password'));

            const button = container.querySelector('button');
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1); // we expect our mock function to be called
        });

        it('It does not throw exception when clicking the button when actions not provided in props', () => { // We will pretend we are sending an http call to the back end (mocking)
            const { container, queryByPlaceholderText } = render(
                <UserSignupPage/>
            );

            const displayNameInput = queryByPlaceholderText('Your display name');
            const usernameInput = queryByPlaceholderText('Your username');
            const passwordInput = queryByPlaceholderText('Your password');
            const passwordRepeatInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(usernameInput, changeEvent('my-user-name'));
            fireEvent.change(passwordInput, changeEvent('my-password'));
            fireEvent.change(passwordRepeatInput, changeEvent('my-password'));

            const button = container.querySelector('button');
            expect(() => fireEvent.click(button)).not.toThrow(); 
        });
    });
});