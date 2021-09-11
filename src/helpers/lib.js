export const isAllFieldsEmpty = (fields) => {
  return fields instanceof Array
    ? fields.every((f) => f.textContent === "" || f.innerHTML === "")
    : false;
};
