"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { PAGES } from "@/config/pages";

export function DeletedFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const deletedFilter = searchParams.get("deleted");

  const handleDeletedFilter = (value: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (value !== undefined) {
      params.set("deleted", value.toString());
    } else {
      params.delete("deleted");
    }
    router.push(`${PAGES.ADMIN_ALL_TEMPLATES}?${params.toString()}`);
  };
  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={deletedFilter === "true"}
        onCheckedChange={handleDeletedFilter}
      />
      <Label>Deleted</Label>
    </div>
  );
}
