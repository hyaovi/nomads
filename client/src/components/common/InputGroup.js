import React from "react";
import classnames from "classnames";
import Proptypes from "prop-types";

function InputGroup({
  name,
  placeholder,
  value,
  label,
  error,
  type,
  icon,
  onChange
}) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
InputGroup.proptypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  placeholder: Proptypes.string,
  icon: Proptypes.string,
  error: Proptypes.string
};
// setting default props
InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
