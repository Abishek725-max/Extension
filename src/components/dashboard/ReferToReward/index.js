import React from "react";
import ReferImage from "../../../assets/images/refer-image.png";
import { Image } from "@nextui-org/react";

const ReferToReward = () => {
  return (
    <div className="bg-refer-card-gradient px-4 py-3 rounded-lg flex flex-col gap-6  w-full md:w-[48.5%] lg:w-[48.75%] xxl:w-full">
      <div className="refer-image">
        <Image
          src={ReferImage.src}
          alt="referImage"
          classNames={{ wrapper: "!max-w-60 mx-auto" }}
          className="w-full h-auto"
        />
      </div>
      <button
        type="button"
        className="flex w-fit mx-auto justify-center items-center gap-1 rounded-lg bg-[#356FF5] border border-[#356FF5] px-3 py-2 text-xs font-medium text-white"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.801 3.5H8.80102C8.60211 3.5 8.41135 3.57902 8.2707 3.71967C8.13004 3.86032 8.05102 4.05109 8.05102 4.25V8H4.30103C4.10211 8 3.91135 8.07902 3.7707 8.21967C3.63004 8.36032 3.55103 8.55109 3.55103 8.75V20.75C3.55103 20.9489 3.63004 21.1397 3.7707 21.2803C3.91135 21.421 4.10211 21.5 4.30103 21.5H16.301C16.4999 21.5 16.6907 21.421 16.8314 21.2803C16.972 21.1397 17.051 20.9489 17.051 20.75V17H20.801C20.9999 17 21.1907 16.921 21.3314 16.7803C21.472 16.6397 21.551 16.4489 21.551 16.25V4.25C21.551 4.05109 21.472 3.86032 21.3314 3.71967C21.1907 3.57902 20.9999 3.5 20.801 3.5ZM15.551 20H5.05103V9.5H15.551V20ZM20.051 15.5H17.051V8.75C17.051 8.55109 16.972 8.36032 16.8314 8.21967C16.6907 8.07902 16.4999 8 16.301 8H9.55102V5H20.051V15.5Z"
            fill="white"
          />
        </svg>
        Copy Referral link
      </button>
    </div>
  );
};

export default ReferToReward;
