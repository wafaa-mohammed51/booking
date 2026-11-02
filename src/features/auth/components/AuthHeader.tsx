import React from "react";

interface AuthHeaderProps {
  title?: string;
  text?: string;
  btn?: {
    text: string;
    onClick: () => void;
  };
}
const AuthHeader = ({
  title = "Title",
  text = "Text",
  btn,
}: AuthHeaderProps) => {
  return (
    <div className="text-center">
      <h1 className="font-heading text-3xl font-semibold text-(--Auth-head-font-color)">
        {title}
      </h1>
      <p className="mt-3 text-sm text-text">{text}</p>
      {btn && (
        <button
          type="button"
          className="mt-1 text-sm font-medium text-brand hover:underline"
          onClick={btn.onClick}
        >
          {btn.text}
        </button>
      )}
    </div>
  );
};

export default AuthHeader;
