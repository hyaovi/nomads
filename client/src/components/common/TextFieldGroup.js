import React from "react";
import classnames from "classnames";
import Proptypes from "prop-types";

function TextFieldGroup({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  disabled,
  onChange
}) {
  return (
    <div>
      <div className="form-group">
        <input
          type={type}
          className={classnames("form-control form-control-lg", {
            "is-invalid": error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {info && <small className=" form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}
TextFieldGroup.Proptypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  placeholder: Proptypes.string,
  disabled: Proptypes.string,
  info: Proptypes.string,
  error: Proptypes.string,
  label: Proptypes.string
};
// setting default props
TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
