import LWSLogo from "../assets/lws-logo-en.svg";
import Logo from "../assets/logo.jpeg";

const Header = () => {
  return (
    <nav className="py-6 md:py-8 mx-20 fixed top-0 w-full !bg-[#191D26] z-50">
      <div className="container mx-auto flex items-center gap-x-6">
        <a href="/" className="text-3xl">
          <img className="h-[55px]" src={Logo} alt="Brain Bit Logo" />
        </a>
        <p className="text-white text-2xl">BrainBit</p>
      </div>
    </nav>
  );
};

export default Header;
