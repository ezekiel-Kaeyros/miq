'use client';
import React, { useState } from 'react';
import FaqItem from './faq-item/FaqItem';

// const faqs = [
//   {
//     id: 1,
//     title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr ?',
//     content:
//       'This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.',
//   },
//   {
//     id: 2,
//     title: 'At vero eos et accusam et justo duo ?',
//     content:
//       'This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.',
//   },
//   {
//     id: 3,
//     title: 'Ut wisi enim ad minim veniam, quis exerci tation ullcper ?',
//     content:
//       'This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.',
//   },
//   {
//     id: 4,
//     title: 'Duis autem vel eum iriure dolor in hendrerit in vulputate se ?',
//     content:
//       'This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.',
//   },
//   {
//     id: 5,
//     title: 'Consetetur sadipscing elitr, sed diam nonumy ?',
//     content:
//       'This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.',
//   },
// ];

type FaqsProps = {
  faqs:Array<{
    id: number,
    title:string,
    content: string
  }>
}
const Faqs: React.FC<FaqsProps>  = ({faqs}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<{
    id?: number;
    title: string;
    content: string;
  }>(faqs[0]);

  const handleClickItem = (id: number) => {
    setToggle((toggle) => !toggle);
    let selecteItem = faqs?.filter((faq) => faq?.id === id);
    setSelectedItem(selecteItem[0]);
    console.log(id);
  };
  return (
    <div className="relative">
      <h1 className=" mb-8 lg:mb-32 font-bold text-2xl mx-auto w-fit lg:text-3xl">
        FAQs
      </h1>
      <div className="relative">
        <div className="xl:max-w-xl 2xl:max-w-3xl">
          {faqs?.map((faq) => (
            <FaqItem
              key={faq?.id}
              title={faq?.title}
              content={selectedItem?.content}
              handleClickItem={() => handleClickItem(faq?.id)}
              id={faq?.id}
              activeItemId={selectedItem?.id}
              toggle={toggle}
            />
          ))}
        </div>
        <div className="hidden xl:block xl:absolute xl:w-[30rem] 2xl:w-[52rem] xl:pl-[4rem] 2xl:pl-[5rem] xl:py-10 xl:pr-16 xl:-top-10 xl:left-1/2 xl:h-[28rem] -z-10 border py- rounded-xl -ml-8">
          <h1 className="font-bold text-xl mb-8">{selectedItem?.title}</h1>
          {selectedItem?.content}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
