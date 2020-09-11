import { FC } from "react";
import Select from "./Select";
import Option from "./Option";
import { SelectProps, OptionProps } from "./SelectProps";

interface TranSelectProps {
  Option: FC<OptionProps>;
}
type ISelectComponent = FC<SelectProps> & TranSelectProps;
const TransSelect = Select as ISelectComponent;
TransSelect.Option = Option;

export default TransSelect;
