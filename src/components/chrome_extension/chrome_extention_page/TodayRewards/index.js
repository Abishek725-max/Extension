import React from "react";
import Graph from "../../../../assets/images/graph-1.png";
import { Image } from "@nextui-org/react";

const TodayRewards = () => {
  return (
    <div className="bg-[#F9F9F9] border border-[#E7E7E9] p-4 rounded-lg flex flex-col">
      <div className="icon">
        <Image src={Graph.src} alt="Graph" className="w-[36px] h-auto" />
      </div>
      <h4 className="m-0 text-xl font-semibold uppercase text-[#0C0C0D] mt-4">
        675.43 OPL
      </h4>
      <p className="m-0 text-[#68686F] text-xs font-medium mt-1">
        Today Rewards
      </p>
    </div>
  );
};

export default TodayRewards;
