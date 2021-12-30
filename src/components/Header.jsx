function Header() {
  return (
    <header className="border-b border-b-gray-200 py-5">
      <div className="max-w-7xl mx-auto px-3 flex items-center justify-start">
        <h1 className="font-extrabold text-3xl text-gray-800">Rent or Sell</h1>
        <button type="button" className="btn btn-ghost mr-4 ml-auto px-7">
          Login
        </button>
        <button type="button" className="btn btn-primary px-7">
          Signup
        </button>
      </div>
    </header>
  );
}

export default Header;
