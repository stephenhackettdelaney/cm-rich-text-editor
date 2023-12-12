import { useMemo } from "react"

import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
// import { Color } from "@tiptap/extension-color"
import TextStyle from "@tiptap/extension-text-style"
import Link from "@tiptap/extension-link"
import Document from "@tiptap/extension-document"
import Text from "@tiptap/extension-text"

import { generateHTML } from "@tiptap/html"

import styled from "styled-components"

export function TipTapText({ content, ...props }) {
  const json = content ? JSON.parse(content) : {}

  const output = useMemo(() => {
    return generateHTML(json, [
      Document,
      Text,
      TextStyle,
      // Color.configure({
      //   types: ["textStyle"],
      // }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: "tiptapImage",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
      Link,
      // Link.configure({
      //   inclusive: true,
      // }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        heading: {
          levels: [1, 2, 3],
        },
        paragraph: {
          HTMLAttributes: {
            class: "paragraph",
          },
        },
      }),
    ])
  }, [json])

  return (
    <TiptapDisplayWrapper className="tip-tap" {...props}>
      <div dangerouslySetInnerHTML={{ __html: output }} />
    </TiptapDisplayWrapper>
  )
}

const TiptapDisplayWrapper = styled.article<{
  $FontFamily_Headings?: string;
  $Color_Headings?: string;
  $FontFamily_Paragraph?: string;
  $Color_Paragraph?: string;
}>`
  h1,
  h2,
  h3 {
    color: ${({ $Color_Headings }) => $Color_Headings ? $Color_Headings : "#000"};
    font-family: ${({ $FontFamily_Headings }) => $FontFamily_Headings ? $FontFamily_Headings : "sans-serif"};

  }

  p {
    color: ${({ $Color_Paragraph }) => $Color_Paragraph ? $Color_Paragraph : "#000"};
    font-family: ${({ $FontFamily_Paragraph }) => $FontFamily_Paragraph ? $FontFamily_Paragraph : "sans-serif"};

  }

  h1 {
    font-size: 26px !important;
    font-weight: 700 !important;
    line-height: 2rem !important;
  }

  h2 {
    font-size: 24px !important;
    font-weight: 700 !important;
    line-height: 1.75rem !important;
  }

  h3 {
    font-size: 22px !important;
    font-weight: 700 !important;
    line-height: 1.5rem !important;
  }

  p {
    min-height: 24px;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.5rem;
  }

  blockquote {
    margin-left: 8px;
    padding-left: 8px;
    background-color: transparent !important;
  }

  blockquote h1,
  blockquote h2,
  blockquote h3,
  blockquote p {
    border-left: 6px solid #e2e2e2;
    padding-left: 24px;
    padding-top: 12px;
    padding-bottom: 8px;
  }

  code {
    background-color: #d4d4d4;
    padding: 8px;
    border-radius: 4px;
    color: yellow;
  }

  ol {
    padding: 0 32px !important;
    list-style-type: auto !important;
  }

  ul {
    padding: 0 32px !important;
    list-style-type: disc !important;
  }

  img {
    border-radius: 24px;
    width: 100% !important;
  }

  a {
    color: #E6007A !important;
    font-weight: 700;
  }
`
