"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { FaArrowLeft } from "react-icons/fa";
import EditorDemo from "./Editor";

const MarkdownComponents = {
  p: ({ children, ...props }: any) => (
    <p className="mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-bold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  div: ({ children, style, ...props }: any) => (
    <div style={style} className="mb-4" {...props}>
      {children}
    </div>
  ),
  span: ({ children, style, ...props }: any) => (
    <span style={style} {...props}>
      {children}
    </span>
  ),
};

function Policy() {
  const { t } = useTranslation();
  const [markdown, setMarkdown] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="h-full px-6">
      <div className="h-[90%] overflow-y-auto">
        <div
          onClick={() => setIsEditing((prev) => !prev)}
          className="flex items-center justify-start gap-4 mt-8 text-2xl text-gray-600 hover:cursor-pointer"
        >
          <h1>
            <FaArrowLeft />
          </h1>
          <h1>
            {isEditing ? t("policyPage.editTitle") : t("policyPage.title")}
          </h1>
        </div>

        {isEditing ? (
          <EditorDemo markdown={markdown} setMarkdown={setMarkdown} />
        ) : (
          <div className="p-6 mt-5">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={MarkdownComponents}
            >
              {markdown || t("policyPage.noContent")}
            </ReactMarkdown>
          </div>
        )}
      </div>

      <div className="justify-end flex me-8">
        {isEditing ? (
          <button
            onClick={() => {
              setIsEditing(false);
              console.log(markdown);
            }}
            className="bg-gradient-to-r from-[#071352] to-[#0023CF] text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition"
          >
            {t("policyPage.updateButton")}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-[#071352] to-[#0023CF] text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition"
          >
            {t("policyPage.editButton")}
          </button>
        )}
      </div>
    </div>
  );
}

export default Policy;
