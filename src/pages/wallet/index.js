import React, { useEffect, useState } from "react";
import ChromeExtentionPage from "../../components/chrome_extension/chrome_extention_page";
import { Image, Input } from "@nextui-org/react";
import Logo from "../../assets/images/logo.png";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Wallet = () => {
  const router = useRouter();

  const [privateKeyValue, setPrivateKeyValue] = useState("");

  const handlewalletButton = () => {
    if (!privateKeyValue) toast?.error("please Enter the private Key");
    else {
      localStorage?.setItem("privateKey", privateKeyValue);
      if (
        typeof chrome !== "undefined" &&
        chrome.storage &&
        chrome.storage.local
      ) {
        chrome.storage.local.set({ privateKey: privateKeyValue }, () => {
          if (chrome.runtime.lastError) {
            console.error(
              "Error saving to chrome storage:",
              chrome.runtime.lastError
            );
            toast?.error("Failed to save the private key.");
          } else {
            console.log("Data saved in chrome storage.");
            toast?.success("Private key saved successfully.");
          }
        });
      } else {
        console.warn("Chrome storage API is not available.");
      }
    }
    // setTimeout(() => router?.push("/jobs"), 3000);
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
          // label="DataNet Name"
          placeholder="Enter Private key"
          name="name"
          labelPlacement="outside"
          value={privateKeyValue}
          onChange={(e) => setPrivateKeyValue(e.target.value)}
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

export default Wallet;
