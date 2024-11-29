"use client"; // This tells Next.js that this is a Client Component

import React from "react";
import dayjs from "dayjs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Optional for styling
import {
  calculatePercentage,
  epochPointsWithHeight,
  latestEntry,
  maxTotal,
} from "./common";

const BarChart = ({ type, barValue, total }) => {
  return (
    <>
      {barValue !== undefined &&
      total !== undefined &&
      calculatePercentage(barValue, total) !== 0 ? (
        <div
          className={`point-bx ${type}point-box`}
          style={{
            height: `${calculatePercentage(barValue, total)}rem`,
          }}
        ></div>
      ) : (
        ""
      )}
    </>
  );
};

const PointsStatistics = ({ data = [] }) => {
  // if (!data) {
  //   return;
  // }

  const getMaxTotal = maxTotal(data);
  const pointsHeight = epochPointsWithHeight(data, getMaxTotal);
  const getLatestEntry = latestEntry(data);

  return (
    <div className="statiticschart-card mt-4 rounded-lg bg-white border border-[#E7E7E9] dark:border-[#3E3E3E] h-full">
      <div className="card-title p-4">
        <h2 className="m-0 text-base font-medium text-[#343437] dark:text-white">
          Points Statistics
        </h2>
      </div>
      {pointsHeight?.length > 0 ? (
        <div className="chart-box">
          {pointsHeight.map((items, index) => {
            return (
              <Tippy
                interactive={true}
                interactiveBorder={20}
                delay={100}
                content={
                  <div className="tooltip-info-statitics">
                    <h6 className="date">
                      {dayjs(items.date).format("MMM D")}
                    </h6>
                    <ul>
                      <li>
                        <span>Heart Beat :</span>{" "}
                        <span>
                          {items?.details?.heartbeat
                            ? items?.details?.heartbeat
                            : 0}
                        </span>
                      </li>
                      <li>
                        <span>Referral :</span>{" "}
                        <span>
                          {items?.details?.referral
                            ? items?.details?.referral
                            : 0}
                        </span>
                      </li>
                      <li>
                        <span>Total :</span> <span>{items?.points}</span>
                      </li>
                    </ul>
                  </div>
                }
                placement="right"
                key={`statitics_${index}`}
              >
                <div
                  className={`chart-view ${
                    getLatestEntry.date === items.date ? "latest-chart" : ""
                  }
                    `}
                  key={index}
                >
                  <h6 className="txt-bx bg-[#1b1b1d] text-[#f2f3f9] dark:bg-white dark:text-[#161618]">
                    {items?.points}
                  </h6>

                  <div
                    className="chart-card"
                    style={{
                      height: `${items.chartHeight}`,
                    }}
                  >
                    <BarChart
                      type="heartbest"
                      barValue={items?.details?.heartbeat}
                      total={items?.points}
                    />
                    <BarChart
                      type="referral"
                      barValue={items?.details?.referral}
                      total={items?.points}
                    />
                  </div>
                  <h6 className="date text-[#68686F] dark:text-[#9F9FA5]">
                    {dayjs(items.date).format("MMM D")}
                  </h6>
                </div>
              </Tippy>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center p-4 h-full w-full">
          <p className="m-0 text-black dark:text-white text-base font-medium">
            Points not available
          </p>
        </div>
      )}
    </div>
  );
};

export default PointsStatistics;
