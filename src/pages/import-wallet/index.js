import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";

import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { ethers } from "ethers";
import { generateToken } from "@/utils/base-methods";
import { v4 as uuidv4 } from "uuid";
import { validatePrivateKey } from "@/utils/common";
// import { WebSocketClient } from "@/utils/WebSocketClient";

const ImportWallet = () => {
  // const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
  const router = useRouter();
  // const wsClient = WebSocketClient.getInstance();

  const [privateKeyValue, setPrivateKeyValue] = useState();

  const handlewalletButton = async () => {
    if (!privateKeyValue) {
      toast.error("Please enter a private key");
      return;
    }

    if (!validatePrivateKey(privateKeyValue)) {
      toast.error(
        "Invalid private key format. Ensure it is 64 hex characters."
      );

      return;
    }
    localStorage.setItem("privateKey", privateKeyValue);
    router?.push("/home");
    // initialize();
  };

  const initialize = async () => {
    try {
      const wallet = new ethers.Wallet(privateKeyValue);
      const wsService = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
      wsService.onopen = () => {
        console.log("WebSocket is connected. in Wallet");
        wsService?.send(
          JSON.stringify({
            workerID: "extension",
            msgType: "REGISTER",
            message: {
              id: uuidv4(),
              type: "REGISTER",
              worker: {
                host: "extension",
                identity: "Extension",
                ownerAddress: wallet?.address ?? "",
                type: "Web",
              },
            },
          })
        );
      };

      wsService.onmessage = (value) => {
        console.log("Received job message:", JSON?.parse(value?.data));
        let message = JSON?.parse(value?.data);
        if (message?.status === false) {
          router?.push(`/register-failed?reason=${message?.message}`);
        } else if (message?.status === true) {
          const authToken = localStorage?.getItem("auth_token");
          if (!authToken) {
            handleGenerateToken(wallet?.address);
          }
        }
      };
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleGenerateToken = async (address) => {
    try {
      const tokenData = await generateToken(address);
      localStorage.setItem("auth_token", tokenData.data.token);
      router?.push("/home");
    } catch (error) {
      console.error("Failed to generate token", error);
    }
  };

  return (
    <section className="max-w-[360px] gap-3 w-full mx-auto bg-[#eef8ff] h-[100vh] flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 text-center">
        <h4 className="font-bold text-xl text-[#3b3b3d] m-0">
          Setup Your Wallet
        </h4>
        <p className="m-0 text-sm font-medium text-black text-center">
          Enter your private Key to get Started
        </p>
      </div>

      <div className="w-full p-2 bg-[#fff">
        <Input
          isRequired
          type="text"
          id="wallet-text"
          // label="DataNet Name"
          placeholder="Enter Private key"
          name="name"
          labelPlacement="outside"
          value={privateKeyValue}
          onChange={(e) => {
            setPrivateKeyValue(e.target.value);
          }}
          classNames={{
            label:
              "block text-sm font-medium text-[#68686F] dark:text-[#9F9FA5] group-data-[filled-within=true]:text-[#68686F] group-data-[filled-within=true]:dark:text-[#9F9FA5] mb-2",
            inputWrapper:
              "block bg-white data-[hover=true]:bg-white group-data-[focus=true]:bg-white shadow-none w-full px-3 py-2 border border-[#E7E7E9] dark:border-[#3E3E3E] h-12 data-[hover=true]:border-[#E7E7E9] data-[hover=true]:dark:border-[#3E3E3E] group-data-[focus=true]:border-[#E7E7E9] group-data-[focus=true]:dark:border-[#3E3E3E] rounded-xl focus:outline-none",
            input:
              "text-base font-medium text-[#000] dark:text-white placeholder-[#9B9CA1]",
          }}
        />
      </div>

      <button
        type="button"
        onClick={handlewalletButton}
        className={`flex justify-center items-center gap-4 rounded-full px-[0.75rem] py-[0.5rem] text-base font-[400] border border-[#010101] dark:border-[#2E2E30] bg-[#010101] dark:bg-[#161618] text-[#fff] dark:text-white md:ml-4 lg:ml-6`}
      >
        Set Up Wallet
      </button>
    </section>
  );
};

export default ImportWallet;
