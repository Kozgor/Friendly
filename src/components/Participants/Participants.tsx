import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  Option,
  Typography
} from '@mui/joy';
import Select, { selectClasses } from '@mui/joy/Select';
import { useEffect, useRef, useState } from 'react';
import { CloseRounded, KeyboardArrowDown } from '@mui/icons-material';

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
  const selectRef = useRef<HTMLButtonElement | null>(null);
  const isIndeterminate = personNames.length !== participants.length && personNames.length > 0;

  const isChecked = personNames.length === participants.length;

  const changeSelectHeight = (selectedItemsCount: any) => {
    const defaultHeight = 42;
    (document.querySelector('.MuiSelect-root') as HTMLElement).style.height = `${defaultHeight * selectedItemsCount}px`;
  };


  const handleChange = (event: React.SyntheticEvent | null,
    newValue: Array<string> | null) => {
    const lastChange = newValue?.length && newValue[newValue.length - 1];
    if (lastChange !== 'all') {
      setPersonNames(newValue || []);
      collectParticipants([...selected]);
      changeSelectHeight(newValue?.length);
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

  const handleSelecClick = (event: any) => {
    console.log(event);
  };

  const removeParticipate = (event: any) => {
    console.log(event);
  };

  useEffect(() => {
    if (!isChecked) {
      collectParticipants(selected);
    }

  }, [selected, checked]);

  return (
    <div className={classes.mainContainer}>
      <section className={classes.container}>
        <div className={classes.selectAll}>
          <Checkbox
            id='select-all-checkboxes'
            data-testid='select-all-checkboxes'
            checked={isChecked}
            indeterminate={isIndeterminate}
            onChange={handleSelectAll}
            sx={{
              marginRight: '10px'
            }}
          />
          <label htmlFor="select-all-checkboxes">All Team</label>
        </div>
        <Select
          multiple
          data-testid='select'
          value={personNames}
          // onClick={handleSelecClick}
          onChange={handleChange}
          className={classes.select}
          ref={selectRef}
          indicator={<KeyboardArrowDown />}
          renderValue={selected => (
            <Box sx={{ display: 'flex', gap: '0.55rem' }}>
              {selected.map((selectedOption) => (
                <Chip key={selectedOption.value} variant="soft" sx={{
                  backgroundColor: 'var(--friendly-palette-primary-700)',
                  color: 'var(--friendly-palette-shades-50)'
                  // position: 'relative'
                }}
                  endDecorator={<CloseRounded onClick={removeParticipate} sx={{
                    color: 'var(--friendly-palette-primary-700)',
                    backgroundColor: 'var(--friendly-palette-shades-50)',
                    borderRadius: '50%'
                  }} />}>
                  {selectedOption.label}
                </Chip>
              ))}
            </Box>)}
          sx={{
            display: 'block',
            position: 'relative',
            [`& .${selectClasses.indicator}`]: {
              position: 'absolute',
              top: '7px',
              right: '10px',
              transition: '0.2s',
              marginTop: '0',
              [`&.${selectClasses.expanded}`]: {
                transform: 'rotate(-180deg)',
                top: '8px'
              }
            },
            '& .MuiBox-root': {
              flexFlow: 'row wrap'
            },
            '& .MuiSelect-button': {
              maxWidth: '211px'
            }
          }}
          {...(personNames && {
            // display the button and remove select indicator
            // when user has selected a value
            endDecorator: (
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onMouseDown={(event: any) => {
                  // don't open the popup when clicking on this button
                  event.stopPropagation();
                }}
                onClick={() => {
                  setPersonNames([]);
                }}
                sx={{
                  marginRight: '5px',
                  position: 'absolute',
                  top: '4px',
                  right: '20px',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'var(--friendly-palette-neutral-500)'
                  }
                }}
              >
                <CloseRounded />
              </IconButton>
            )
          })}
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
      </section >
    </div >
  );
};

export default Participants;
