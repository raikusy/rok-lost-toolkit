"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { PAGES } from "@/config/pages";

export function PublicFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const publicFilter = searchParams.get("public");

  const handlePublicFilter = (value: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (value !== undefined) {
      params.set("public", value.toString());
    } else {
      params.delete("public");
    }
    router.push(`${PAGES.ADMIN_ALL_TEMPLATES}?${params.toString()}`);
  };
  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={publicFilter === "true"}
        onCheckedChange={handlePublicFilter}
      />
      <Label>Public</Label>
    </div>
  );
}
