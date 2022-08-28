import React from "react";
import HeartIcon from "@heroicons/react/24/solid/HeartIcon";
import ViewColumnsIcon from "@heroicons/react/24/outline/ViewColumnsIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import classNames from "@src/utils/classNames";

interface MenuItemProps {
  Icon: React.FC<React.ComponentProps<"svg">>;
  active?: boolean;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ Icon, active, label }) => {
  return (
    <button
      type="button"
      className={classNames(
        active
          ? "bg-red-500 text-white"
          : "text-red-500 hover:text-white hover:bg-red-500 transition duration-300",
        "flex justify-center items-center p-2 rounded"
      )}
      aria-label={label}
    >
      <Icon className={"h-8 w-8"} />
    </button>
  );
};

const menuItems: MenuItemProps[] = [
  {
    Icon: ViewColumnsIcon,
    label: "kanban",
    active: true,
  },

  {
    Icon: UserGroupIcon,
    label: "users",
  },
  {
    Icon: CalendarDaysIcon,
    label: "calendar",
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="px-3 py-3 md:py-5 bg-white flex align-center md:flex-col fixed top-0 md:top-auto md:left-0 md:h-full w-full md:w-auto">
      <HeartIcon className="h-10 w-15 my-auto md:my-0 md:mx-auto fill-red-500 md:mb-10 cursor-pointer hover:scale-125 transition duration-500" />

      <menu className="flex ml-5 md:ml-0 md:flex-col space-x-4 md:space-x-0 md:space-y-4">
        {menuItems.map(({ Icon, active, label }) => (
          <MenuItem label={label} key={label} Icon={Icon} active={active} />
        ))}
      </menu>
    </aside>
  );
};

export default Sidebar;
