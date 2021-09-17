import React, { useRef } from "react";
import "./form-field.css";

const FormField = (props) => {
  const defaultValue = useRef(props.value);
  const fieldRef = (props.refer !== undefined) ? props.refer : null;

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
      ref={fieldRef}
    />
  );
};

export default FormField;
