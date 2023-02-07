/* eslint-disable @next/next/no-img-element */
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  image: string;
  value: string;
  onRemove?: any;
}

const Dropdown = (props: DropdownProps) => {
  const { image, value, onRemove } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <li
      className={styles.element}
      onClick={() => setShowDropdown((prev) => !prev)}
    >
      <span>
        <img src={image} alt="" /> {value}
      </span>
      {onRemove && <FontAwesomeIcon icon={faTimes} onClick={onRemove} />}
      {showDropdown && (
        <ul className={styles.dropdown}>
          <li>
            <img src={image} alt="" /> Asthma
          </li>
          <li>
            <img src={image} alt="" />
            COPD
          </li>
          <li>
            <img src={image} alt="" />
            Diabetes
          </li>
        </ul>
      )}
    </li>
  );
};

export default Dropdown;
