import React from 'react';

type Props = {
  children: string;
  onClick: () => void;
};

export const ImageCreateButton = ({ children, onClick }: Props) => {
  return (
    <a
      className="px-8 py-2 font-semibold bg-green-400 rounded-full hover:shadow hover:bg-green-500"
      onClick={onClick}
    >
      {children}
    </a>
  );
};
