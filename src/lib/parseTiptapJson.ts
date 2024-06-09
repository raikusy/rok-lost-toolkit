import { JSONContent } from "@tiptap/react";

export function convertTiptapToXML(json: JSONContent) {
  const parseNode = (node: JSONContent): string => {
    if (!node.content) return parseText(node);
    switch (node.type) {
      case "doc":
        return node.content?.map(parseNode)?.join("\n");
      case "heading":
        const size = getSizeForHeading(node?.attrs?.level);
        return `<size=${size}>${node?.content
          ?.map(parseNode)
          ?.join("")}</size>`;
      case "paragraph":
        return `${node?.content?.map(parseNode)?.join("")}`;
      case "text":
        return parseText(node);

      default:
        return "";
    }
  };

  const parseText = (node: JSONContent) => {
    let result = node.text ?? "";
    if (node.marks) {
      node?.marks?.forEach((mark) => {
        switch (mark.type) {
          case "bold":
            result = `<b>${result}</b>`;
            break;
          case "italic":
            result = `<i>${result}</i>`;
            break;
          case "textStyle":
            if (mark.attrs && mark.attrs.color) {
              result = `<color=${mark.attrs.color}>${result}</color>`;
            }
            break;
          default:
            break;
        }
      });
    }
    return result;
  };

  const getSizeForHeading = (level: number) => {
    switch (level) {
      case 1:
        return "48";
      case 2:
        return "40";
      case 3:
        return "36";
      case 4:
        return "30";
      case 5:
        return "24";
      case 6:
        return "16";
      default:
        return "12";
    }
  };

  return parseNode(json);
}
