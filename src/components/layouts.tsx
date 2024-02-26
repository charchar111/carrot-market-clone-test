import React, { use, useEffect, useState } from "react";
import { Header } from "./headers";
import { TabBar } from "./tabBars";
import { totalmem } from "os";
import { makeClassName } from "@/libs/client/utils";
import useUser from "@/libs/client/useUser";
import { User } from "@prisma/client";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
  user: User | undefined;
}

export const Layout = function ({
  title,
  canGoBack,
  hasTabBar,
  children,
  user,
}: LayoutProps) {
  return (
    <div className="outter-layout min-h-screen bg-gray-100">
      <div className="layout mx-auto min-h-screen  max-w-lg bg-white">
        <Header title={title} canGoBack={canGoBack} />
        <div className={makeClassName("pt-14", hasTabBar ? "pb-16" : "")}>
          {children}
        </div>
        {hasTabBar ? <TabBar userId={user?.id} /> : null}
      </div>
    </div>
  );
};
