import React from 'react';
import { 
    render, 
    fireEvent,
    waitFor,
    waitForElementToBeRemoved
} from '@testing-library/react'; // FireEvent to simulate user input function
import { UserSignupPage } from './UserSignupPage';

describe('UserSignupPage', () => {  //First Arg: Description, Second Arg: Function which will include the test function in it
    
    describe('Layout', () => { //Test the existence of the required fields
        
        it('has header of Sign Up', () => { // we can use test() or it()
            const { container } = render(<UserSignupPage />)
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');
        }); 
        it('has an input for display name', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>);
            const displayNameInput = queryByPlaceholderText('Your display name');
            expect(displayNameInput).toBeInTheDocument();
        });
        it('has an input for username', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>);
            const usernameInput = queryByPlaceholderText('Your Username');
            expect(usernameInput).toBeInTheDocument();
        });
        it('has an input for password', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>);
            const passwordInput = queryByPlaceholderText('Your Password');
            expect(passwordInput).toBeInTheDocument();
        });
        it('has password type for password input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>);
            const passwordInput = queryByPlaceholderText('Your Password');
            expect(passwordInput.type).toBe('password');
        });
        it('has input for password repeat', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>);
            const passwordRepeat = queryByPlaceholderText('Repeat your Password');
            expect(passwordRepeat).toBeInTheDocument();
        });
        it('has password type for password repeat input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>);
            const passwordRepeat = queryByPlaceholderText('Repeat your Password');
            expect(passwordRepeat.type).toBe('password');
        });
        it('has submit button', () => {
            const { container } = render(<UserSignupPage/>);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        })
    });

    describe('Interactions', () => {

        const changeEvent = (content) => {
            return { 
                target: {
                    value: content
                }
            };
        };

        let button, displayNameInput, usernameInput, passwordInput, passwordRepeat;

        const setupForSubmit = (props) => {

            const rendered = render(
                <UserSignupPage {...props}/>
            );

            const { container, queryByPlaceholderText } = rendered;

            usernameInput = queryByPlaceholderText('Your Username');
            displayNameInput = queryByPlaceholderText('Your display name');
            passwordInput = queryByPlaceholderText('Your Password');
            passwordRepeat = queryByPlaceholderText('Repeat your Password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(usernameInput, changeEvent('my-username'));
            fireEvent.change(passwordInput, changeEvent('my-password'));
            fireEvent.change(passwordRepeat, changeEvent('my-repeated-password'));

            button = container.querySelector('button');

            return rendered;
        }

        const mockAsyncDelayed = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({});
                    }, 300)
                });
            });
        }

        it('sets the displayName value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>);
            const displayNameInput = queryByPlaceholderText('Your display name');
            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            expect(displayNameInput).toHaveValue('my-display-name'); //It works right away because the input field as its own state by default.
        });
        
        it('sets the username value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>);
            const usernameInput = queryByPlaceholderText('Your Username');
            fireEvent.change(usernameInput, changeEvent('my-username'));
            expect(usernameInput).toHaveValue('my-username');
        });

        it('sets password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>);
            const passwordInput = queryByPlaceholderText('Your Password');
            fireEvent.change(passwordInput, changeEvent('my-password'));
            expect(passwordInput).toHaveValue('my-password');
        });

        it('sets repeat password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>);
            const passwordRepeat = queryByPlaceholderText('Your Password');
            fireEvent.change(passwordRepeat, changeEvent('my-repeated-password'));
            expect(passwordRepeat).toHaveValue('my-repeated-password');
        });

        it('calls postSignup when the fields are valid and the actions are provided in props', () => {
            //In testing we will pretned we are sending an http request to the back end
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})  // Mock function, asynchronus is handled with promise
            };

            setupForSubmit({actions});

            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });

        it('does not throw exception when clicking the button when actions are provided in props', () => {
            setupForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow(); // Not throw exception
        });

        it('calls post when user body when the fields are valid', () => {
            //In testing we will pretned we are sending an http request to the back end
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})  // Mock function, asynchronus is handled with promise
            };

            setupForSubmit({actions});

            fireEvent.click(button);
            const expectedUserObject = {
                username: 'my-username',
                displayName: 'my-display-name',
                password: 'my-password',
            }
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        });

        it('does not allow user to click the Sign up button when there is an ongoing api call', () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            }
            setupForSubmit({actions});

            fireEvent.click(button);
            fireEvent.click(button);
            
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });

        it('displays a spinner when there is an ongoing api call', () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            };
            const {queryByText} = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Loading...');
            expect(spinner).toBeInTheDocument();
        });

        it('hides spinner after api call finishes successfully', async () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            };
            const {queryByText} = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Loading...'); 
            await waitForElementToBeRemoved(spinner);

            expect(spinner).not.toBeInTheDocument();
        });

        it('hides spinner after api call finishes with error', async () => {
            const actions = {
                postSignup: jest.fn().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            reject({
                                response: { data: {} }
                            });
                        }, 300)
                    });
                })
            };
            const {queryByText} = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Loading...'); 
            await waitForElementToBeRemoved(spinner);

            expect(spinner).not.toBeInTheDocument();
        });

        it('displays validation error for displayName when error is received for the field', async () => {
            const actions = {
                postSignup: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            validationErrors: {
                                displayName: 'Cannot be null'
                            }
                        }
                    }
                })
            }
            const { getByText } = setupForSubmit({actions});
            fireEvent.click(button);

            await waitFor(() => {
                expect(getByText('Cannot be null')).toBeInTheDocument();
            })
        })
    });
});