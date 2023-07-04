import { Container } from "../MultiPurpose/Container";
import { Logo } from "./Logo";
import { Search } from "./Search";
import React from "react";
import { SaveUser } from "@/app/types";
import { UserMenu } from "./UserMenu";

type NavbarProps = {
  currentUser?: SaveUser | null;
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
