"use client";
import React from "react";
import Select from "react-select";
import { useCountries } from "@/app/helpers/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type CountrySelectProps = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};

export const CountrySelect: React.FC<CountrySelectProps> = ({
  onChange,
  value,
}) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        classNames={{
          control: () => "p-3 border-2",
          option: () => "text-lg",
          input: () => "text-lg cursor-pointer",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: { ...theme.colors, primary: "black", primary25: "#eaeaea" },
        })}
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
      />
    </div>
  );
};
