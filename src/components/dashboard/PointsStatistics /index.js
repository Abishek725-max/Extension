"use client"; // This tells Next.js that this is a Client Component

import React from "react";
import dayjs from "dayjs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Optional for styling
import {
  calculatePercentage,
  epochPointsWithHeight,
  latestEntry,
} from "./common";

const BarChart = ({ type, barValue, total }) => {
  return (
    <>
      {calculatePercentage(barValue, total) !== 0 ? (
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

const PointsStatistics = () => {
  return (
    <div className="statiticschart-card border border-[#E7E7E9] dark:border-[#3E3E3E] h-full">
      <div className="card-title">
        <h2 className="m-0 text-base font-medium text-[#343437] dark:text-white">
          Points Statistics
        </h2>
      </div>
      <div className="chart-box">
        {epochPointsWithHeight.map((items, index) => {
          return (
            <Tippy
              interactive={true}
              interactiveBorder={20}
              delay={100}
              content={
                <div className="tooltip-info-statitics">
                  <h6 className="date">
                    {dayjs(items.created).format("MMM D")}
                  </h6>
                  <ul>
                    <li>
                      <span>Network :</span> <span>{items.network}</span>
                    </li>
                    <li>
                      <span>Referral :</span> <span>{items.referral}</span>
                    </li>
                    <li>
                      <span>Space :</span> <span>{items.space}</span>
                    </li>
                    <li>
                      <span>Rank :</span> <span>{items.rank}</span>
                    </li>
                    <li>
                      <span>Total :</span> <span>{items.total}</span>
                    </li>
                  </ul>
                </div>
              }
              placement="right"
              key={`statitics_${index}`}
            >
              <div
                className={`chart-view ${
                  latestEntry.created === items.created ? "latest-chart" : ""
                }`}
                key={index}
              >
                <h6 className="txt-bx bg-[#1b1b1d] text-[#f2f3f9] dark:bg-white dark:text-[#161618]">
                  {items.total}
                </h6>

                <div
                  className="chart-card"
                  style={{
                    height: `${items.chartHeight}`,
                  }}
                >
                  <BarChart
                    type="network"
                    barValue={items.network}
                    total={items.total}
                  />
                  <BarChart
                    type="referral"
                    barValue={items.referral}
                    total={items.total}
                  />
                  <BarChart
                    type="space"
                    barValue={items.space}
                    total={items.total}
                  />
                  <BarChart
                    type="rank"
                    barValue={items.rank}
                    total={items.total}
                  />
                </div>
                <h6 className="date text-[#68686F] dark:text-[#9F9FA5]">
                  {dayjs(items.created).format("MMM D")}
                </h6>
              </div>
            </Tippy>
          );
        })}
      </div>
    </div>
  );
};

export default PointsStatistics;
