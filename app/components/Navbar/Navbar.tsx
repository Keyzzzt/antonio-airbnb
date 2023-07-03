"use client";
import { User } from "@prisma/client";
import { Container } from "../MultiPurpose/Container/Container";
import { Logo } from "./Logo/Logo";
import { Search } from "./Search/Search";
import { UserMenu } from "./UserMenu";
import React from "react";

type NavbarProps = {
  currentUser?: User | null;
};

export const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log("🚀 ~ file: Navbar.tsx:14 ~ currentUser:", currentUser);
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};
