import React, { useEffect, useRef, useState } from "react";

interface Props {
  itemsList: Array<string>;
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
}
const Select = (props: Props) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const currIndex: any = useRef();

  const handleDropdown = (e: any) => {
    if (!dropdown) {
      setDropdown(true);
      if (e.type !== "focus")
        setTimeout(
          () =>
            document.addEventListener("click", () => setDropdown(false), {
              once: true,
            }),
          200
        );
    }
  };

  const handleSelect = (item: string) => {
    props.onChange(item);
    setDropdown(false);
  };

  useEffect(() => {
    if (!dropdown) {
      currIndex.current = undefined;
      return;
    }
    const list = document.querySelector(".dropdown");

    const handleKeyDown = (e: KeyboardEvent) => {
      const options = Array.from((list as Element).children);
      if (e.key === "Escape") {
        setDropdown(false);
      } else if (e.key === "ArrowDown") {
        options.forEach((li) => li.classList.remove("dropdown_hover"));
        if (
          currIndex.current === undefined ||
          currIndex.current === props.itemsList.length - 1
        )
          currIndex.current = 0;
        else currIndex.current += 1;
        options[currIndex.current].classList.add("dropdown_hover");
      } else if (e.key === "ArrowUp") {
        options.forEach((li) => li.classList.remove("dropdown_hover"));
        if (currIndex.current === undefined)
          currIndex.current = props.itemsList.length - 1;
        else if (currIndex.current === 0)
          currIndex.current = props.itemsList.length - 1;
        else currIndex.current -= 1;
        options[currIndex.current].classList.add("dropdown_hover");
      } else if (e.key === "Enter") {
        if (currIndex.current !== undefined)
          handleSelect(props.itemsList[currIndex.current]);
      }
    };

    const handleMouseOver = (e: any) => {
      Array.from((list as Element).children).forEach((li) =>
        li.classList.remove("dropdown_hover")
      );
      document.removeEventListener("keydown", handleKeyDown);
    };

    const handleMouseOut = (e: any) => {
      document.addEventListener("keydown", handleKeyDown);
      currIndex.current = 0;
    };

    if (list) {
      document.addEventListener("keydown", handleKeyDown);
      (list as Element).addEventListener("mouseover", handleMouseOver);
      (list as Element).addEventListener("mouseout", handleMouseOut);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdown]);

  return (
    <React.Fragment>
      <div
        className="select"
        onClick={(e) => handleDropdown(e)}
        style={{
          border: dropdown ? "3px solid #ffff" : "none",
          color: props.value ? "#ffff" : "#a6a6a8",
        }}
        tabIndex={0}
        onFocus={(e) => handleDropdown(e)}
        onBlur={() => setDropdown(false)}
      >
        {props.value || props.placeholder}
        {dropdown ? (
          <ul className="dropdown" role={"menu"}>
            {props.itemsList?.map((item, i) => (
              <li key={i} onClick={() => handleSelect(item)} role={"menuitem"}>
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
