import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import useWindowUtils from "@/utils/useWindowUtils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const DetailsTable = () => {
  const { screenWidth } = useWindowUtils();

  const data = [
    {
      date: "2016-03-10",
      open: "11.2",
      high: "11.85",
      low: "11.07",
      volume: "4",
    },
    {
      date: "2016-03-10",
      open: "11.2",
      high: "11.85",
      low: "11.07",
      volume: "4",
    },
    {
      date: "2016-03-10",
      open: "11.2",
      high: "11.85",
      low: "11.07",
      volume: "4",
    },
    {
      date: "2016-03-10",
      open: "11.2",
      high: "11.85",
      low: "11.07",
      volume: "4",
    },
    {
      date: "2016-03-10",
      open: "11.2",
      high: "11.85",
      low: "11.07",
      volume: "4",
    },
    {
      date: "2016-03-10",
      open: "11.2",
      high: "11.85",
      low: "11.07",
      volume: "4",
    },
    {
      date: "2016-03-10",
      open: "11.2",
      high: "11.85",
      low: "11.07",
      volume: "4",
    },
  ];

  const contributersData = [
    {
      address: "0x742.....4438f44",
      node_id: "OPLN001",
      type: "Seed data",
      task_assigned: "OPT001",
      validated_at: "Item",
      rewarded: "360 OPL",
    },
    {
      address: "0x742.....4438f44",
      node_id: "OPLN001",
      type: "Seed data",
      task_assigned: "OPT001",
      validated_at: "Item",
      rewarded: "360 OPL",
    },
    {
      address: "0x742.....4438f44",
      node_id: "OPLN001",
      type: "Seed data",
      task_assigned: "OPT001",
      validated_at: "Item",
      rewarded: "360 OPL",
    },
    {
      address: "0x742.....4438f44",
      node_id: "OPLN001",
      type: "Seed data",
      task_assigned: "OPT001",
      validated_at: "Item",
      rewarded: "360 OPL",
    },
    {
      address: "0x742.....4438f44",
      node_id: "OPLN001",
      type: "Seed data",
      task_assigned: "OPT001",
      validated_at: "Item",
      rewarded: "360 OPL",
    },
    {
      address: "0x742.....4438f44",
      node_id: "OPLN001",
      type: "Seed data",
      task_assigned: "OPT001",
      validated_at: "Item",
      rewarded: "360 OPL",
    },
    {
      address: "0x742.....4438f44",
      node_id: "OPLN001",
      type: "Seed data",
      task_assigned: "OPT001",
      validated_at: "Item",
      rewarded: "360 OPL",
    },
    {
      address: "0x742.....4438f44",
      node_id: "OPLN001",
      type: "Seed data",
      task_assigned: "OPT001",
      validated_at: "Item",
      rewarded: "360 OPL",
    },
    {
      address: "0x742.....4438f44",
      node_id: "OPLN001",
      type: "Seed data",
      task_assigned: "OPT001",
      validated_at: "Item",
      rewarded: "360 OPL",
    },
  ];

  const stackersData = [
    {
      address: "0x742d35Cc6634C0532925a844Bc45e4438f44",
      staked_amount: "30K OPL",
    },
    {
      address: "0x742d35Cc6634C0532925a844Bc45e4438f44",
      staked_amount: "30K OPL",
    },
    {
      address: "0x742d35Cc6634C0532925a844Bc45e4438f44",
      staked_amount: "30K OPL",
    },
    {
      address: "0x742d35Cc6634C0532925a844Bc45e4438f44",
      staked_amount: "30K OPL",
    },
    {
      address: "0x742d35Cc6634C0532925a844Bc45e4438f44",
      staked_amount: "30K OPL",
    },
    {
      address: "0x742d35Cc6634C0532925a844Bc45e4438f44",
      staked_amount: "30K OPL",
    },
    {
      address: "0x742d35Cc6634C0532925a844Bc45e4438f44",
      staked_amount: "30K OPL",
    },
    {
      address: "0x742d35Cc6634C0532925a844Bc45e4438f44",
      staked_amount: "30K OPL",
    },
  ];

  return (
    <div className="flex w-full flex-col relative">
      {screenWidth < 767 && (
        <button
          type="button"
          className="hidden md:flex md:absolute md:top-[0rem] md:right-[0rem] justify-center items-center gap-2.5 rounded-lg bg-[#356FF5] border border-[#356FF5] px-3 py-[0.325rem] text-xs font-medium text-white"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 13.5001V19.5001C21 19.699 20.921 19.8898 20.7803 20.0304C20.6397 20.1711 20.4489 20.2501 20.25 20.2501H3.75C3.55109 20.2501 3.36032 20.1711 3.21967 20.0304C3.07902 19.8898 3 19.699 3 19.5001V13.5001C3 13.3012 3.07902 13.1104 3.21967 12.9698C3.36032 12.8291 3.55109 12.7501 3.75 12.7501C3.94891 12.7501 4.13968 12.8291 4.28033 12.9698C4.42098 13.1104 4.5 13.3012 4.5 13.5001V18.7501H19.5V13.5001C19.5 13.3012 19.579 13.1104 19.7197 12.9698C19.8603 12.8291 20.0511 12.7501 20.25 12.7501C20.4489 12.7501 20.6397 12.8291 20.7803 12.9698C20.921 13.1104 21 13.3012 21 13.5001ZM8.78063 7.28073L11.25 4.81041V13.5001C11.25 13.699 11.329 13.8898 11.4697 14.0304C11.6103 14.1711 11.8011 14.2501 12 14.2501C12.1989 14.2501 12.3897 14.1711 12.5303 14.0304C12.671 13.8898 12.75 13.699 12.75 13.5001V4.81041L15.2194 7.28073C15.3601 7.42146 15.551 7.50052 15.75 7.50052C15.949 7.50052 16.1399 7.42146 16.2806 7.28073C16.4214 7.14 16.5004 6.94912 16.5004 6.7501C16.5004 6.55108 16.4214 6.36021 16.2806 6.21948L12.5306 2.46948C12.461 2.39974 12.3783 2.34442 12.2872 2.30668C12.1962 2.26894 12.0986 2.24951 12 2.24951C11.9014 2.24951 11.8038 2.26894 11.7128 2.30668C11.6217 2.34442 11.539 2.39974 11.4694 2.46948L7.71937 6.21948C7.57864 6.36021 7.49958 6.55108 7.49958 6.7501C7.49958 6.94912 7.57864 7.14 7.71937 7.28073C7.86011 7.42146 8.05098 7.50052 8.25 7.50052C8.44902 7.50052 8.63989 7.42146 8.78063 7.28073Z"
              fill="#F9F9F9"
            />
          </svg>
          Upload Seed Data
        </button>
      )}
      {/* <h2 className="m-0 hidden md:block md:absolute md:top-[0.75rem] md:right-[0.75rem] text-xl font-semibold text-[#0C0C0D] dark:text-white">
          DataNets
        </h2> */}
      <button
        type="button"
        className="hidden md:flex md:absolute md:top-[0rem] md:right-[0rem] justify-center items-center gap-2.5 rounded-lg bg-[#356FF5] border border-[#356FF5] px-3 py-[0.325rem] text-xs font-medium text-white"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 13.5001V19.5001C21 19.699 20.921 19.8898 20.7803 20.0304C20.6397 20.1711 20.4489 20.2501 20.25 20.2501H3.75C3.55109 20.2501 3.36032 20.1711 3.21967 20.0304C3.07902 19.8898 3 19.699 3 19.5001V13.5001C3 13.3012 3.07902 13.1104 3.21967 12.9698C3.36032 12.8291 3.55109 12.7501 3.75 12.7501C3.94891 12.7501 4.13968 12.8291 4.28033 12.9698C4.42098 13.1104 4.5 13.3012 4.5 13.5001V18.7501H19.5V13.5001C19.5 13.3012 19.579 13.1104 19.7197 12.9698C19.8603 12.8291 20.0511 12.7501 20.25 12.7501C20.4489 12.7501 20.6397 12.8291 20.7803 12.9698C20.921 13.1104 21 13.3012 21 13.5001ZM8.78063 7.28073L11.25 4.81041V13.5001C11.25 13.699 11.329 13.8898 11.4697 14.0304C11.6103 14.1711 11.8011 14.2501 12 14.2501C12.1989 14.2501 12.3897 14.1711 12.5303 14.0304C12.671 13.8898 12.75 13.699 12.75 13.5001V4.81041L15.2194 7.28073C15.3601 7.42146 15.551 7.50052 15.75 7.50052C15.949 7.50052 16.1399 7.42146 16.2806 7.28073C16.4214 7.14 16.5004 6.94912 16.5004 6.7501C16.5004 6.55108 16.4214 6.36021 16.2806 6.21948L12.5306 2.46948C12.461 2.39974 12.3783 2.34442 12.2872 2.30668C12.1962 2.26894 12.0986 2.24951 12 2.24951C11.9014 2.24951 11.8038 2.26894 11.7128 2.30668C11.6217 2.34442 11.539 2.39974 11.4694 2.46948L7.71937 6.21948C7.57864 6.36021 7.49958 6.55108 7.49958 6.7501C7.49958 6.94912 7.57864 7.14 7.71937 7.28073C7.86011 7.42146 8.05098 7.50052 8.25 7.50052C8.44902 7.50052 8.63989 7.42146 8.78063 7.28073Z"
            fill="#F9F9F9"
          />
        </svg>
        Upload Seed Data
      </button>
      <Tabs
        size="lg"
        radius="md"
        aria-label="Options"
        classNames={{
          tabList:
            "w-full md:w-fit bg-[#F9F9F9] dark:bg-[#161618] border border-[#E7E7E9] dark:border-[#3E3E3E]",
          tab: "py-[0.3rem] px-3 text-base data-[hover-unselected=true]:opacity-100 h-auto",
          cursor: " group-data-[selected=true]:bg-[#B5B6BA]",
          tabContent: "group-data-[selected=true]:font-medium",
          panel: "py-4 px-0",
        }}
      >
        <Tab key="data" title="Data">
          <Table
            aria-label="Example dynamic data table"
            classNames={{
              table: "bg-[#F9F9F9] dark:bg-[#161618] rounded-lg",
              thead: "rounded-none [&>tr]:first:!rounded-none",
              th: "first:rounded-s-none first:rounded-ss-lg last:rounded-e-none last:rounded-se-lg bg-[#E7E7E9] dark:bg-[#2b2b30] text-[#68686F] dark:text-[#9F9FA5] font-normal text-base leading-6",
            }}
          >
            <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>Open</TableColumn>
              <TableColumn>High</TableColumn>
              <TableColumn>Low</TableColumn>
              <TableColumn>Volume</TableColumn>
            </TableHeader>
            <TableBody>
              {data &&
                Array.isArray(data) &&
                data?.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="whitespace-nowrap">
                      {item?.date}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {item?.open}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {item?.high}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {item?.low}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {item?.volume}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Tab>
        <Tab key="contributers" title="Contributers">
          <Table
            aria-label="Example dynamic contributers table"
            classNames={{
              table: "bg-[#F9F9F9] dark:bg-[#161618] rounded-lg",
              thead: "rounded-none [&>tr]:first:!rounded-none",
              th: "first:rounded-s-none first:rounded-ss-lg last:rounded-e-none last:rounded-se-lg bg-[#E7E7E9] dark:bg-[#2b2b30] text-[#68686F] dark:text-[#9F9FA5] font-normal text-base leading-6",
            }}
          >
            <TableHeader>
              <TableColumn>Worker&apos;s Address</TableColumn>
              <TableColumn>Node ID</TableColumn>
              <TableColumn>Type</TableColumn>
              <TableColumn>Task assigned </TableColumn>
              <TableColumn>Validated at</TableColumn>
              <TableColumn>Rewarded</TableColumn>
            </TableHeader>
            <TableBody>
              {contributersData &&
                Array.isArray(contributersData) &&
                contributersData?.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="whitespace-nowrap">
                      <span className="text-[#356FF5] underline">
                        {item?.address}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {item?.node_id}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {item?.type}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className="text-[#356FF5] underline">
                        {item?.task_assigned}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {item?.validated_at}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {item?.rewarded}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Tab>
        <Tab key="stackers" title="Stackers">
          <Table
            aria-label="Example dynamic data table"
            classNames={{
              table: "bg-[#F9F9F9] dark:bg-[#161618] rounded-lg",
              thead: "rounded-none [&>tr]:first:!rounded-none",
              th: "first:rounded-s-none first:rounded-ss-lg last:rounded-e-none last:rounded-se-lg bg-[#E7E7E9] dark:bg-[#2b2b30] text-[#68686F] dark:text-[#9F9FA5] font-normal text-base leading-6",
            }}
          >
            <TableHeader>
              <TableColumn>Address</TableColumn>
              <TableColumn>Staked amount</TableColumn>
            </TableHeader>
            <TableBody>
              {stackersData &&
                Array.isArray(stackersData) &&
                stackersData?.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="whitespace-nowrap">
                      <span className="text-[#356FF5] underline">
                        {item?.address}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {item?.staked_amount}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailsTable;
