import type { FancyText } from "@/db/schema";
import { TiptapPreview } from "./client/tiptap-preview";
import { PAGES } from "@/config/pages";
import Link from "next/link";
import dayjs from "dayjs";

export function TemplateCard({ template }: { template: FancyText }) {
  return (
    <Link
      href={PAGES.VIEW_TEMPLATE(template.id)}
      key={template.id}
      className="group block transition-all border border-[#F1E3C3] hover:border-[#F1E3C3]/80 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-lg"
    >
      <div className="flex flex-col h-full bg-[#F1E3C3] rounded-lg shadow-md dark:bg-gray-800 overflow-hidden">
        <div className="p-4 pb-2">
          <h2 className="text-lg font-semibold line-clamp-1">
            {template.name}
          </h2>
        </div>
        <div className="flex-1">
          <TiptapPreview
            content={template.content}
            className="bg-[#F1E3C3] dark:bg-gray-800"
          />
        </div>
        <div className="p-4 pt-2 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p>{dayjs(template.createdAt).format("DD MMM, YYYY")}</p>
            <p>Governor: {template.user.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
