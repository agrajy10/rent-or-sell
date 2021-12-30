import { Link } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '../assets/svg/google.svg';
function Login() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto lg:py-24 py-20 px-3 flex items-center justify-center">
      <div className="card card-bordered border-gray-200 shadow-lg w-full max-w-md">
        <div className="card-body">
          <h1 className="text-3xl md:text-4xl  text-gray-900 text-center font-bold mb-8">
            Welcome back!
          </h1>
          <button
            type="button"
            className="btn btn-ghost btn-block border border-gray-300 py-3 mb-8 h-auto text-gray-800 hover:border-gray-300 hover:bg-gray-100 hover:no-underline">
            <GoogleIcon width="24px" height="24px" className="mr-2" /> Sign in with google
          </button>
          <form action="">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input type="email" className="input input-bordered w-full mb-4" id="email" />
            <label htmlFor="password" className="label">
              Password
            </label>
            <input type="password" className="input input-bordered w-full mb-8" id="password" />
            <button type="submit" className="btn btn-primary btn-block mx-0 mb-8">
              Login
            </button>
            <p className="text-center text-sm">
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
