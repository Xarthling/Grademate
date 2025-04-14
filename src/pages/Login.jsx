import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    // This would normally be an API call
    console.log('Login values:', values);
    
    // Simulate login
    setTimeout(() => {
      setSubmitting(false);
      // Redirect to dashboard on successful login
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="text-3xl">👨‍🏫</div>
          </div>
          <h1 className="text-3xl font-semibold text-neutral-800">Teacher Assistant</h1>
          <h2 className="mt-3 text-xl text-neutral-600">Sign in to your account</h2>
        </div>
        
        <Card className="mt-8 shadow-medium">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="you@example.com"
                  error={errors.email}
                  touched={touched.email}
                  required
                />
                
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  error={errors.password}
                  touched={touched.password}
                  required
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <a href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-150">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-150">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;