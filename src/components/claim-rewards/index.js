import { claimReward } from "@/utils/base-methods";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import trophy from "../../assets/images/trophy.png";
import TimeCounter from "../time-counter";

const ClaimRewards = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadingcanClaim, setLoadingcanClaim] = useState(false);
  const [canClaim, setCanClaim] = useState(true);
  const [time, setTime] = useState();
  const [nextDayTime, setnextDayTime] = useState();

  useEffect(() => {
    const checkClaimStatus = async () => {
      const storedDate = localStorage?.getItem("claimDateTime");
      const storedDateObj = new Date(storedDate);
      const currentDate = new Date();
      setTime(storedDateObj);

      const isNextDay =
        storedDateObj.getFullYear() !== currentDate.getFullYear() ||
        storedDateObj.getMonth() !== currentDate.getMonth() ||
        storedDateObj.getDate() !== currentDate.getDate();

      setCanClaim(isNextDay);

      const nextDayRemainingTime = localStorage?.getItem("nextdayRemTime");
      const nextDayRemainingTimeObj = new Date(nextDayRemainingTime);

      setnextDayTime(nextDayRemainingTimeObj);
    };

    checkClaimStatus();
  }, []);

  const handleClaim = async () => {
    try {
      setLoadingcanClaim(true);
      const currentDateTime = new Date().toISOString();

      localStorage?.setItem("claimDateTime", currentDateTime);

      const now = new Date();
      const nextDay = new Date(now);
      nextDay.setDate(now.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0);

      const nextDayRemainingTime = nextDay.toISOString();

      localStorage?.setItem("nextdayRemTime", nextDayRemainingTime);
      setnextDayTime(nextDayRemainingTime);

      const rewardResponse = await claimReward();
      console.log("🚀 ~ handleClaim ~ rewardResponse:", rewardResponse);

      setCanClaim(false);
      setLoadingcanClaim(false);
      setIsModalVisible(true);
    } catch (error) {
      // console.error('Error storing claim date and time:', error);
      setCanClaim(true);
      setLoadingcanClaim(false);
      showToast(error.message, "error");
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <div>
          <Image
            alt="logo"
            src={trophy.src}
            className="h-8 w-8 object-contain"
          />
        </div>
        <div>
          <p>Daily Treasure Claim</p>
          <div>
            {canClaim ? (
              <p>Claim your daily rewards</p>
            ) : (
              <div>
                <TimeCounter targetDate={nextDayTime} />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleClaim}
          disabled={!canClaim}
          type="button"
          className={`flex justify-center items-center gap-4 rounded-full px-[0.75rem] py-[0.5rem] text-base font-[400] border border-[#010101] dark:border-[#2E2E30] bg-[#010101] dark:bg-[#161618] text-[#fff] dark:text-white md:ml-4 lg:ml-6`}
        >
          {canClaim ? "Claim" : loadingcanClaim ? "Loading.." : "Claimed"}
        </button>
      </div>
    </>
  );
};

export default ClaimRewards;
