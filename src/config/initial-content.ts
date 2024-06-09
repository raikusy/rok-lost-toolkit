import { JSONContent } from "@tiptap/react";

export const INITIAL_CONTENT: JSONContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "textStyle",
              attrs: {
                color: "#0277BD",
              },
            },
          ],
          text: "Mighty Governors of",
        },
        {
          type: "text",
          text: " ",
        },
        {
          type: "text",
          marks: [
            {
              type: "textStyle",
              attrs: {
                color: "#FF8F00",
              },
            },
          ],
          text: "Rise of Kingdoms!",
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "You can write ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "BOLD",
        },
        {
          type: "text",
          text: " and ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "ITALIC",
        },
        {
          type: "text",
          text: " also ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
            {
              type: "textStyle",
              attrs: {
                color: "#AD1457",
              },
            },
          ],
          text: "COLORFUL",
        },
        {
          type: "text",
          text: " text in alliance mail for your next Alliance Event update or Kingdom Announcement or War strategy changes.Now you can send fancy colorful creative mails to your Kingdom and standout from the crowd!",
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
            {
              type: "textStyle",
              attrs: {
                color: "#00695C",
              },
            },
          ],
          text: "SHARE THIS WITH PLAYERS AROUND YOU!",
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Developed by:",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "MD Rakibul Hasan 🇧🇩",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Social - @raikusy",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Email - ping@raikusy.dev",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Website - https://raikusy.dev",
        },
      ],
    },
  ],
};
