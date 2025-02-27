import { JSONContent } from "@tiptap/react";

export function convertTiptapToXML(json: JSONContent) {
  const parseNode = (node: JSONContent): string => {
    if (!node.content) return parseText(node);
    switch (node.type) {
      case "doc":
        return node.content?.map(parseNode)?.join("\n");
      case "heading":
        const size = getSizeForHeading(node?.attrs?.level);
        return `<size=${size}px>${node?.content
          ?.map(parseNode)
          ?.join("")}</size>`;
      case "paragraph":
        return `${node?.content?.map(parseNode)?.join("")}`;
      case "text":
        return parseText(node);
      case "orderedList":
        return node.content
          ?.map(
            (item, index) =>
              `${index + (node.attrs?.start || 1)}. ${parseNode(item)}`
          )
          ?.join("\n");
      case "bulletList":
        return node.content?.map((item) => `* ${parseNode(item)}`)?.join("\n");
      case "listItem":
        return node.content?.map(parseNode)?.join("");
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
            if (mark.attrs && mark.attrs.fontSize) {
              const fontSize = mark.attrs.fontSize.replace(/px$/, "");
              result = `<size=${fontSize}px>${result}</size>`;
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

// Function to convert XML to Tiptap JSON content
export function parseXMLToTiptap(xmlString: string): JSONContent {
  // Create a base document structure
  const doc: JSONContent = {
    type: "doc",
    content: [],
  };

  // Helper function to get heading level from size
  const getHeadingLevelFromSize = (size: string): number => {
    const sizeNum = parseInt(size);
    if (sizeNum >= 48) return 1;
    if (sizeNum >= 40) return 2;
    if (sizeNum >= 36) return 3;
    if (sizeNum >= 30) return 4;
    if (sizeNum >= 24) return 5;
    if (sizeNum >= 16) return 6;
    return 0; // Not a heading
  };

  // Extract size value from size tag (handles px and other units)
  const extractSizeValue = (sizeStr: string): string => {
    // Remove 'px' or other units if present
    const match = sizeStr.match(/(\d+)(px)?/);
    return match ? match[1] : sizeStr;
  };

  // Normalize color value
  const normalizeColor = (colorValue: string): string => {
    if (!colorValue) return "#000000";

    // Handle rgb format
    if (colorValue.startsWith("rgb")) {
      const rgbMatch = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        return `#${r.toString(16).padStart(2, "0")}${g
          .toString(16)
          .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
      }
    }

    // Ensure hex colors start with #
    if (colorValue.match(/^[0-9a-f]{6}$/i)) {
      return `#${colorValue}`;
    }

    return colorValue;
  };

  // Split the input by newlines to handle paragraphs
  const lines = xmlString.split("\n");

  lines.forEach((line) => {
    if (!line.trim()) {
      // Empty line, add an empty paragraph
      doc.content!.push({
        type: "paragraph",
      });
      return;
    }

    // Process ordered and bullet lists
    if (line.match(/^\d+\.\s/)) {
      // Ordered list item
      const match = line.match(/^(\d+)\.\s(.*)$/);
      if (match) {
        const start = parseInt(match[1]);
        const content = match[2];

        // Check if we already have an ordered list as the last content item
        let orderedList = doc.content!.find(
          (item) =>
            item.type === "orderedList" &&
            doc.content!.indexOf(item) === doc.content!.length - 1
        ) as JSONContent | undefined;

        if (!orderedList) {
          orderedList = {
            type: "orderedList",
            attrs: { start },
            content: [],
          };
          doc.content!.push(orderedList);
        }

        const listItem: JSONContent = {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: parseTextWithTags(content),
            },
          ],
        };

        orderedList.content?.push(listItem);
        return;
      }
    } else if (line.startsWith("* ")) {
      // Bullet list item
      const content = line.substring(2);

      // Check if we already have a bullet list as the last content item
      let bulletList = doc.content!.find(
        (item) =>
          item.type === "bulletList" &&
          doc.content!.indexOf(item) === doc.content!.length - 1
      ) as JSONContent | undefined;

      if (!bulletList) {
        bulletList = {
          type: "bulletList",
          content: [],
        };
        doc.content!.push(bulletList);
      }

      const listItem: JSONContent = {
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: parseTextWithTags(content),
          },
        ],
      };

      bulletList.content?.push(listItem);
      return;
    }

    // Check if the entire paragraph is wrapped in a size tag that might indicate a heading
    const headingSizeMatch = line.match(/^<size=(\d+)(?:px)?>(.*)<\/size>$/);
    if (headingSizeMatch) {
      const size = headingSizeMatch[1];
      const content = headingSizeMatch[2];
      const level = getHeadingLevelFromSize(size);

      if (level > 0) {
        // This is a heading
        const heading: JSONContent = {
          type: "heading",
          attrs: { level },
          content: parseTextWithTags(content),
        };
        doc.content!.push(heading);
        return;
      }
    }

    // Regular paragraph with possible formatting
    const paragraph: JSONContent = {
      type: "paragraph",
      content: parseTextWithTags(line),
    };
    doc.content!.push(paragraph);
  });

  // Helper function to parse text with XML tags
  function parseTextWithTags(text: string): JSONContent[] {
    const result: JSONContent[] = [];
    let remaining = text;

    // Process tags until no more tags are found
    while (remaining.length > 0) {
      // Look for the first opening tag
      const openTagMatch = remaining.match(/<(b|i|color|size)(?:=([^>]*))?>/);

      if (!openTagMatch) {
        // No more tags, add the remaining text
        if (remaining) {
          result.push({
            type: "text",
            text: remaining,
          });
        }
        break;
      }

      const tagType = openTagMatch[1];
      const tagValue = openTagMatch[2];
      const tagStart = openTagMatch.index!;
      const tagEnd = tagStart + openTagMatch[0].length;

      // Add text before the tag
      if (tagStart > 0) {
        result.push({
          type: "text",
          text: remaining.substring(0, tagStart),
        });
      }

      // Find the matching closing tag
      // We need to handle nested tags of the same type, so we need to count opening and closing tags
      let depth = 1;
      let closeTagIndex = -1;
      let searchPos = tagEnd;

      while (depth > 0 && searchPos < remaining.length) {
        // Find next opening or closing tag of the same type
        const nextOpenTag = remaining.indexOf(`<${tagType}`, searchPos);
        const nextCloseTag = remaining.indexOf(`</${tagType}>`, searchPos);

        if (nextCloseTag === -1) {
          // No matching closing tag found
          break;
        }

        if (nextOpenTag !== -1 && nextOpenTag < nextCloseTag) {
          // Found another opening tag before the closing tag
          depth++;
          searchPos = nextOpenTag + 1;
        } else {
          // Found a closing tag
          depth--;
          searchPos = nextCloseTag + 1;
          if (depth === 0) {
            closeTagIndex = nextCloseTag;
          }
        }
      }

      if (closeTagIndex === -1) {
        // No matching closing tag, treat as plain text
        result.push({
          type: "text",
          text: remaining.substring(tagStart, tagEnd),
        });
        remaining = remaining.substring(tagEnd);
        continue;
      }

      const contentStart = tagEnd;
      const contentEnd = closeTagIndex;
      const content = remaining.substring(contentStart, contentEnd);

      // Process the content within the tags
      const innerContent = parseTextWithTags(content);

      // Create a mark based on the current tag
      const createMark = (tagType: string, tagValue: string) => {
        switch (tagType) {
          case "b":
            return { type: "bold" };
          case "i":
            return { type: "italic" };
          case "color":
            return {
              type: "textStyle",
              attrs: { color: normalizeColor(tagValue) },
            };
          case "size":
            return {
              type: "textStyle",
              attrs: { fontSize: `${extractSizeValue(tagValue)}px` },
            };
          default:
            return null;
        }
      };

      // Apply the current mark to all inner content nodes
      const currentMark = createMark(tagType, tagValue);
      if (currentMark) {
        // For each node in the inner content
        innerContent.forEach((node) => {
          if (node.type === "text") {
            if (!node.marks) {
              node.marks = [];
            }

            // Check if we need to merge with an existing textStyle mark
            if (currentMark.type === "textStyle") {
              const existingTextStyleIndex = node.marks.findIndex(
                (m) => m.type === "textStyle"
              );

              if (existingTextStyleIndex >= 0) {
                // Merge attributes with existing textStyle mark
                const existingMark = node.marks[existingTextStyleIndex];
                node.marks[existingTextStyleIndex] = {
                  ...existingMark,
                  attrs: {
                    ...existingMark.attrs,
                    ...currentMark.attrs,
                  },
                };
              } else {
                // Add new textStyle mark
                node.marks.push(currentMark);
              }
            } else {
              // For non-textStyle marks (bold, italic), just add them
              node.marks.push(currentMark);
            }
          }
        });
      }

      result.push(...innerContent);

      // Continue with the rest of the text
      remaining = remaining.substring(contentEnd + `</${tagType}>`.length);
    }

    return result;
  }

  return doc;
}
