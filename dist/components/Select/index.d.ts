import { FC } from "react";
import { SelectProps, OptionProps } from "./SelectProps";
interface TranSelectProps {
    Option: FC<OptionProps>;
}
declare type ISelectComponent = FC<SelectProps> & TranSelectProps;
declare const TransSelect: ISelectComponent;
export default TransSelect;
