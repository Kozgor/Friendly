import { forwardRef } from 'react';

import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface INumericCustomAdapter {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const numericFormatAdapter = forwardRef<NumericFormatProps, INumericCustomAdapter>(
  function NumericFormatAdapter(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value
            }
          });
        }}
        valueIsNumericString
        allowNegative={false}
      />
    );
  }
);
