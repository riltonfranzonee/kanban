import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useMemo } from "react";
import classNames from "@src/utils/classNames";
import { STATUS_COLORS } from "@src/constants/TicketStatuses";

interface DropdownOption {
  label: string;
  value: string;
}

interface Props {
  selectedValue: string;
  options: DropdownOption[];
  onSelect: (selectedValue: string) => void;
}

const Dropdown: React.FC<Props> = ({ selectedValue, options, onSelect }) => {
  const selectedLabel = useMemo(() => {
    return (
      options.find((o) => o.value === selectedValue)?.label || options[0]?.label
    );
  }, [options, selectedValue]);

  const labelColor = STATUS_COLORS[selectedValue]?.text;

  return (
    <Menu as="div" className="relative text-left">
      <Menu.Button className={classNames(labelColor, "font-semibold")}>
        {selectedLabel}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
          {options.map((option) => (
            <Menu.Item key={option.value}>
              {({ active }) => {
                const selected = selectedValue === option.value;

                const optionColor = STATUS_COLORS[option.value]?.text || "";

                return (
                  <button
                    className={classNames(
                      optionColor,
                      active || selected ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm w-full text-left justify-center"
                    )}
                    onClick={() => {
                      onSelect(option.value);
                    }}
                    type="button"
                  >
                    {option.label}
                  </button>
                );
              }}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
