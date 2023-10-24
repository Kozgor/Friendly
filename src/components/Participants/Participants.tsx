import {
  Checkbox,
  FormControlLabel,
  MenuItem
} from '@mui/material';
import { useEffect, useState } from 'react';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IParticipants } from '../../interfaces/participants';
import { SELECT_ALL } from '../../constants';
import { uniq } from 'lodash';

import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';

import classes from './Participants.module.scss';

const Participants = (props: IParticipants) => {
  const { participants, collectParticipants } = props;
  const [personNames, setPersonNames] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState<boolean[]>(participants.map(() => false));
  const isChecked = personNames.length === participants.length;
  const isIndeterminate = personNames.length !== participants.length;

  const handleChange = (event: SelectChangeEvent<typeof personNames>) => {
    const {
      target: { value }
    } = event;

    setPersonNames(
      typeof value === 'string' ? value.split(',') : value
    );
    collectParticipants([...selected]);
  };

  const handleSelectAll = () => {
    setChecked(checked.map(() => !!checked.includes(false)));

    if (personNames.length !== participants.length) {
      setPersonNames([...participants]);
      collectParticipants([...participants]);

      return;
    }

    setPersonNames([]);
    collectParticipants([]);
  };

  const handleSelect = (name: string) => {
    const updatedSelected = [...selected, name];
    const uniqueSelected = uniq(updatedSelected);

    setSelected(uniqueSelected);
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
          renderValue={(selected) => selected.join(', ')}
          className={classes.select}
        >
          <MenuItem>
            <FormControlLabel
              label={SELECT_ALL}
              control={
                <Checkbox
                  checked={isChecked}
                  indeterminate={isIndeterminate}
                  data-testid='select-all-checkboxes'
                  onChange={handleSelectAll}
                />
              }
            />
          </MenuItem>
          {participants.map((name) => (
            <MenuItem
              key={name}
              value={name}
              onClick={() => handleSelect(name)}
            >
              <Checkbox
                data-testid={`select-checkbox-${name}`}
                checked={personNames.indexOf(name) > -1}
                />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Participants;
