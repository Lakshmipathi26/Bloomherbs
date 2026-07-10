const stub = (name) => () => (
  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
    <h1 style={{ color: 'var(--primary)' }}>{name}</h1>
  </div>
);

export const Login = stub('Login');
export const Register = stub('Register');
export const ForgotPassword = stub('Forgot Password');
export const ResetPassword = stub('Reset Password');
