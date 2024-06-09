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
import { deleteFancyText } from "@/server/actions/fancy-text.action";
import { FancyText } from "@/db/schema";
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages";

const DeleteDialog = ({ template }: { template?: FancyText }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      if (template) {
        await deleteFancyText(template.id);

        router.push(PAGES.HOME);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="btn-danger">Delete Mail</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure want to delete this template?</DialogTitle>
          <DialogDescription>
            Once deleted, you will not be able to recover this template.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
