import React from 'react';

type InputFieldProps = {
  props?: any;
  name: string;
  placeholder?: string;
  title?: string;
  error?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  props,
  title,
  name,
  placeholder,
  error,
}) => {
  return (
    <>
      <label className="font-bold block mb-3 text-black" htmlFor={name}>
        {title}
      </label>
      <input
        className={`appearance-none border rounded-md w-full py-3 px-3 leading-tight  ${
          error
            ? 'border-red-600 focus:border-red-600'
            : 'border-gray-300 focus:border-gray-200'
        }  focus:outline-none focus:border-primaryColor focus:bg-white text-gray-700 pr-16`}
        id={name}
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        autoFocus
        name={name}
        {...props}
      />
    </>
  );
};

export default InputField;
