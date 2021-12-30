import { ReactComponent as GithubLogo } from '../assets/svg/github.svg';

function Footer() {
  return (
    <footer className=" bg-slate-900 text-gray-100 text-center py-7 px-4 text-sm">
      <div>
        <a
          href="https://github.com/agrajy10/rent-or-sell"
          target="_blank"
          className="inline-block mb-2 hover:opacity-90">
          <GithubLogo fill="#FFFFFF" width="60px" height="60px" />
        </a>
      </div>
      Built by{' '}
      <a href="https://github.com/agrajy10" target="_blank" className="hover:underline">
        Agraj Yadav
      </a>
    </footer>
  );
}

export default Footer;
