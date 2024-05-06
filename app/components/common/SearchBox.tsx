import { FormEvent, useMemo, useState } from "react";

import { Icon } from "./Icon";

export function SearchBox({
  onChange,
  onSubmit,
}: {
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}) {
  const [searchText, setSearchText] = useState<string>("");
  const [submitText, setSubmitText] = useState<string>("");

  const showSubmitButton = useMemo(
    () => searchText !== submitText,
    [searchText, submitText]
  );

  const showClearButton = useMemo(
    () => searchText === submitText && submitText.length > 0,
    [searchText, submitText]
  );

  const handleInputChange = (value: string): void => {
    setSearchText(value);
    onChange?.(value);
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setSubmitText(searchText);
    onSubmit?.(searchText);

    e.preventDefault();
  }

  function handleSubmitButtonClick() {
    setSubmitText(searchText);
    onSubmit?.(searchText);
  }

  const handleClearButtonClick = () => {
    setSearchText("");
    onChange?.("");

    setSubmitText("");
    onSubmit?.("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="relative flex flex-row hover:bg-bg_hover">
        <input
          className="absolute w-full h-full py-2.5 px-10 outline-none text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => handleInputChange(e.target.value)}
        />

        <div className="flex flex-row w-full pointer-events-none z-50">
          <div className="p-2.5">
            <Icon className="text-xl" icon="search" />
          </div>

          <div className="grow" />

          {showSubmitButton ? (
            <div
              className="p-2.5 pointer-events-auto cursor-pointer hover:text-text_white active:text-highlight_yellow"
              onClick={handleSubmitButtonClick}
            >
              <Icon className="text-xl" icon="arrow_forward" />
            </div>
          ) : (
            <></>
          )}

          {showClearButton ? (
            <div
              className="p-2.5 pointer-events-auto cursor-pointer hover:text-text_white active:text-highlight_yellow"
              onClick={handleClearButtonClick}
            >
              <Icon className="text-xl" icon="close" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </label>
    </form>
  );
}
