import * as React from 'react';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit';
}

function FilledButton(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`${props.className} rounded-full border-1 bg-rose-500 px-3 py-2 w-full text-white hover:bg-rose-700`}
    >
      {props.children}
    </button>
  );
}

function OutlinedButton(props: ButtonProps) {
  const style =
    'rounded-full border-red-200 border-2 bg-white px-3 py-2 w-full text-black';
  const hoverStyle = 'hover:border-red-300';
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`${props.className} ${style} ${hoverStyle}`}
    >
      {props.children}
    </button>
  );
}

interface ExtendedButtonProps extends ButtonProps {
  variant?: 'filled' | 'outlined';
}

function Button(props: ExtendedButtonProps) {
  const { variant } = props;
  if (variant === 'filled' || !variant) return <FilledButton {...props} />;
  else if (variant === 'outlined') return <OutlinedButton {...props} />;
  else return <FilledButton {...props} />;
}

interface InputFieldProps {
  type: 'text' | 'email' | 'password';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
}

function InputField(props: InputFieldProps) {
  const style =
    'mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400';
  const hoverStyle = 'hover:border-slate-400';

  return (
    <input
      type={props.type}
      className={`${
        props.className ? props.className : ''
      } ${style} ${hoverStyle}`}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
    />
  );
}

interface TextFieldProps extends InputFieldProps {
  fieldName?: string;
  className?: string;
  inputClassName?: string;
}

function TextField(props: TextFieldProps) {
  return (
    <label className={`block ${props.className}`}>
      <span className="block text-sm font-semibold text-slate-700">
        {props.fieldName}
      </span>
      <InputField
        className={props.inputClassName ? props.inputClassName : ''}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      />
    </label>
  );
}

export { Button, FilledButton, OutlinedButton };
export { InputField, TextField };
