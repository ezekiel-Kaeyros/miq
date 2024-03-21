import React from 'react';

type DescriptionHintBoxProps = {
  data: string[];
  title: string;
};
const DescriptionHintBox: React.FC<DescriptionHintBoxProps> = ({
  title,
  data,
}) => {
  return (
    <div className="rounded-lg w-full">
      <h1 className="font-bold mb-4">{title}</h1>
      <ul className="list-disc pl-8">
        {data?.map((element: string) => <li key="element">{element}</li>)}
      </ul>
    </div>
  );
};

export default DescriptionHintBox;
