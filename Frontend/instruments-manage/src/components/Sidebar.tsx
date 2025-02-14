import { Link } from "react-router";
import { SidebarOptions } from "../const/sidebar.const";
import PixelCanvas from "./PixelCanvas";

const Sidebar = () => {
  return (
    <aside className="border-r border-gray-800/40">
      <nav className="flex flex-col gap-4 pt-4 items-center">
        {SidebarOptions.map(({ label, uri }, index) => {
          return (
            <Link
              to={uri}
              className="relative w-11/12 h-10 flex items-center border rounded-lg border-gray-800/40 hover:border-slate-300 hover:font-semibold hover:text-slate-100"
              key={index}
              viewTransition
            >
              <PixelCanvas />
              <h2 className="absolute ml-4">{label}</h2>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
