import { useState } from "react";
import { InputTypeProps } from "utils/types";

const InputType: React.FC<InputTypeProps> = (props) => {
  // Destructure the props
  const { onChange, type, text, group } = props;
  // Using useRef to keep track of selected indexes for checkboxes and radios
  const [indexes, setIndexes] = useState(props.indexes);

  // Render different input types based on the 'type' prop
  return type === "checkbox" || type === "radio" ? (
    <>
      {text.map((value, index) => (
        <div key={index} className="mb-2">
          <label className="flex items-center">
            <input
              type={type}
              name={group}
              checked={indexes.findIndex((value) => value === index) >= 0}
              className={`form-${type} h-5 w-5 text-blue-600`}
              onChange={(e) => {
                let newIndexes;
                if (type === "checkbox") {
                  const checked = e.target.checked;
                  if (checked) {
                    newIndexes = [...indexes, index];
                  } else {
                    newIndexes = indexes.filter((value) => value !== index);
                  }
                } else {
                  newIndexes = [index];
                }
                // Update indexes
                setIndexes(newIndexes);
                // Convert the Set to an array and invoke the onChange callback
                onChange(newIndexes);
              }}
            />
            <span className="ml-2">{value}</span>
          </label>
        </div>
      ))}
    </>
  ) : (
    // Render select input for type 'select'
    <select
      className="block w-full bg-white border border-gray-300 p-2 rounded"
      onChange={(e) => {
        const newIndexes = [+e.target.value];
        // Update indexes
        setIndexes(newIndexes);
        // Convert the Set to an array and invoke the onChange callback
        onChange(newIndexes);
      }}
    >
      <option value="" disabled selected>
        Select an option
      </option>
      {text.map((value, index) => (
        <option
          key={index}
          value={index}
          selected={indexes.findIndex((value) => value === index) >= 0}
        >
          {value}
        </option>
      ))}
    </select>
  );
};

export default InputType;
