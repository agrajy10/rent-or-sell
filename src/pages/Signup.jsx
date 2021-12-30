import { Link } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '../assets/svg/google.svg';

function Signup() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto lg:py-24 md:py-20 py-14 px-3">
      <div className="card card-bordered border-gray-200 shadow-lg max-w-md mx-auto">
        <div className="card-body">
          <h1 className="text-4xl  text-gray-900 text-center font-bold mb-8">Get started!</h1>
          <button
            type="button"
            className="btn btn-ghost btn-block border border-gray-300 py-3 mb-8 h-auto text-gray-800 hover:border-gray-300 hover:bg-gray-100 hover:no-underline">
            <GoogleIcon width="24px" height="24px" className="mr-2" /> Sign up with google
          </button>
          <form action="">
            <label htmlFor="fullname" className="label">
              Name
            </label>
            <input type="text" className="input input-bordered w-full mb-4" id="fullname" />
            <label htmlFor="email" className="label">
              Email
            </label>
            <input type="email" className="input input-bordered w-full mb-4" id="email" />
            <label htmlFor="password" className="label">
              Password
            </label>
            <input type="password" className="input input-bordered w-full mb-8" id="password" />
            <button type="submit" className="btn btn-primary btn-block mx-0 mb-8">
              Create account
            </button>
          </form>
          <p className="text-center text-sm font-medium text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Signup;
