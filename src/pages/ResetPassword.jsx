import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    // Here you would validate the token and submit the new password
    console.log('Reset password values:', values);
    console.log('Token:', token);

    setTimeout(() => {
      setSubmitting(false);
      navigate('/');
    }, 1000);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <p className="text-red-600">Invalid or expired reset link</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => navigate('/forgot-password')}
          >
            Request new reset link
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-neutral-800">Reset Your Password</h1>
          <h2 className="mt-3 text-xl text-neutral-600">Enter your new password</h2>
        </div>

        <Card className="mt-8 shadow-medium">
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  label="New Password"
                  required
                />
                <InputField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm New Password"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Updating password...' : 'Update password'}
                </Button>
              </Form>
            )}
          </Formik>
        </Card>

        <div className="text-center">
          <p className="text-sm text-neutral-600">
            Remember your password?{' '}
            <a href="/" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
