const Footer = () => {
  return (
    <footer className="bg-primary/10 border-t p-4 mt-auto dark:bg-primary/5 w-full">
      <div className="w-full text-center">
        <p>&copy; {new Date().getFullYear()} 3D Air Pollution Map</p>
      </div>
    </footer>
  );
};

export default Footer;
