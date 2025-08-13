import { useEffect, useState } from "react";
import { checkHeading, replaceHeading } from "./helper";
import { atomDark as dark2 } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import ReactMarkdown from "react-markdown";

SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("javascript", javascript);

const Answer = ({ ans, ind, totalResult, type }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeading(ans));
    }
  }, [ans]);

  const render = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\$/, "")}
          language={match[1]} // ✅ fixed typo
          style={dark2}
          customStyle={{
            padding: "20px",
            fontFamily: "monospace",
          }}
          preTag="div"
        />
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      {ind === 0 && totalResult > 1 ? (
        <span className="pt-2 text-lg block">{answer}</span>
      ) : heading ? (
        <span className="pt-2 text-lg block">{answer}</span>
      ) : (
        <span className={type === "q" ? "pl-.1" : "pl-5"}>
          <ReactMarkdown components={render}>{answer}</ReactMarkdown>
        </span>
      )}
    </>
  );
};

export default Answer;
