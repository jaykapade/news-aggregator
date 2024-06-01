import { useState } from "react";
import useLocalStorage from "../hooks/uselocalStorage";
import { categories, sources } from "../constants";
import { QueryProps } from "../types";

const basePreference = {
  source: "newsOrgApi",
  category: "",
};
const UserPreference = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [preferences, setPreferences] = useLocalStorage<Partial<QueryProps>>(
    "userPreference",
    basePreference
  );
  const [value, setValue] = useState(preferences);

  const toggleModel = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (key: string, value: string) => {
    setValue((prev) => ({ ...prev, [key]: value }));
  };

  const resetPreferences = () => {
    setValue(basePreference);
  };

  return (
    <>
      <button
        onClick={toggleModel}
        className="bg-gray-800 text-white font-bold py-2 px-4 rounded w-fit"
      >
        User Preferences
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-xl relative min-w-[40vw]">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">User Preferences</h2>
              <button
                className="text-bold text-sm text-red-500"
                onClick={resetPreferences}
              >
                Reset
              </button>
            </div>{" "}
            <p className="text-sm">Please select your preferred source</p>
            <select
              value={value.source}
              onChange={(e) => handleChange("source", e.target.value)}
              className="p-2 border border-gray-300 rounded flex-1 w-full"
            >
              <option value="">
                {sources.find((s) => s.value === value.source)?.label ||
                  "Select a Source"}
              </option>
              {sources
                .filter((s) => s.value !== value.source)
                .map((source) => (
                  <option key={source.value} value={source.value}>
                    {source.label}
                  </option>
                ))}
            </select>
            <p className="text-sm">Please select your preferred category</p>
            <select
              value={value.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="p-2 border border-gray-300 rounded flex-1 w-full"
            >
              <option value="">
                {categories.find((s) => s.value === value.category)?.label ||
                  "Select a Category"}
              </option>
              {categories
                .filter((s) => s.value !== value.category)
                .map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
            </select>
            <div className="flex gap-2 align-middle justify-end mt-2">
              {" "}
              <button
                onClick={toggleModel}
                className="p-2 w-fit text-md border border-gray-500 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPreferences(value);
                  toggleModel();
                }}
                className="p-2 w-fit text-md bg-gray-800 text-white rounded-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPreference;
