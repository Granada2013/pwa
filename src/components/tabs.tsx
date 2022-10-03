import React, { useState, useEffect } from "react";

interface Props {
  options: Array<string>;
  defaultOption: string;
  onChange: (option: string) => void;
}

const Tabs = (props: Props) => {
  const [active, setActive] = useState<string>(
    props.defaultOption || props.options[0]
  );

  const selectOption = (item: string) => {
    setActive(item);
    props.onChange(item);
  };

  useEffect(() => {
    const allTabs = document.querySelectorAll("[data-tab]");
    allTabs.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("data-tab") === active)
        item.classList.add("active");
    });
  }, [active]);

  return (
    <ul className="tabs">
      {props.options.map((item, i) => (
        <li key={i} onClick={() => selectOption(item)} data-tab={item}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
