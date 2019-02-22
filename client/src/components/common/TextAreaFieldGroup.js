import React from "react";
import classnames from "classnames";
import Proptypes from "prop-types";

function TextAreaFieldGroup({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  onChange
}) {
  return (
    <div>
      <div className="form-group">
        <textarea
          className={classnames("form-control form-control-lg", {
            "is-invalid": error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {info && <small className=" form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}
TextAreaFieldGroup.propTypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  type: Proptypes.string,
  onChange: Proptypes.func.isRequired,
  placeholder: Proptypes.string,
  info: Proptypes.string,
  error: Proptypes.string,
  label: Proptypes.string
};

export default TextAreaFieldGroup;
