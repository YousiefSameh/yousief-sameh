import React from 'react';

interface SpecialHeaderProps {
  title: string;
  id: string;
}

const SpecialHeader = React.memo(({ title, id }: SpecialHeaderProps) => {
  return (
    <div className="special-header md:mt-0 mt-16" id={id}>
      <h1 className="text-black dark:text-white font-bold md:text-4xl text-3xl">{title}</h1>
      <span className="line" />
    </div>
  );
});

export default SpecialHeader;