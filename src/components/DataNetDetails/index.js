import React from "react";
import CardImage from "../../assets/images/card-1.png";
import Profile from "../../assets/images/profile.png";
import { Image } from "@nextui-org/react";
import DetailsTable from "./DetailsTable";

const DataNetDetails = () => {
  return (
    <section className="md:mt-4">
      <div className="datanet-inner-container flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="w-24 h-24 sm:h-auto sm:w-full md:w-2/4 xl:w-80">
            <Image
              src={CardImage.src}
              alt="networkImage"
              className="w-full"
              classNames={{
                wrapper: "h-full md:h-unset",
                img: "object-cover h-full md:h-auto",
              }}
            />
          </div>
          <div className="flex flex-col xl:flex-row justify-between gap-3 sm:gap-4 flex-1">
            <div className="details-wrapper flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-10">
              <div className="flex items-center gap-6">
                <div className="net-id flex gap-3 items-center">
                  <div className="icon">
                    <Image
                      src={Profile.src}
                      alt="profileIcon"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <p className="m-0 text-sm text-[#356FF5] underline">
                    avbd........67fd6
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex w-full justify-center items-center gap-1 rounded-2xl bg-[#1DD2B8] border border-[#1DD2B8] px-3 py-2 text-xs font-xs text-white font-semibold"
                  >
                    Owner
                  </button>
                  <button
                    type="button"
                    className="flex w-full justify-center items-center gap-1 rounded-2xl bg-[#F629B1] border border-[#F629B1] px-3 py-2 text-xs font-xs text-white font-semibold"
                  >
                    Staker
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:gap-4">
                <h2 className="m-0 text-2xl text-[#0C0C0D] dark:text-white font-semibold">
                  An Ethereum Developer
                </h2>
                <div className="flex gap-1.5 sm:gap-2.5">
                  <p className="m-0 text-xs sm:text-sm text-[#68686F] dark:text-[#9F9FA5] whitespace-nowrap">
                    Created 03/10/24
                  </p>
                  <div className="w-px bg-[#E7E7E9] dark:bg-[#3E3E3E]"></div>
                  <div className="flex gap-1 items-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="fill-[#4F5054] dark:fill-[#9F9FA5]"
                        d="M12.6875 10.8637V13.125C12.6875 13.241 12.6414 13.3523 12.5594 13.4344C12.4773 13.5164 12.366 13.5625 12.25 13.5625C12.134 13.5625 12.0227 13.5164 11.9406 13.4344C11.8586 13.3523 11.8125 13.241 11.8125 13.125V10.8637C11.8105 10.3021 11.6929 9.74699 11.4671 9.23283C11.2413 8.71867 10.9121 8.25647 10.5 7.875V11.066C10.4999 11.1602 10.4695 11.2518 10.4132 11.3272C10.3569 11.4027 10.2777 11.458 10.1875 11.4849C10.0973 11.5118 10.0008 11.5089 9.91235 11.4766C9.82392 11.4443 9.74827 11.3843 9.69664 11.3055L9.11258 10.4136C9.1082 10.407 9.10383 10.3999 9.1 10.3928C9.01421 10.2413 8.87175 10.1301 8.70396 10.0836C8.53618 10.0372 8.35681 10.0593 8.20531 10.1451C8.05382 10.2309 7.94261 10.3733 7.89615 10.5411C7.84969 10.7089 7.87179 10.8883 7.95758 11.0398L9.16781 12.8877C9.23134 12.9848 9.25369 13.1031 9.22995 13.2167C9.20621 13.3303 9.13832 13.4298 9.04121 13.4933C8.94411 13.5568 8.82574 13.5792 8.71216 13.5555C8.59857 13.5317 8.49907 13.4638 8.43555 13.3667L7.2182 11.5073L7.20508 11.4866C7.01664 11.1636 6.95286 10.7829 7.02578 10.4162C7.0987 10.0495 7.30327 9.72211 7.60092 9.49582C7.89857 9.26954 8.26872 9.15999 8.64158 9.18781C9.01444 9.21564 9.36423 9.37892 9.625 9.64687V3.5H8.75C8.63397 3.5 8.52269 3.45391 8.44064 3.37186C8.35859 3.28981 8.3125 3.17853 8.3125 3.0625C8.3125 2.94647 8.35859 2.83519 8.44064 2.75314C8.52269 2.67109 8.63397 2.625 8.75 2.625H9.625C9.85706 2.625 10.0796 2.71719 10.2437 2.88128C10.4078 3.04538 10.5 3.26794 10.5 3.5V6.76047C11.1715 7.21424 11.7219 7.82533 12.1031 8.5405C12.4844 9.25567 12.685 10.0532 12.6875 10.8637ZM4.8125 3.0625C4.8125 2.94647 4.76641 2.83519 4.68436 2.75314C4.60231 2.67109 4.49103 2.625 4.375 2.625H3.5C3.26794 2.625 3.04538 2.71719 2.88128 2.88128C2.71719 3.04538 2.625 3.26794 2.625 3.5V10.9375C2.625 11.0535 2.67109 11.1648 2.75314 11.2469C2.83519 11.3289 2.94647 11.375 3.0625 11.375C3.17853 11.375 3.28981 11.3289 3.37186 11.2469C3.45391 11.1648 3.5 11.0535 3.5 10.9375V3.5H4.375C4.49103 3.5 4.60231 3.45391 4.68436 3.37186C4.76641 3.28981 4.8125 3.17853 4.8125 3.0625ZM8.62203 5.37797C8.5814 5.33729 8.53315 5.30502 8.48004 5.28301C8.42692 5.26099 8.36999 5.24966 8.3125 5.24966C8.25501 5.24966 8.19808 5.26099 8.14496 5.28301C8.09185 5.30502 8.0436 5.33729 8.00297 5.37797L7 6.38148V0.875C7 0.758968 6.95391 0.647688 6.87186 0.565641C6.78981 0.483594 6.67853 0.4375 6.5625 0.4375C6.44647 0.4375 6.33519 0.483594 6.25314 0.565641C6.17109 0.647688 6.125 0.758968 6.125 0.875V6.38148L5.12203 5.37797C5.03994 5.29588 4.9286 5.24976 4.8125 5.24976C4.6964 5.24976 4.58506 5.29588 4.50297 5.37797C4.42088 5.46006 4.37476 5.5714 4.37476 5.6875C4.37476 5.8036 4.42088 5.91494 4.50297 5.99703L6.25297 7.74703C6.2936 7.78771 6.34185 7.81998 6.39496 7.842C6.44808 7.86401 6.50501 7.87534 6.5625 7.87534C6.61999 7.87534 6.67692 7.86401 6.73004 7.842C6.78315 7.81998 6.8314 7.78771 6.87203 7.74703L8.62203 5.99703C8.66271 5.9564 8.69498 5.90815 8.717 5.85504C8.73901 5.80192 8.75034 5.74499 8.75034 5.6875C8.75034 5.63001 8.73901 5.57308 8.717 5.51996C8.69498 5.46685 8.66271 5.4186 8.62203 5.37797Z"
                        fill="#4F5054"
                      />
                    </svg>
                    <p className="m-0 text-xs sm:text-sm text-[#68686F] dark:text-[#9F9FA5] whitespace-nowrap">
                      25 Staked
                    </p>
                  </div>
                  <div className="w-px bg-[#E7E7E9] dark:bg-[#3E3E3E]"></div>
                  <p className="m-0 text-xs sm:text-sm text-[#68686F] dark:text-[#9F9FA5] whitespace-nowrap">
                    234 Downloads
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-10">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-3 sm:items-center">
                <p className="m-0 text-[#68686F] dark:text-[#9F9FA5] text-xs">
                  1 File (CSV) 345kb
                </p>
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    className="flex justify-center items-center gap-1 rounded-lg bg-[#356FF5] border border-[#356FF5] px-5 py-[0.375rem] text-xs font-medium text-[#E7EEFD]"
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center gap-1 rounded-lg bg-transparent border border-[#9B9CA1] px-5 py-[0.375rem] text-xs font-medium text-[#9B9CA1]"
                  >
                    Staked
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:max-w-80">
                <h5 className="m-0 text-black dark:text-white text-base font-semibold">
                  Tags
                </h5>
                <div className="flex flex-wrap gap-3">
                  <div className="tag-items py-1 px-4 rounded-3xl bg-[#E7E7E9] dark:bg-[2E2E30]">
                    <p className="m-0 text-[#68686F] dark:text-[#9F9FA5] text-sm">
                      Ethereum
                    </p>
                  </div>
                  <div className="tag-items py-1 px-4 rounded-3xl bg-[#E7E7E9] dark:bg-[2E2E30]">
                    <p className="m-0 text-[#68686F] dark:text-[#9F9FA5] text-sm">
                      Crypto
                    </p>
                  </div>
                  <div className="tag-items py-1 px-4 rounded-3xl bg-[#E7E7E9] dark:bg-[2E2E30]">
                    <p className="m-0 text-[#68686F] dark:text-[#9F9FA5] text-sm">
                      Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5">
          <div className="bg-card-gradient dark:bg-dark-card-gradient rounded-xl py-3 px-4 border border-[#E7E7E9] dark:border-[#3E3E3E] col-span-12 md:col-span-7 lg:col-span-8 xxl:col-span-9 order-2 md:order-1">
            <h2 className="m-0 text-block dark:text-white text-base font-semibold">
              Owner&apos;s Prompt
            </h2>
            <p className="m-0 mt-4 text-[#343437] dark:text-white text-base">
              Imagine you are an experienced Ethereum developer tasked with
              creating a smart contract for a blockchain messenger. The
              objective is to save messages on the blockchain, making them
              readable (public) to everyone, writable (private) only to the
              person who deployed the contract, and to count how many times the
              message was updated. Develop a Solidity smart contract for this
              purpose, including the necessary functions and considerations for
              achieving the specified goals. Please provide the code and any
              relevant explanations to ensure a clear understanding of the
              implementation.
            </p>
          </div>
          <div className="flex flex-wrap md:flex-col gap-5 col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-3 order-1 md:order-2">
            <div className="bg-card-gradient dark:bg-dark-card-gradient rounded-xl py-3 px-4 border border-[#E7E7E9] dark:border-[#3E3E3E]">
              <p className="m-0 text-sm font-semibold text-[#68686F] dark:text-[#9F9FA5]">
                Total Staked Values
              </p>
              <h2 className="m-0 mt-2 text-[#343437] dark:text-white text-xl font-semibold">
                2348 OPL
              </h2>
            </div>
            <div className="bg-card-gradient dark:bg-dark-card-gradient rounded-xl py-3 px-4 border border-[#E7E7E9] dark:border-[#3E3E3E]">
              <p className="m-0 text-sm font-semibold text-[#68686F] dark:text-[#9F9FA5]">
                Your Staked Values
              </p>
              <h2 className="m-0 mt-2 text-[#343437] dark:text-white text-xl font-semibold">
                348 OPL
              </h2>
            </div>
          </div>
        </div>
        <DetailsTable />
      </div>
    </section>
  );
};

export default DataNetDetails;
