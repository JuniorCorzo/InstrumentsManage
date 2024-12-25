import { SidebarOptions } from "../const/sidebar.const"

const Sidebar = () => {
    return (
        <aside className=" h-screen border-r border-gray-800/40">
            <ul className="flex flex-col gap-4 pt-4 items-center">
                {SidebarOptions.map(({label, uri}, index) => {
                    return (
                        <li className="flex w-11/12 h-9 pl-4 border rounded-lg border-gray-800/40 items-center hover:bg-gray-400/20 hover:backdrop-blur-sm hover:cursor-pointer" key={index}>
                            <a href={uri}>{label}</a>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}

export default Sidebar