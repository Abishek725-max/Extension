import React from "react";
import Card1 from "../../../assets/images/card-1.png";
import { Image } from "@nextui-org/react";
import { calculateTimeAgo, formatWalletAddress } from "../../../utils/common";

const DataNetsCard = ({ data }) => {
  return (
    <>
      <div className="bg-card-gradient dark:bg-dark-card-gradient cursor-pointer rounded-lg p-3 border border-[#E7E7E9] dark:border-[#3E3E3E] flex flex-col gap-2">
        <div className="card-image">
          <Image src={Card1.src} alt="netsImage" className="w-full h-auto" />
        </div>
        <div className="card-body flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="m-0 text-xl font-semibold text-[#0C0C0D] dark:text-white max-w-[calc(100%-3rem)] line-clamp-1">
                {data?.name}
              </h2>
              <div className="flex items-center gap-1">
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  className="w-4 h-4 fill-[#4F5054] dark:fill-white"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.7771 10.8637V13.125C12.7771 13.241 12.731 13.3523 12.649 13.4344C12.5669 13.5164 12.4556 13.5625 12.3396 13.5625C12.2236 13.5625 12.1123 13.5164 12.0302 13.4344C11.9482 13.3523 11.9021 13.241 11.9021 13.125V10.8637C11.9001 10.3021 11.7825 9.74699 11.5567 9.23283C11.3309 8.71867 11.0017 8.25647 10.5896 7.875V11.066C10.5895 11.1602 10.5591 11.2518 10.5028 11.3272C10.4465 11.4027 10.3673 11.458 10.2771 11.4849C10.1869 11.5118 10.0904 11.5089 10.002 11.4766C9.91352 11.4443 9.83787 11.3843 9.78624 11.3055L9.20218 10.4136C9.1978 10.407 9.19343 10.3999 9.1896 10.3928C9.10381 10.2413 8.96135 10.1301 8.79356 10.0836C8.62578 10.0372 8.44641 10.0593 8.29491 10.1451C8.14342 10.2309 8.03221 10.3733 7.98575 10.5411C7.93929 10.7089 7.96139 10.8883 8.04718 11.0398L9.25741 12.8877C9.32094 12.9848 9.34329 13.1031 9.31955 13.2167C9.29581 13.3303 9.22791 13.4298 9.13081 13.4933C9.03371 13.5568 8.91534 13.5792 8.80176 13.5555C8.68817 13.5317 8.58867 13.4638 8.52515 13.3667L7.3078 11.5073L7.29468 11.4866C7.10624 11.1636 7.04246 10.7829 7.11538 10.4162C7.1883 10.0495 7.39287 9.72211 7.69052 9.49582C7.98817 9.26954 8.35832 9.15999 8.73118 9.18781C9.10404 9.21564 9.45383 9.37892 9.7146 9.64687V3.5H8.8396C8.72357 3.5 8.61229 3.45391 8.53024 3.37186C8.44819 3.28981 8.4021 3.17853 8.4021 3.0625C8.4021 2.94647 8.44819 2.83519 8.53024 2.75314C8.61229 2.67109 8.72357 2.625 8.8396 2.625H9.7146C9.94666 2.625 10.1692 2.71719 10.3333 2.88128C10.4974 3.04538 10.5896 3.26794 10.5896 3.5V6.76047C11.2611 7.21424 11.8115 7.82533 12.1927 8.5405C12.574 9.25567 12.7746 10.0532 12.7771 10.8637ZM4.9021 3.0625C4.9021 2.94647 4.85601 2.83519 4.77396 2.75314C4.69191 2.67109 4.58063 2.625 4.4646 2.625H3.5896C3.35754 2.625 3.13498 2.71719 2.97088 2.88128C2.80679 3.04538 2.7146 3.26794 2.7146 3.5V10.9375C2.7146 11.0535 2.76069 11.1648 2.84274 11.2469C2.92479 11.3289 3.03607 11.375 3.1521 11.375C3.26813 11.375 3.37941 11.3289 3.46146 11.2469C3.54351 11.1648 3.5896 11.0535 3.5896 10.9375V3.5H4.4646C4.58063 3.5 4.69191 3.45391 4.77396 3.37186C4.85601 3.28981 4.9021 3.17853 4.9021 3.0625ZM8.71163 5.37797C8.671 5.33729 8.62275 5.30502 8.56964 5.28301C8.51652 5.26099 8.45959 5.24966 8.4021 5.24966C8.34461 5.24966 8.28767 5.26099 8.23456 5.28301C8.18145 5.30502 8.1332 5.33729 8.09257 5.37797L7.0896 6.38148V0.875C7.0896 0.758968 7.04351 0.647688 6.96146 0.565641C6.87941 0.483594 6.76813 0.4375 6.6521 0.4375C6.53607 0.4375 6.42479 0.483594 6.34274 0.565641C6.26069 0.647688 6.2146 0.758968 6.2146 0.875V6.38148L5.21163 5.37797C5.12954 5.29588 5.0182 5.24976 4.9021 5.24976C4.786 5.24976 4.67466 5.29588 4.59257 5.37797C4.51048 5.46006 4.46436 5.5714 4.46436 5.6875C4.46436 5.8036 4.51048 5.91494 4.59257 5.99703L6.34257 7.74703C6.3832 7.78771 6.43145 7.81998 6.48456 7.842C6.53767 7.86401 6.59461 7.87534 6.6521 7.87534C6.70959 7.87534 6.76652 7.86401 6.81964 7.842C6.87275 7.81998 6.921 7.78771 6.96163 7.74703L8.71163 5.99703C8.75231 5.9564 8.78458 5.90815 8.80659 5.85504C8.82861 5.80192 8.83994 5.74499 8.83994 5.6875C8.83994 5.63001 8.82861 5.57308 8.80659 5.51996C8.78458 5.46685 8.75231 5.4186 8.71163 5.37797Z" />
                </svg>
                <span className="text-sm text-[#4F5054] dark:text-white font-medium">
                  25
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="m-0 text-sm text-[#343437] dark:text-white font-[400]">
                {formatWalletAddress(data?.ownerAddress)}
              </p>
              <p className="m-0 text-sm text-[#68686F] dark:text-white font-[400]">
                Updated {calculateTimeAgo(data?.updatedAt)}
              </p>
            </div>
            <p className="m-0 text-xs text-[#68686F] dark:text-white font-[400]">
              1 File (<span className="uppercase">{data?.fileType}</span>) 345kb
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex w-full justify-center items-center gap-1 rounded-md flex-1 bg-[#356FF5] border border-[#356FF5] px-3 py-1 text-sm font-medium text-white"
            >
              View
            </button>
            <button
              type="button"
              className="flex w-full justify-center items-center gap-1 rounded-md flex-1 bg-white dark:bg-transparent border border-[#356FF5] px-3 py-1 text-sm font-medium text-[#356FF5]"
            >
              Stake
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataNetsCard;
