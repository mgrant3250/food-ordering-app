import React, { forwardRef, type InputHTMLAttributes } from "react";

/* -------------------- Props -------------------- */

type InputFieldProps = {
  id: string;
  label: string;
  type?: string;

  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  placeholder?: string;

  showToggle?: boolean;
  showValue?: boolean;
  onToggle?: () => void;

  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

/* -------------------- Component -------------------- */

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      type = "text",
      value,
      onChange,
      placeholder,
      showToggle,
      showValue,
      onToggle,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="input-wrapper">
        <label htmlFor={id}>{label}</label>

        <div className="password-wrapper">
          <input
            id={id}
            type={showToggle ? (showValue ? "text" : "password") : type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />

          {showToggle && (
            <button
              type="button"
              onClick={onToggle}
              className={className ?? ""}
            >
              {showValue ? "hide" : "show"}
            </button>
          )}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";