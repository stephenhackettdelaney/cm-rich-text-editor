import { useCallback } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Image from "@tiptap/extension-image"
import Underline from "@tiptap/extension-underline"
import { Color } from "@tiptap/extension-color"
import TextStyle from "@tiptap/extension-text-style"
import Link from "@tiptap/extension-link"

// import { openImageGallery } from "../../utils/cloudinary"
import styled from "styled-components"

import {
    Bold,
    Italic,
    Paragraph,
    AlignLeft,
    AlignCenter,
    AlignRight,
    BlockQuote,
    H1,
    H2,
    H3,
    // AddImage,
    StrikeThrough,
    Code,
    OrderedList,
    UnorderedList,
    UnderlineIcon,
    TextColor,
    LinkIcon,
} from "../icons/index.js"
// why does this have to be explicit now ??

const getButtonProps = (editor) => {
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes("link").href
        const url = window.prompt("URL", previousUrl)

        if (!/^https?:\/\//.test(url)) {
            return window.alert("Url address needs https:// or http:// to be valid")
        }


        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run()

            return
        }

        // update link
        editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: '_blank' }).run()
    }, [editor])

    return {
        paragraph: {
            onClick: () => editor.commands.setParagraph(),
        },
        bold: {
            onClick: () => editor.chain().focus().toggleBold().run(),
            disabled: !editor.can().chain().focus().toggleBold().run(),
        },
        italic: {
            onClick: () => editor.chain().focus().toggleItalic().run(),
            disabled: !editor.can().chain().focus().toggleItalic().run(),
        },
        underline: {
            onClick: () => editor.commands.toggleUnderline(),
        },
        strike: {
            onClick: () => editor.chain().focus().toggleStrike().run(),
            disabled: !editor.can().chain().focus().toggleStrike().run(),
        },
        link: {
            onClick: () => setLink(),
        },
        textLeft: {
            onClick: () => editor.commands.setTextAlign("left"),
        },
        textCenter: {
            onClick: () => editor.commands.setTextAlign("center"),
        },
        textRight: {
            onClick: () => editor.commands.setTextAlign("right"),
        },
        blockquote: {
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
        },
        code: {
            onClick: () => editor.commands.toggleCode(),
            disabled: !editor.can().chain().focus().toggleCode().run(),
        },
        unorderedList: {
            onClick: () => editor.commands.toggleBulletList(),
        },
        orderedList: {
            onClick: () => editor.commands.toggleOrderedList(),
        },
        hardBreak: {
            onClick: () => editor.chain().focus().setHardBreak().run(),
        },
        mediaLibrary: {
            onClick: (url) => editor.chain().focus().setImage({ src: url }).run(),
        },
        undo: {
            onClick: () => editor.chain().focus().undo().run(),
            disabled: !editor.can().chain().focus().undo().run(),
        },
        pink: {
            onClick: () => editor.chain().focus().setColor("#e6007a").run(),
            className: "text-[#e6007a]",
        },
        gray: {
            onClick: () => editor.chain().focus().setColor("#70787d").run(),
            className: "text-[#70787d]",
        },
    }
}

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }

    const {
        paragraph,
        bold,
        italic,
        strike,
        underline,
        link,
        textLeft,
        textCenter,
        textRight,
        blockquote,
        code,
        unorderedList,
        orderedList,
        // mediaLibrary,
        pink,
        gray,
    } = getButtonProps(editor)

    function onClickHeading(level) {
        editor.chain().focus().toggleHeading({ level }).run()
    }

    return (
        <ToolBar>
            <MenuButton name={["heading", { level: 1 }]} editor={editor} icon={<H1 />} onClick={() => onClickHeading(1)} />
            <MenuButton name={["heading", { level: 2 }]} editor={editor} icon={<H2 />} onClick={() => onClickHeading(2)} />
            <MenuButton name={["heading", { level: 3 }]} editor={editor} icon={<H3 />} onClick={() => onClickHeading(3)} />
            <MenuButton name="paragraph" editor={editor} icon={<Paragraph />} {...paragraph} />
            <MenuDivider />
            <MenuButton name="bold" icon={<Bold />} editor={editor} {...bold} />
            <MenuButton name="italic" editor={editor} icon={<Italic />} {...italic} />
            <MenuButton name="underline" editor={editor} icon={<UnderlineIcon />} {...underline} />
            <MenuButton name="strike" editor={editor} icon={<StrikeThrough />} {...strike} />
            <MenuButton name="link" editor={editor} icon={<LinkIcon />} {...link} />
            <MenuDivider />
            <MenuButton name={["", { textAlign: "left" }]} editor={editor} icon={<AlignLeft />} {...textLeft} />
            <MenuButton name={["", { textAlign: "center" }]} editor={editor} icon={<AlignCenter />} {...textCenter} />
            <MenuButton name={["", { textAlign: "right" }]} editor={editor} icon={<AlignRight />} {...textRight} />
            <MenuDivider />
            <MenuButton name="blockquote" editor={editor} icon={<BlockQuote />} {...blockquote} />
            <MenuButton name="bulletList" editor={editor} icon={<UnorderedList />} {...unorderedList} />
            <MenuButton name="orderedList" editor={editor} icon={<OrderedList />} {...orderedList} />
            <MenuDivider />
            <MenuButton name="textPink" editor={editor} icon={<TextColor />} {...pink} />
            <MenuButton name="textGray" editor={editor} icon={<TextColor />} {...gray} />
            <MenuDivider />
            <MenuButton name="code" editor={editor} icon={<Code />} {...code} />
            <MenuDivider />
            {/* <ImageGalleryWidget component={MenuButton} editor={editor} onInsert={mediaLibrary.onClick} /> */}
        </ToolBar>
    )
}

