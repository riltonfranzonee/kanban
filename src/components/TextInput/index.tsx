import React from "react";

interface TextInputProps extends React.ComponentProps<"input"> {
  label?: string;
  textArea?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  textArea,
  ...inputProps
}) => {
  return (
    <div className="mb-6">
      {label && (
        <label className="block mb-2 text-sm font-medium">{label}</label>
      )}

      {textArea ? (
        <textarea
          className="bg-gray-50 shadow-md border-gray-300 text-sm rounded-lg block w-full p-2.5 h-40 resize-none outline-none"
          {...(inputProps as React.ComponentProps<"textarea">)}
        />
      ) : (
        <input
          className="bg-gray-50 shadow-md text-sm rounded-lg block w-full p-2.5 outline-none"
          {...inputProps}
        />
      )}
    </div>
  );
};

export default TextInput;
