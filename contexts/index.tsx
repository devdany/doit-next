import React from 'react';

export type GlobalProviderProps = {
  children: React.ReactNode;
};

export default function GlobalProvider(props: GlobalProviderProps) {
  const { children } = props;
  return (
    <>
      {children}
    </>
  );
}
