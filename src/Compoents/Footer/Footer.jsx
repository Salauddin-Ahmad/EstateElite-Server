const Footer = () => {
  return (
    <footer className="bg-slate-200  shadow">
      <div className="w-full mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="https://i.ibb.co/CVjTYfB/Screenshot-2024-06-01-123321.png" className="h-16 w-16 rounded-full border-4 border-gray-400 " alt="EstateElite Logo" />
            <span className="self-center text-3xl font-semibold whitespace-nowrap ">EstateElite</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-base font-medium  sm:mb-0 ">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-300 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-base text-gray-700 sm:text-center ">© 2024 <a href="#" className="hover:underline">EstateElite™</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
