import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { forwardRef } from 'react';

interface INumericCustomAdapter {
  onChange: (event: { target: { value: string } }) => void;
  value: string;
}

export const numericFormatAdapter = forwardRef<NumericFormatProps, INumericCustomAdapter>(
  function NumericFormatAdapter (props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value
            }
          });
        }}
        min={1}
        allowNegative={false}
        valueIsNumericString
      />
    );
  }
);
