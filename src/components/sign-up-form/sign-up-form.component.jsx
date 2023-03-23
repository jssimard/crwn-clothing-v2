import { useState } from "react";

import FormInput from '../form-input/form-input.component';
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //confirm passwords match
        if (event.target.password.value !== event.target.confirmPassword.value) {
            alert('Passwords do not match!');
            console.log('***DEBUG->passwords do not match');
            return;
        }

        try {
            //check if user has been authenticated with email & password
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            user.displayName = displayName;

            //create user doc
            const userDocRef = await createUserDocumentFromAuth(user);   
            
            resetFormFields();
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email address already in use!');
            }
            console.log('User email/pwd creation error', error);
        }


    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label='Display Name'
                    type="text"
                    required
                    name="displayName"
                    onChange={handleChange}
                    value={displayName}
                />

                <FormInput
                    label='Email'
                    type="email"
                    required
                    name="email"
                    onChange={handleChange}
                    value={email}
                />

                <FormInput
                    label='Password'
                    type="password"
                    required
                    name="password"
                    onChange={handleChange}
                    value={password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;