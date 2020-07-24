import React from "react";
import { action } from "@storybook/addon-actions";
import Autocomplete from "./Autocomplete";
import { DataSourceType } from "./AutocompleteProps";
interface LakerPlayerProps {
  value: string;
  number: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

export default {
  title: "Autocomplete 输入建议",
  component: Autocomplete,
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
  //简单类型string
  const handleFetch = (query: string) => {
    return lakers
      .filter((name) => {
        return name.includes(query);
      })
      .map((name) => ({ value: name }));
  };

  return (
    <Autocomplete
      fetchSuggestions={handleFetch}
      onSelect={(item) => action("selected：" + item)}
      placeholder="please enter"
    />
  );
};
SimpleComplete.story = {
  name: "Autocomplete", //一定要和export default中的component同名才会根据注释生成文档，且组件中必须双export，否则props不会生成文档
};

export const ComplexComplete = () => {
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

  //复杂类型{}
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((player) => {
      return player.value.includes(query);
    });
  };

  const renderOptions = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>;

    return (
      <>
        <h2>名字: {itemWithNumber.value}</h2>
        <p>球衣号码: {itemWithNumber.number}</p>
      </>
    );
  };

  return (
    <Autocomplete
      fetchSuggestions={handleFetch}
      onSelect={(item) => action("selected：" + item)}
      renderOptions={renderOptions}
      placeholder="输入球员英文名,自定义下拉模版"
    />
  );
};
ComplexComplete.story = {
  name: "自定义下拉选项",
};

export const FetchAsyncData = () => {
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

  //复杂类型{}+promise异步
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };

  const renderOptions = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <h2>Name: {itemWithNumber.login}</h2>
        <p>url: {itemWithNumber.url}</p>
      </>
    );
  };

  return (
    <Autocomplete
      fetchSuggestions={handleFetch}
      onSelect={(item) => action("selected：" + item)}
      renderOptions={renderOptions}
      placeholder="输入 Github 用户名试试"
    />
  );
};
FetchAsyncData.story = {
  name: "异步请求Github用户名",
};
