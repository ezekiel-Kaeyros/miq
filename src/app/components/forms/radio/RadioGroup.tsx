import React from 'react';

type RadioGroupProps = {
  options: Array<any>;
  title: string;
  props: any;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ options, title, props }) => {
  return (
    <>
      <div className="mb-3 font-bold">{title}</div>
      <div className="flex justify-center flex-col">
        {options?.map((radioElement) => (
          <div
            key={radioElement.id}
            className={`flex md:mb-2 items-center sm:items-end justify-between`}
          >
            <input
              {...props}
              id={`${radioElement?.id}`}
              type="radio"
              value={radioElement.value}
              name={radioElement.name}
              className="w-6 h-6 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700"
            />
            <label
              htmlFor={radioElement.id}
              className={`w-full ml-2 md:ml-2  font-medium text-gray-900 ${
                radioElement.id === options[0]?.id ? '' : 'md:mt-0 mt-2'
              }`}
            >
              {radioElement.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default RadioGroup;
