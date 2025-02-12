import { Link } from "react-router";
import { SidebarOptions } from "../const/sidebar.const";
import PixelCanvas from "./PixelCanvas";

const Sidebar = () => {
  return (
    <aside className=" h-screen border-r border-gray-800/40">
      <ul className="flex flex-col gap-4 pt-4 items-center">
        {SidebarOptions.map(({ label, uri }, index) => {
          return (
            <>
              <li
                className="relative w-11/12 h-10 flex items-center border rounded-lg border-gray-800/40 hover:border-slate-300 hover:font-semibold hover:text-slate-100 hover:cursor-pointer"
                key={index}
              >
                <PixelCanvas />
                <Link className="absolute ml-4" to={uri}>
                  {label}
                </Link>
              </li>
            </>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
