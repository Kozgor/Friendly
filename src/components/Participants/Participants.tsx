import {
  Option,
  Typography
} from '@mui/joy';
import Select, { selectClasses } from '@mui/joy/Select';
import { useEffect, useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import { KeyboardArrowDown } from '@mui/icons-material';

import { IParticipants } from '../../interfaces/participants';
import { localStorageManager } from '../../utils/localStorageManager';

import classes from './Participants.module.scss';

const Participants = (props: IParticipants) => {
  const { participants, collectParticipants } = props;
  const { getLocalUserData } = localStorageManager();
  const { email } = getLocalUserData();
  const [personNames, setPersonNames] = useState<string[]>([email]);
  const [selected, setSelected] = useState<string[]>([email]);
  const [checked, setChecked] = useState<boolean[]>([]);

  const isChecked = personNames.length === participants.length;

  const handleChange = (event: React.SyntheticEvent | null,
    newValue: Array<string> | null) => {
    const lastChange = newValue && newValue.length && newValue[newValue.length - 1];
    if (lastChange !== 'all') {
      setPersonNames(newValue || []);
      collectParticipants([...selected]);
    }
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
          {participants.map(name => (
            <Option
              key={name}
              data-testid={`select-option-${name}`}
              value={name}
              onClick={() => handleSelect(name)}
            ><Typography level='body-md'>{name}</Typography></Option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Participants;
