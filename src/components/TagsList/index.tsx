import React from "react";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

interface TagsListProps {
  tags: string[];
  onRemove?: (tag: string) => void;
}

const TagsList: React.FC<TagsListProps> = ({ tags, onRemove }) => {
  return (
    <div className="flex gap-2 flex-wrap mt-3">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded bg-zinc-200 px-2 py-1 self-start flex items-center justify-between"
        >
          {tag}
          {!!onRemove && (
            <button
              type="button"
              onClick={() => onRemove(tag)}
              className="ml-2"
            >
              <XMarkIcon className="hover:text-red-500 h-4 w-4" />
            </button>
          )}
        </span>
      ))}
    </div>
  );
};

export default TagsList;
