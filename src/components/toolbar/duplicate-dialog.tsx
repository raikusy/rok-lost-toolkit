"use client";
import React, { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { duplicateFancyText } from "@/server/actions/fancy-text.action";
import { FancyText } from "@/db/schema";
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages";

const DuplicateDialog = ({ template }: { template?: FancyText }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleDuplicate = async () => {
    startTransition(async () => {
      if (template) {
        const copied = await duplicateFancyText(template.id);

        router.push(PAGES.VIEW_TEMPLATE(copied.id));
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="btn-primary">Duplicate</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure want to duplicate this template?
          </DialogTitle>
          <DialogDescription>
            This will create a new template with the same content on your
            profile
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="default"
            disabled={isPending}
            onClick={handleDuplicate}
          >
            {isPending ? "Copying..." : "Duplicate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateDialog;
