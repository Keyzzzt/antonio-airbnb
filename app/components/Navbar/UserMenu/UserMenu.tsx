"use client";
import { useCallback, useState } from "react";
import { styles } from "./UserMenuStyles";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../../MultiPurpose/Avatar";
import { MenuItem } from "../MenuItem/MenuItem";
import { useRegisterModal } from "@/app/helpers/hooks/useRegisterModal";
import { RegisterModal } from "../../MultiPurpose/Modals/RegisterModal/RegisterModal";

export const UserMenu = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleUserMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <div className={styles.userMenu}>
      <div className={styles.wrapper}>
        <div onClick={() => {}} className={styles.title}>
          Your menu
        </div>
        <div onClick={toggleUserMenu} className={styles.burger}>
          <AiOutlineMenu />
          <div className={styles.avatar}>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.userMenuBlock}>
          <div className={styles.menuItems}>
            <MenuItem onClick={() => {}} label="Login" />
            <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
          </div>
        </div>
      )}
    </div>
  );
};