export function TipTapEditor({ ...input }) {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: "tiptap",
            },
        },
        extensions: [
            Link.configure({
                openOnClick: false,
                validate: href => /^https?:\/\//.test(href),
            }),
            TextStyle,
            Color.configure({
                types: ["textStyle"],
            }),
            Underline,
            Image,
            TextAlign.configure({
                types: ["heading", "paragraph", "image"],
                alignments: ["left", "center", "right"],
                defaultAlignment: "left",
            }),
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
            }),
        ],
        content: input.value ? JSON.parse(input.value) : input.value,
        onUpdate: ({ editor }) => {
            const json = editor.getJSON()
            if (!!input?.onChange) {
                input.onChange(JSON.stringify(json))
            }
            else return
        },
        onCreate: ({ editor }) => {
            const json = editor.getJSON()
            if (!!input?.onChange) {
                input.onChange(JSON.stringify(json))
            }
            else return
        },
    })


    // useEffect(() => {
    //     const script = document.createElement("script")

    //     script.src = "https://media-library.cloudinary.com/global/all.js"
    //     script.async = true

    //     document.head.appendChild(script)

    //     return () => {
    //         // Cleanup the dynamically added script when the component is unmounted
    //         document.head.removeChild(script)
    //     }
    // }, [])

    return (
        <TiptapWrapper className="tip-tap">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="editor" />
        </TiptapWrapper>
    )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px !important;
  border-radius: 4px !important;

  &:hover {
    background-color: #e2e2e2 !important;
  }

  div {
    width: 20px;
  }
`

const SVGContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
`

function MenuButton({ name, icon: Icon, editor, ...props }) {
    const isActive = typeof name != "string" ? editor.isActive(name[0], name[1]) : editor.isActive(name)

    return (
        <Button
            key={`${editor.isActive(name)}.${name}`}
            style={{ backgroundColor: isActive ? "#e2e2e2" : "transparent" }}
            {...props}
        >
            <SVGContainer>{Icon && Icon}</SVGContainer>
        </Button>
    )
}

const Divider = styled.section`
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 12px;

  div {
    background-color: #e2e2e2;
    width: 1px;
    height: 100%;
  }
`

function MenuDivider() {
    return (
        <Divider>
            <div />
        </Divider>
    )
}

const TiptapWrapper = styled.section< {
    $FontFamily_Headings?: string;
    $Color_Headings?: string;
    $FontFamily_Paragraph?: string;
    $Color_Paragraph?: string;
}>`
  .editor {
    border: 2px solid #e2e2e2 !important;
    border-top: 0 !important;
    background-color: #fff !important;
    padding: 8px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .tiptap {
    min-height: 180px;
    outline: none;
  }

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

const ToolBar = styled.section`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 10;
  overflow: auto;
  border: 2px solid #e2e2e2 !important;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  gap: 8px;
  padding: 8px;
  background: #fff;
`

// const ImageGalleryWidget = (props) => {
//     const Component = props.component
//     const openGalleryWidget = () =>
//         openImageGallery(
//             {
//                 cloud_name: "comedia-design",
//                 api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//                 username: process.env.NEXT_PUBLIC_CLOUDINARY_ADMIN_EMAIL,
//                 button_class: "myBtn",
//                 button_caption: "Insert Images",
//                 default_transformations: [
//                     [{ quality: "auto" }, { fetch_format: "auto" }],
//                     [
//                         { width: 80, height: 80, crop: "fill", gravity: "auto", radius: "max" },
//                         { fetch_format: "auto", quality: "auto" },
//                     ],
//                 ],
//                 multiple: false,
//                 max_files: 1,
//             },
//             {
//                 insertHandler: function (data) {
//                     data.assets.forEach((asset) => {
//                         props.onInsert(asset.url)
//                     })
//                 },
//             }
//         )

//     return <Component name="mediaLibrary" icon={<AddImage />} editor={props.editor} onClick={openGalleryWidget} />
// }
