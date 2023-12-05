import {
  Checkbox,
  ListItemContent,
  MenuItem,
  Option,
  Typography
} from '@mui/joy';
import Select, { selectClasses } from '@mui/joy/Select';
import { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { IParticipants } from '../../interfaces/participants';
import { SELECT_ALL } from '../../constants';
import { isString } from 'lodash';
import { localStorageManager } from '../../utils/localStorageManager';

import FormControl from '@mui/joy/FormControl';
import classes from './Participants.module.scss';
import { KeyboardArrowDown } from '@mui/icons-material';

const Participants = (props: IParticipants) => {
  const { participants, collectParticipants } = props;
  const { getLocalUserData } = localStorageManager();
  const { email } = getLocalUserData();
  const [personNames, setPersonNames] = useState<string[]>([email]);
  const [selected, setSelected] = useState<string[]>([email]);
  const [checked, setChecked] = useState<boolean[]>([]);

  const isChecked = personNames.length === participants.length;
  const isIndeterminate = personNames.length !== participants.length && personNames.length > 0;

  // TODO: Fix this func to use it in Select
  const handleChange = (event: React.SyntheticEvent | null,
    newValue: Array<string> | null) => {
    console.log(personNames);
    console.log(event);
    console.log(newValue);
    if (newValue && newValue.length) {
      const lastChange = newValue[newValue.length - 1];
      if(lastChange !== 'all') {
        setPersonNames(newValue);
        collectParticipants([...selected]);
      }
    }
    // const { target: { value } } = event;

    // setPersonNames(
    //   isString(value) ? value.split(',') : value
    // );
    // collectParticipants([...selected]);
  };

  const handleSelectAll = () => {
    setChecked(checked.map(() => !!checked.includes(false)));
    setSelected([]);
    setPersonNames([]);
    collectParticipants([]);

    if (personNames.length !== participants.length) {
      setSelected([...participants]);
      setPersonNames([...participants]);
      collectParticipants([...participants]);
    }
  };

  const handleSelect = (name: string) => {
    let updatesdList;

    selected.includes(name) ? updatesdList = selected.filter(item => item !== name) :
      updatesdList = [...selected, name];

    setSelected(updatesdList);
  };

  useEffect(() => {
    if (!isChecked) {
      collectParticipants(selected);
    }

  }, [selected, checked]);

  return (
    <div className={classes.mainContainer}>
      <FormControl className={classes.container}>
        <Select
          multiple
          data-testid='select'
          value={personNames}
          onChange={handleChange}
          // renderValue={selected => {
          //   console.log(selected);
          //   return selected.join(', ');
          // }}
          className={classes.select}
          indicator={<KeyboardArrowDown />}
          sx={{
            [`& .${selectClasses.indicator}`]: {
              transition: '0.2s',
              marginTop: '0',
              [`&.${selectClasses.expanded}`]: {
                transform: 'rotate(-180deg)'
              }
            }
          }}
        >
          <Option value='all' onClick={handleSelectAll}>Select all</Option>
          {/* <MenuItem> */}
          {/* TODO: Replace or fix element */}
          {/* <FormControlLabel
              label={SELECT_ALL}
              control={
                <Checkbox
                  data-testid='select-all-checkboxes'
                  checked={isChecked}
                  indeterminate={isIndeterminate}
                  onChange={handleSelectAll}
                />
              }
            /> */}
          {/* <Checkbox
              data-testid='select-all-checkboxes'
              checked={isChecked}
              indeterminate={isIndeterminate}
              onChange={handleSelectAll}
            />
          </MenuItem> */}
          {participants.map(name => (
            <Option key={name} value={name} onClick={() => handleSelect(name)}><Typography level='body-md'>{name}</Typography></Option>
            // <MenuItem
            //   key={name}
            // >
            //   <Checkbox
            //     data-testid={`select-checkbox-${name}`}
            //     checked={personNames.indexOf(name) > -1}
            //     onChange={() => handleSelect(name)}
            //   />
            //   <ListItemContent><Typography level='body-md'>{name}</Typography></ListItemContent>
            // </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Participants;
