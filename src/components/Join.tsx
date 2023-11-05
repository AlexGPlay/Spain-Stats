import * as React from "react";

const Join = ({
  children,
  separator,
}: {
  children: React.ReactNode;
  separator: React.ReactNode;
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <>
      {childrenArray.map((child, index) => {
        const isLastChild = index === childrenArray.length - 1;

        return (
          <React.Fragment key={index}>
            {child}
            {!isLastChild && separator}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Join;
