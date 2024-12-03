import MainLayout from "@/main-layout";
import Dashboard from "../components/dashboard";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </>
  );
}
