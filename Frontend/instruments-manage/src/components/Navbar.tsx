const Navbar = () => {
  return (
    <header className="flex w-full pl-3 border-b border-border-color/40 backdrop-blur-xs items-center">
      <h1 className="text-xl font-bold">
        <span className="text-center text-text-primary">
          <span className="text-center bg-secondary text-background-color/80 px-2 py-0.5 mr-1.5 rounded-md">
            Instruments
          </span>
          Manage
        </span>
      </h1>
    </header>
  );
};

export default Navbar;
