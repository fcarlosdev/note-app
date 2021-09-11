import React, { useRef } from "react";
import "./form-field.css";

const FormField = (props) => {
  const defaultValue = useRef(props.value);

  const handleInput = (event) => {
    if (props.onChange) {
      props.onChange(event.target.innerHTML);
    }
  };

  const setClasses = () => {
    return props.className ? props.className : "";
  };

  return (
    <div
      contentEditable
      className={`form-field ${setClasses()}`}
      onInput={handleInput}
      data-placeholder={props.placeholder || ""}
      dangerouslySetInnerHTML={{ __html: defaultValue.current }}
    />
  );
};

export default FormField;
