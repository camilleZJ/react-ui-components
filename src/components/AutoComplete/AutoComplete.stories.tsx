import React from "react";
import { action } from "@storybook/addon-actions";
import AutoComplete from "./AutoComplete";
import { strict } from "assert";

export default {
  title: "AutoComplete Component",
  component: AutoComplete,
};

export const SimpleComplete = () => {
  const lakers = [
    "bradley",
    "pope",
    "cook",
    "cousins",
    "james",
    "AD",
    "green",
    "howard",
    "kuzma",
    "mcGee",
    "rando",
  ];

  const lakersWithNumber = [
    { value: "bradley", number: 11 },
    { value: "pope", number: 1 },
    { value: "caruso", number: 4 },
    { value: "cook", number: 2 },
    { value: "cousins", number: 15 },
    { value: "james", number: 23 },
    { value: "AD", number: 3 },
    { value: "green", number: 14 },
    { value: "howard", number: 39 },
    { value: "kuzma", number: 0 },
  ];

  //   const handleFetch = (query: string) => {
  //     return lakers.filter((name) => {
  //       return name.includes(query);
  //     });
  //   };

  const handleFetch = (query: string) => {
    return lakers
      .filter((name) => {
        return name.includes(query);
      })
      .map((name) => ({ value: name }));
  };

  const renderOptions = (item: DataSourceType) => {
    return <h2>Name: {item}</h2>;
  };

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={(item) => action("selected：" + item)}
      renderOptions={renderOptions}
    />
  );
};
