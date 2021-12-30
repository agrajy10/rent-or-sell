function ForgotPassword() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto lg:py-24 md:py-20 py-14 px-3 flex items-center justify-center">
      <div className="card card-bordered border-gray-200 shadow-lg w-full max-w-md">
        <div className="card-body">
          <h1 className="text-3xl md:text-4xl  text-gray-900 text-center font-bold md:mb-8 mb-4">
            Reset password
          </h1>
          <form action="">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input type="email" className="input input-bordered w-full mb-4" id="email" />
            <button type="submit" className="btn btn-primary btn-block mx-0">
              Send reset link
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
