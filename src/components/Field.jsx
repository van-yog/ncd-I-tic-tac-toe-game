import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import initFieldData from "../utils";
import Spinner from "./Spinner";

const Field = ({ steps, activeField, setActiveField, className, loading }) => {
  const data = initFieldData();

  const [fieldData, setFieldData] = useState(data);

  useEffect(() => {
    const newData = [...data];

    if (!steps.length) {
      setFieldData(newData);

      return;
    }

    steps.forEach(
      (item, index) => (newData[item.count].value = index % 2 ? "O" : "X")
    );

    setFieldData(newData);
  }, [steps]);

  const handleClick = (e) => setActiveField(+e.target.id);

  const showValue = (value, index) => {
    if (value) return value;
    if (index === activeField) return steps.length % 2 ? "O" : "X";
  };

  return (
    <div className={`field ${className}`}>
      {loading && <Spinner />}
      {fieldData.map(({ id, value }, index) => (
        <div
          onClick={handleClick}
          key={id}
          id={id}
          className={`${index === activeField ? "active" : ""} ${
            value ? "value" : ""
          }`}
        >
          {showValue(value, index)}
        </div>
      ))}
    </div>
  );
};

Field.propTyps = {
  activeField: PropTypes.number,
  className: PropTypes.string,
  setActiveField: PropTypes.func,
  steps: PropTypes.array,
};

Field.defaulProps = {
  steps: [],
};

export default Field;
