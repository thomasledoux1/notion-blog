import classNames from "classnames";
import { v4 as uuid } from "uuid";
const Text = ({ text }) => {
  const colorMapper = {
    default: "text-current",
    yellow: "text-yellow-500",
    gray: "text-gray-500",
    brown: "text-brown-500",
    orange: "text-orange-500",
    green: "text-green-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    red: "text-red-500"
  };
  if (!text) {
    return null;
  }
  return text.map(value => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text
    } = value;
    const id = uuid();
    return (
      <span
        className={classNames(colorMapper[color], "break-words", {
          "font-bold": bold,
          italic: italic,
          "line-through": strikethrough,
          underline: underline,
          "bg-red-500 text-white ": code
        })}
        key={id}
      >
        {text.link ? (
          <a className="underline" href={text.link.url}>
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    );
  });
};

export default Text;
