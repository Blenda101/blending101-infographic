/* eslint-disable @next/next/no-img-element */
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { criteriaVar, VariantState } from "../../graphql/Infograph";
import { useDataset } from "../context/VariantProvider";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  items: any;
  image: string;
  value: string;
  onRemove?: any;
  isEffectingChart?: boolean;
  keyName: keyof VariantState;
  keyImage: string;
  showDropdownState: any;
}

const Dropdown = (props: DropdownProps) => {
  const {
    items,
    image,
    value,
    onRemove,
    isEffectingChart,
    keyName,
    keyImage,
    showDropdownState,
  } = props;
  const type = useDataset();
  const criteria = criteriaVar();

  const [showDropdown, setShowDropdown] = showDropdownState;
  const criteriaChangeHandler = (iName: string, iImage: string) => {
    criteriaVar({
      ...criteria,
      [type]: {
        ...criteria[type],
        [keyName]: iName,
        [keyImage]: iImage,
      },
    });
  };

  return (
    <li
      className={`${styles.element} ${
        isEffectingChart ? styles["element--active"] : ""
      }`}
      onClick={(e) => {
        if (showDropdown === keyName) setShowDropdown("");
        else setShowDropdown(keyName);
        e.stopPropagation();
      }}
    >
      <span>
        <img src={isEffectingChart ? image : `/filters${image}`} alt="" />
        {value}
        <span>
          <img
            src={`/images/down${type === "death" ? "-white" : ""}.svg`}
            alt="down"
          />
        </span>
      </span>

      {onRemove && (
        <FontAwesomeIcon
          icon={faTimes}
          onClick={(e) => {
            onRemove();
            e.stopPropagation();
          }}
        />
      )}
      {showDropdown === keyName && (
        <ul className={styles.dropdown}>
          {Object.keys(items).map((item) => (
            <li
              key={item}
              className={value === item ? styles.active : ""}
              onClick={() => {
                criteriaChangeHandler(item, (items as any)[item]);
              }}
            >
              <img
                src={`${isEffectingChart ? "" : "/filters"}${
                  (items as any)[item]
                }`}
                alt={item}
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Dropdown;

Dropdown.defaultProps = {
  isEffectingChart: true,
};
