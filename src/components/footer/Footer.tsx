const Footer = () => {
  return (
    <div className="py-4 bg-gray-800">
      <div className="container mx-auto flex items-center justify-center">
        <p className="text-white">
          ©{new Date().getFullYear()} Product Gallery - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
