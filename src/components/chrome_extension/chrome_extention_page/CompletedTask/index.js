import React from "react";

const CompletedTask = () => {
  return (
    <div className="bg-[#F9F9F9] border border-[#E7E7E9] p-4 rounded-lg flex flex-col flex-1">
      <p className="m-0 text-[#68686F] text-xs font-medium">Completed Tasks</p>
      <h4 className="m-0 text-xl font-semibold uppercase text-[#0C0C0D] mt-1">
        08
      </h4>
      <p className="m-0 text-[#68686F] text-xs font-medium mt-2">
        Tasks Data Size
      </p>
      <h4 className="m-0 text-xl font-semibold uppercase text-[#0C0C0D] mt-1">
        25mb
      </h4>
    </div>
  );
};

export default CompletedTask;
