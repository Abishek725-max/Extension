import Collector from "../../components/dashboard/Collector";
import Network from "../../components/Network";
import ReferToReward from "../../components/dashboard/ReferToReward";

import SeasonEarnings from "./SeasonEarnings";
import PointsStatistics from "./PointsStatistics ";
import DataNetTabs from "../DataNet";
import useWindowUtils from "../../utils/useWindowUtils";

export default function Dashboard() {
  const { screenWidth } = useWindowUtils();
  return (
    <>
      {/* <Header /> */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-12 xxl:col-span-9">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-5">
              <SeasonEarnings />
            </div>
            <div className="col-span-12 md:col-span-7">
              <PointsStatistics />
            </div>
          </div>
          <div className="mt-4">{screenWidth > 1399 && <DataNetTabs />}</div>
        </div>
        <div className="col-span-12 lg:col-span-12 xxl:col-span-3">
          <div className="flex xxl:flex-col flex-row gap-5 flex-wrap">
            <Collector />
            <ReferToReward />
            <div className="bg-card-gradient dark:bg-dark-card-gradient rounded-lg p-4 border border-[#E7E7E9] dark:border-[#3E3E3E] flex flex-col gap-3 w-full">
              <h2 className="m-0 text-base font-medium text-[#343437] dark:text-white">
                Devices
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 xxl:grid-cols-1 gap-3">
                <Network />
                <Network />
                <Network />
                <Network />
              </div>
            </div>
          </div>
        </div>
        {screenWidth < 1400 && (
          <div className="col-span-12">
            <DataNetTabs />
          </div>
        )}
      </div>
    </>
  );
}
