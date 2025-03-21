import { Link } from "react-router";
import { SidebarOptions } from "../const/sidebar.const";
import PixelCard from "./PixelCard";

const Sidebar = () => {
  return (
    <aside className="border-r border-border-color/40">
      <nav className="flex flex-col gap-4 pt-4 items-center">
        {SidebarOptions.map(({ label, uri }, index) => {
          return (
            <Link
              to={uri}
              className="relative w-10/12 h-10 flex items-center border rounded-lg border-border-color/40 hover:border-border-color hover:font-semibold hover:text-slate-100 hover:scale-x-105"
              key={index}
              viewTransition
            >
              <PixelCard colors="#1F2937, #3B4147, #798591, #fa8d3e, #0d1017">
                <h2 className="absolute">{label}</h2>
              </PixelCard>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
