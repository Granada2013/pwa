import React, { useState } from "react";

interface Props {
  itemsList: Array<string>;
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
}
const Select = (props: Props) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const handleDropdown = () => {
    if (!dropdown)
      setTimeout(() =>
        document.addEventListener("click", () => setDropdown(false), {
          once: true,
        })
      );
    setDropdown(!dropdown);
  };
  return (
    <React.Fragment>
      <div
        className="select"
        onClick={handleDropdown}
        style={{
          border: dropdown ? "3px solid #ffff" : "none",
          color: props.value ? "#ffff" : "#a6a6a8",
        }}
      >
        {props.value || props.placeholder}
        {dropdown ? (
          <ul className="dropdown">
            {props.itemsList?.map((item, i) => (
              <li key={i} onClick={() => props.onChange(item)}>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default Select;
