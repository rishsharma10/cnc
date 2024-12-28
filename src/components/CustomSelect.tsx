import React from 'react';
import { Select } from 'antd';

const CustomSelect = (props:any) => (
  <Select
    mode={props.mode}
    maxCount={props.maxCount}
    maxTagCount={props.maxTagCount}
    className="text-start"
    // onChange={props.handleChange}
    options={props.options}
    placeholder={props.placeholder}
  />
);

export default CustomSelect;