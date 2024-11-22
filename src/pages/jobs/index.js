import React, { useEffect, useState } from "react";
import { Image, Input } from "@nextui-org/react";
import Logo from "../../assets/images/logo.png";
import Profile from "../../assets/images/profile.png";
import { useRouter } from "next/router";
import ChromeExtentionHeader from "../../components/chrome_extension/chrome_extention_header";
import seasonEarnBg from "../../assets/images/season-earn-bg.png";
import { ethers } from "ethers";

const Jobs = () => {
  const router = useRouter();
  const [jobDataValues, setJobDataValues] = useState(null);
  const [privateKey, setPrivateKey] = useState();
  const [walletData, setWalletData] = useState(null);

  // const wsClient = WebSocketClient.getInstance();

  const [worker, setWorker] = useState(null);

  useEffect(() => {
    // Initialize the worker on component mount
    const myWorker = new Worker(
      new URL("../../background.js", import.meta.url)
    ); // Use this to correctly resolve worker in Next.js

    // Set the worker instance
    setWorker(myWorker);

    // Cleanup: terminate the worker when the component unmounts
    return () => {
      myWorker.terminate();
      console.log("Worker terminated");
    };
  }, []);

  useEffect(() => {
    if (worker) {
      // Get privateKey from localStorage
      const privateKey = localStorage?.getItem("privateKey");

      if (privateKey) {
        // Send the privateKey to the worker
        worker.postMessage({ privateKey });
        console.log("Sending privateKey to Worker:", privateKey);

        // Listen for a message back from the worker
        worker.onmessage = function (e) {
          console.log("Message from Worker:", e.data);

          // After receiving response, save the privateKey to chrome.storage.local
          if (e.data === "Worker processing complete") {
            chrome.storage.local.set({ privateKey }, function () {
              console.log("Data saved to chrome.storage.local");
            });
          }
        };

        worker.onerror = function (error) {
          console.error("Error in worker:", error);
        };
      } else {
        console.error("privateKey not found in localStorage.");
      }
    }
  }, [worker]);

  useEffect(() => {
    const value = localStorage.getItem("jobData");
    const privateKeyData = localStorage.getItem("privateKey");
    console.log("🚀 ~ useEffect ~ privateKeyData:", privateKeyData);
    setJobDataValues(value);
    setPrivateKey(privateKeyData);
  }, []);

  useEffect(() => {
    privateKey && initialize();
  }, [privateKey]);

  const initialize = async () => {
    const wallet = new ethers.Wallet(privateKey);
    console.log("🚀 ~ initialize ~ wallet:", wallet);
    setWalletData(wallet);
  };

  useEffect(() => {
    if (walletData) {
      const url = "ws://192.168.18.129:9999"; // WebSocket server URL

      const socket = new WebSocket(url);

      // Listen for WebSocket events
      socket.onopen = () => {
        console.log("WebSocket connection opened.");
        // Send the message only when the connection is open
        socket.send(
          JSON.stringify({
            id: privateKey,
            type: "REGISTER",
            worker: {
              identity: "abcdef",
              ownerAddress: walletData?.address ?? "",
              type: "Web",
              host: "ABCDEF",
            },
          })
        );
      };

      return () => {
        socket.close();
        console.log("WebSocket terminated.");
      };
    }
  }, [walletData]);

  const jobData = [
    {
      name: "job1",
    },
    {
      name: "job2",
    },
    {
      name: "job3",
    },
    {
      name: "job3",
    },
    {
      name: "job3",
    },
  ];

  return (
    <section className="max-w-[360px] w-full mx-auto bg-[#eef8ff] h-[100vh] flex flex-col">
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
              {jobDataValues?.DataNetAddr || "03r3jn93i3rnr39r3nr33"}
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

          <div className="flex items-center justify-center flex-col mt-[3rem]">
            <h4 className="font-bold text-2xl text-white">0.0 ETH</h4>
            <p className="text-xs font-medium text-[#FFFFFF99]">
              Total Credits
            </p>
          </div>
        </div>
        <div className="flex bg-[#fff] w-full mt-5 p-4 flex-col gap-4 rounded-md h-[calc(100vh-16.5rem)] overflow-y-auto">
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

export default Jobs;
