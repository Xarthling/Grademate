import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('SignUp values:', values);
    setTimeout(() => {
      setSubmitting(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-neutral-800">Create Account</h1>
          <h2 className="mt-3 text-xl text-neutral-600">Sign up for Teacher Assistant</h2>
        </div>
        
        <Card className="mt-8 shadow-medium">
          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <InputField
                  id="name"
                  name="name"
                  type="text"
                  label="Full Name"
                  required
                />
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  label="Email address"
                  required
                />
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  required
                />
                <InputField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
        
        <div className="text-center">
          <p className="text-sm text-neutral-600">
            Already have an account?{' '}
            <a href="/" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
