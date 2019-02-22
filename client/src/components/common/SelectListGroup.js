import React from "react";
import classnames from "classnames";
import Proptypes from "prop-types";

function SelectListGroup({
  name,
  value,
  label,
  error,
  info,
  options,
  onChange
}) {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div>
      <div className="form-group">
        <select
          className={classnames("form-control form-control-lg", {
            "is-invalid": error
          })}
          name={name}
          value={value}
          onChange={onChange}
        >
          {selectOptions}
        </select>
        {info && <small className=" form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}
SelectListGroup.propTypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  info: Proptypes.string,
  error: Proptypes.string,
  options: Proptypes.string.isRequired
};

export default SelectListGroup;
