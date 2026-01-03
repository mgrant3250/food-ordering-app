import React from 'react';

export const InputField = React.forwardRef(({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  refProp,
  showToggle,
  showValue,
  onToggle,
  className,
  ...props
}, ref) => (
  <div className="input-wrapper">
    <label htmlFor={id}>{label}</label>
    <div className="password-wrapper">
      <input
        id={id}
        type={showToggle ? (showValue ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={refProp}
        {...props}
      />
      {showToggle && (
        <button type="button" onClick={onToggle} className={className ? className : ""}>
          {showValue ? "hide" : "show"}
        </button>
      )}
    </div>
  </div>
));