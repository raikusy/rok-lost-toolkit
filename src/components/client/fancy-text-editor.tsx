"use client";

import React, { useState } from "react";
import Tiptap from "@/components/tiptap-editor";
import { INITIAL_CONTENT } from "@/config/initial-content";
import { FancyText } from "@/db/schema";
import { User } from "lucia";

export const FancyTextEditor = ({
  fancyText,
  user,
  mode,
}: {
  fancyText?: FancyText;
  user: User | null;
  mode: "create" | "edit" | "view";
}) => {
  const [value, setValue] = useState(fancyText?.content ?? INITIAL_CONTENT);
  return (
    <Tiptap
      mode={mode}
      user={user}
      content={value}
      onChange={setValue}
      template={fancyText}
      placeholder="Write your text here..."
    />
  );
};
