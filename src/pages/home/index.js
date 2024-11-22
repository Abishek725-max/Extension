import React, { useEffect } from "react";
// import ChromeExtentionPage from "@/components/chrome_extension/chrome_extention_page";
import { Image, Input } from "@nextui-org/react";
import Logo from "../../assets/images/logo.png";
import { useRouter } from "next/router";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(
      () =>
        localStorage?.getItem("privateKey")
          ? router?.push(
              `/jobs?privateKey=${localStorage?.getItem("privateKey")}`
            )
          : router?.push("/wallet"),
      4000
    );
  }, []);

  return (
    <section className="max-w-[360px] w-full mx-auto bg-[#eef8ff] h-[100vh] flex flex-col justify-around">
      <div className="flex flex-col gap-3 items-center justify-center p-4">
        <h4 className="font-bold text-xl text-[#3c3a3b]">
          Welcome to the OpenLedger
        </h4>
        <p className="text-sm font-medium text-[#757a81] text-center">
          Get started by registering your wallet and exploring the features
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Image alt="logo" src={Logo.src} className="h-auto w-[10rem]" />
      </div>
      <div className="mb-24"></div>

      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">Open Menu</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </section>
  );
};

export default Home;
