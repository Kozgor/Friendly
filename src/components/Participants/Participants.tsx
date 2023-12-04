import {
  Checkbox,
  MenuItem
} from '@mui/joy';
import Select from '@mui/joy/Select';
import { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { IParticipants } from '../../interfaces/participants';
import { SELECT_ALL } from '../../constants';
import { isString } from 'lodash';
import { localStorageManager } from '../../utils/localStorageManager';

import FormControl from '@mui/joy/FormControl';
import classes from './Participants.module.scss';

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
  const handleChange = (event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element> | FocusEvent<Element, Element> | null, value: string[]) => {
    console.log(event);
    console.log(value);
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
          // TODO: Fix handleChange func
          // onChange={handleChange}
          renderValue={selected => selected.join(', ')}
          className={classes.select}
        >
          <MenuItem>
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
          </MenuItem>
          {participants.map(name => (
            <MenuItem
              key={name}
            // value={name}
            >
              <Checkbox
                data-testid={`select-checkbox-${name}`}
                checked={personNames.indexOf(name) > -1}
                onChange={() => handleSelect(name)}
              />
              {/* TODO: replace this component with smth to display it in the same way */}
              {/* <ListItemText primary={name} /> */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Participants;
