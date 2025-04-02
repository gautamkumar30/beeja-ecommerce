import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">Beeja E-Commerce</h2>
          <p className="text-gray-400 mt-2">Empowering your shopping experience</p>
        </div>

        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-col p-4 space-x-6 text-gray-300">
          <li className='text-amber-600 font-bold text-3xl'>company</li>
            <li><a href="#" className="hover:text-white font-bold text-sm">Home</a></li>
            <li><a href="#" className="hover:text-white font-bold text-sm">Shop</a></li>
            <li><a href="#" className="hover:text-white font-bold text-sm">About</a></li>
            <li><a href="#" className="hover:text-white font-bold text-sm">Contact</a></li>
          </ul>
        </nav>
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-col p-4 space-x-6 text-gray-300">
            <li className='text-amber-600 font-bold text-3xl'>privacy</li>
            <li><a href="#" className="hover:text-white font-bold text-sm mb-3">Faq</a></li>
            <li><a href="#" className="hover:text-white font-bold text-sm pb-3">policy</a></li>
            <li><a href="#" className="hover:text-white font-bold text-sm pb-3">About</a></li>
            <li><a href="#" className="hover:text-white font-bold text-sm pb-3">Contact</a></li>
          </ul>
        </nav>
        <div className="mt-4 md:mt-0">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Beeja. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
