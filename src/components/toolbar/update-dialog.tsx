"use client";
import React, { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Editor } from "@tiptap/react";
import { updateFancyText } from "@/server/actions/fancy-text.action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FancyTextInput,
  FancyTextSchema,
} from "@/server/validations/fancy-text.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FancyText } from "@/db/schema";
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages";

const UpdateDialog = ({
  editor,
  template,
}: {
  editor: Editor;
  template?: FancyText;
}) => {
  const form = useForm({
    defaultValues: {
      name: template?.name ?? "",
      isPublic: template?.isPublic ?? false,
      content: editor.getJSON(),
    },
    resolver: zodResolver(FancyTextSchema),
  });

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleUpdate = async (data: FancyTextInput) => {
    const content = JSON.parse(JSON.stringify(editor.getJSON()));
    startTransition(async () => {
      if (template) {
        const updated = await updateFancyText(template?.id, {
          name: data.name,
          content: content,
          isPublic: !!data.isPublic,
        });

        router.push(PAGES.VIEW_TEMPLATE(updated.id));
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="btn-primary">Update Mail</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure want to update this template?</DialogTitle>
          <DialogDescription>
            You can make this mail public or private.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <div className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mail Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g: Kingdom War Mail" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is the template name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isPublic"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormLabel htmlFor="isPublic">Make Public</FormLabel>
                      </div>
                    </FormControl>
                    {/* <FormDescription>Make this template public</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
