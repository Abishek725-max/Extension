import React from "react";
import NetworkGraph from "./NetworkGraph";

const Network = () => {

  return (
    <>
      <div className="green-border-gradient p-4 rounded-lg flex justify-between items-center">
        <div className="content-wrapper">
          <div className="flex">
            <h6 className="m-0 text-base text-[#343437] dark:text-white font-semibold">
              Worker Name
            </h6>
            <div className="icon relative top-[0.5rem] left-[0.5rem]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7594 5.73209L14.268 2.24146C14.1519 2.12536 14.0141 2.03326 13.8624 1.97042C13.7107 1.90759 13.5482 1.87524 13.384 1.87524C13.2198 1.87524 13.0572 1.90759 12.9056 1.97042C12.7539 2.03326 12.6161 2.12536 12.5 2.24146L2.86641 11.8751C2.74983 11.9907 2.65741 12.1284 2.59451 12.2801C2.5316 12.4318 2.49948 12.5944 2.50001 12.7587V16.2501C2.50001 16.5816 2.6317 16.8995 2.86612 17.1339C3.10054 17.3684 3.41849 17.5001 3.75001 17.5001H16.875C17.0408 17.5001 17.1997 17.4342 17.3169 17.317C17.4342 17.1998 17.5 17.0408 17.5 16.8751C17.5 16.7093 17.4342 16.5503 17.3169 16.4331C17.1997 16.3159 17.0408 16.2501 16.875 16.2501H9.00938L17.7594 7.50006C17.8755 7.38398 17.9676 7.24617 18.0304 7.09449C18.0933 6.94282 18.1256 6.78025 18.1256 6.61607C18.1256 6.45189 18.0933 6.28933 18.0304 6.13765C17.9676 5.98598 17.8755 5.84816 17.7594 5.73209ZM7.24141 16.2501H3.75001V12.7587L10.625 5.88365L14.1164 9.37506L7.24141 16.2501ZM15 8.49146L11.5094 5.00006L13.3844 3.12506L16.875 6.61646L15 8.49146Z"
                  fill="#68686F"
                />
              </svg>
            </div>
          </div>
          <p className="m-0 text-[#68686F] dark:text-[#9F9FA5] text-xs font-medium mt-1">
            Session-5hrs :6mins
          </p>
          <h4 className="m-0 text-2xl font-semibold uppercase text-[#0C0C0D] dark:text-white mt-3">
            125OPL
          </h4>
          <p className="m-0 text-[#68686F] dark:text-[#9F9FA5] text-xs font-medium mt-1">
            Today Rewards
          </p>
        </div>
        <div className="graph-wrapper flex flex-col items-center">
          <div className="relative w-[6.5rem]">
            <NetworkGraph percentage={75}/>
            <span className="font-semibold text-base text-[#0C0C0D] dark:text-white absolute inset-0 flex items-end justify-center">
              75%
            </span>
          </div>
          <p className="m-0 text-xs font-[400] text-[#68686F] dark:text-[#9F9FA5] text-center mt-2">
            Network Speed
          </p>
          <div className="flex items-center gap-2 px-2 py-1 mt-2 bg-[#FFFFFF33] dark:bg-[#2C2C3080] border border-[#B5B6BA] dark:border-[#2D2D31] rounded-2xl">
            <span className="text-[#343437] dark:text-white font-semibold text-xs">
              14.97.124.250
            </span>
            <div className="w-2 h-2 rounded-full bg-[#17C964]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Network;
