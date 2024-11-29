import React, { useEffect, useState } from "react";
import { Image, Input } from "@nextui-org/react";
import Logo from "../../assets/images/logo.png";
import Profile from "../../assets/images/profile.png";
import trophy from "../../assets/images/trophy.png";
import { useRouter } from "next/router";
import ChromeExtentionHeader from "../../components/chrome_extension/chrome_extention_header";
import seasonEarnBg from "../../assets/images/season-earn-bg.png";
import { ethers } from "ethers";
import {
  getRewardsHistory,
  getRewardsRealTime,
  getRewardsTotal,
} from "@/utils/base-methods";
import PointsStatistics from "@/components/dashboard/PointsStatistics ";
import { formatNumber, truncateAddress } from "@/utils/common";

const Home = () => {
  const router = useRouter();
  const [jobDataValues, setJobDataValues] = useState(null);
  const [privateKey, setPrivateKey] = useState();
  const [walletData, setWalletData] = useState(null);

  // const wsClient = WebSocketClient.getInstance();

  const [worker, setWorker] = useState(null);

  useEffect(() => {
    getJobsValue();
    getPrivateKeyValue();
  }, []);

  const getJobsValue = async () => {
    // const result = await getDataWithId("jobData");
    const result = localStorage?.getItem("jobData");
    setJobDataValues(result);
    console.log("Jobs Result:", result);
  };

  const getPrivateKeyValue = async () => {
    // const result = await getDataWithId("privateKey");
    const result = localStorage?.getItem("privateKey");
    setPrivateKey(result);
  };

  useEffect(() => {
    privateKey && initialize();
  }, [privateKey]);

  const initialize = async () => {
    const wallet = new ethers.Wallet(privateKey);
    setWalletData(wallet);
  };

  const jobData = [
    {
      name: "job1",
    },
  ];

  const [data, setData] = useState(null);
  const [rewardsHistoryData, setRewardsHistoryData] = useState([]);
  const [rewardsRealtimeData, setRewardsRealtimeData] = useState([]);
  const [rewardsTotal, setRewardsTotal] = useState([]);

  // React useEffect in your app

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("SOCKETJOBDATA", event);

      if (message.type === "job_data") {
        setData(message.message);
      }
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    window.postMessage(
      { type: "send_privatekey", value: localStorage?.getItem("privateKey") },
      "*"
    );

    window.addEventListener("message", (event) => {
      console.log("Received data in content script: webpage", event);
      if (
        event.source === window &&
        event.data &&
        event.data.type === "SEND_DATA"
      ) {
        console.log(
          "Received data in content script: webpage",
          event.data.payload
        );
      }
    });
  }, []);

  useEffect(() => {
    handleGetRewardsHistory();
    handleGetRewardRealtime();
  }, []);

  const handleGetRewardsHistory = async () => {
    try {
      const response = await getRewardsHistory();
      if (response) {
        const {
          data: { data },
        } = response;
        setRewardsHistoryData(data);
      }
    } catch (error) {
      console.log("🚀 ~ handleGetRewardsHistory ~ error:", error);
    }
  };

  const handleGetRewardRealtime = async () => {
    try {
      const response = await getRewardsRealTime();
      if (response) {
        setRewardsRealtimeData(response.data);
        await handleGetRewardTotal(response.data.total_heartbeats);
      }
    } catch (error) {
      console.log("🚀 ~ handleGetRewardRealtime ~ error:", error);
    }
  };
  const handleGetRewardTotal = async (realtimeRewardVal) => {
    try {
      const response = await getRewardsTotal();
      console.log("🚀 ~ handleGetRewardTotal ~ response:", response);

      const rewardTotalValue = response.data.agg_points + realtimeRewardVal;
      if (response) {
        setRewardsTotal(rewardTotalValue);
      }
    } catch (error) {
      console.log("🚀 ~ handleGetRewardRealtime ~ error:", error);
    }
  };

  // Function to get the jobData from chrome storage

  return (
    <section className="max-w-[360px] w-full mx-auto bg-[#eef8ff] min-h-[100vh] flex flex-col">
      <ChromeExtentionHeader />

      <div className="flex p-4 flex-col">
        <div className="flex w-full flex-col relative z-[1] p-4">
          <div className="absolute z-[-1] inset-0">
            <Image
              src={seasonEarnBg.src}
              alt="seasonEarnBg"
              classNames={{ wrapper: "w-full h-full !max-w-full rounded-xl" }}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-end items-center gap-2">
            <p className="ml-auto text-xs font-medium text-white">
              {truncateAddress(walletData?.address, 20)}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fff"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between mt-[3rem]">
            <div className="flex flex-col gap-1.5">
              <h4 className="font-bold text-2xl text-white">
                {" "}
                {rewardsTotal ? rewardsTotal : 0} PTS {/* */}
              </h4>
              <p className="text-xs font-medium text-[#FFFFFF99]">
                Total Credits
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <h4 className="font-bold text-2xl text-white text-right">
                {rewardsTotal ? formatNumber(rewardsTotal) : 0} PTS {/* */}
              </h4>
              <p className="text-xs font-medium text-[#FFFFFF99] text-right">
                Total Epoch Points
              </p>
            </div>
          </div>
        </div>
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
            <p>
              Next Claim in: <span>8h 20m 48s</span>
            </p>
          </div>
          <button
            type="button"
            className={`flex justify-center items-center gap-4 rounded-full px-[0.75rem] py-[0.5rem] text-base font-[400] border border-[#010101] dark:border-[#2E2E30] bg-[#010101] dark:bg-[#161618] text-[#fff] dark:text-white md:ml-4 lg:ml-6`}
          >
            Claim Wallet
          </button>
        </div>
        <PointsStatistics data={rewardsHistoryData || []} />

        <div className="flex bg-[#fff] w-full mt-5 p-4 flex-col gap-4 rounded-md overflow-y-auto">
          <h4 className="text-lg font-bold text-black">
            Received All Job Data
          </h4>
          {jobData?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {jobData?.map((items, index) => (
                <>
                  {" "}
                  <div className="flex items-center border border-[#eaeaea] rounded-lg p-2 gap-2">
                    <Image
                      alt="logo"
                      src={Profile.src}
                      className="h-8 w-8 object-contain"
                    />
                    <div className="flex flex-col flex-1 gap-2">
                      <h4 className="font-bold text-sm text-black">datanet1</h4>
                      <p className="text-xs font-medium text-black">
                        Synthetic Data Generation
                      </p>
                    </div>
                    <p className="ml-auto text-xs font-medium text-[#deab56] bg-[#fcecd0] rounded-[20px] px-2 py-1">
                      Pending
                    </p>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <>
              <h2 className="mt-2 mb-0 text-lg text-center">No data found</h2>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
