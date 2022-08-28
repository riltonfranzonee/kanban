import React from "react";
import classNames from "@src/utils/classNames";
import randomNumberFromInterval from "@src/utils/randomNumberFromInterval";

const TicketSkeleton: React.FC = () => {
  const fakeTags = Array(randomNumberFromInterval(2, 5)).fill("");

  return (
    <div
      className={classNames(
        `flex w-full flex-col shadow-sm bg-white rounded-md p-4 mb-4 border-l-4 animate-pulse h-[70px]`
      )}
    >
      <div className="h-2 bg-gray-200 rounded w-40 mb-4" />

      <div className="flex space-x-2">
        {fakeTags.map((_, index) => (
          <div
            key={index.toString()}
            className="h-2 px-5 bg-gray-200 rounded w-5"
          />
        ))}
      </div>
    </div>
  );
};

export default TicketSkeleton;
