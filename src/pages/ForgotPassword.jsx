import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Reset password for:', values);
    setTimeout(() => {
      setSubmitting(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-neutral-800">Reset Password</h1>
          <h2 className="mt-3 text-xl text-neutral-600">We'll send you reset instructions</h2>
        </div>
        
        <Card className="mt-8 shadow-medium">
          <Formik
            initialValues={{ email: '' }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  label="Email address"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send reset instructions'}
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
        
        <div className="text-center">
          <p className="text-sm text-neutral-600">
            Remember your password?{' '}
            <a href="/" className="font-medium text-primary-600 hover:text-primary-500">
              Back to 
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
