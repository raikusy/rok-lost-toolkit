"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/server/actions/auth.action";
import React from "react";

const LogoutButton = () => {
  return (
    <Button
      className="w-full max-w-[200px]"
      variant="outline"
      onClick={() => logout()}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
