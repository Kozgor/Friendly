import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  Option,
  Typography
} from '@mui/joy';
import { CloseRounded, KeyboardArrowDown } from '@mui/icons-material';
import { MouseEvent, SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import { IParticipants } from '../../interfaces/participants';

import classes from './Participants.module.scss';

const Participants = (props: IParticipants) => {
  const { participants, collectParticipants } = props;
  const [personNames, setPersonNames] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState<boolean[]>([]);
  const selectRef = useRef<HTMLButtonElement | null>(null);

  const isIndeterminate = useMemo(() => personNames.length !== participants.length && personNames.length > 0, [personNames, participants]);
  const isChecked = useMemo(() => personNames.length === participants.length, [personNames, participants]);

  useEffect(() => {
    setPersonNames(participants.map(participant => participant.fullName));
    setSelected(participants.map(participant => participant.email));
    collectParticipants(participants.map(participant => participant.email));
  }, [participants]);

  const handleChange = (event: SyntheticEvent | null,
    newValue: Array<string>) => {
    setPersonNames(newValue);
    collectParticipants([...selected]);
  };

  const handleSelectAll = () => {
    if (personNames.length !== participants.length) {
      setPersonNames(participants.map(participant => participant.fullName));
      setSelected(participants.map(participant => participant.email));
      collectParticipants(participants.map(participant => participant.email));

      return;
    }

    setChecked(checked.map(() => !!checked.includes(false)));
    setSelected([]);
    setPersonNames([]);
    collectParticipants([]);
  };

  const handleSelect = (name: string) => {
    let updatesdList;

    selected.includes(name) ? updatesdList = selected.filter(item => item !== name) :
      updatesdList = [...selected, name];

    setSelected(updatesdList);
  };

  const removeParticipate = (value: string) => {
    const filteredValues = personNames.filter(item => item !== value);

    setSelected(filteredValues);
    setPersonNames(filteredValues);
    collectParticipants(filteredValues);
  };

  const onEndDecorator = () => {
    setChecked(checked.map(() => !!checked.includes(false)));
    setSelected([]);
    setPersonNames([]);
    collectParticipants([]);
  };

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
          onChange={handleChange}
          ref={selectRef}
          indicator={<KeyboardArrowDown />}
          renderValue={selected => (
            <Box sx={{ display: 'flex', gap: '0.55rem' }}>
              {selected.map((selectedOption) => (
                <Chip key={selectedOption.value} variant="soft" sx={{
                  backgroundColor: 'var(--friendly-palette-primary-700)',
                  color: 'var(--friendly-palette-shades-50)',
                  '& .MuiChip-label': {
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': {
                      marginLeft: '5px'
                    }
                  }
                }}>
                  {selectedOption.value}
                  <CloseRounded onClick={() => removeParticipate(selectedOption.value)}
                    sx={{
                      color: 'var(--friendly-palette-primary-700)',
                      backgroundColor: 'var(--friendly-palette-shades-50)',
                      borderRadius: '50%'
                    }} />
                </Chip>
              ))}
            </Box>)}
          sx={{
            width: '100%',
            height: '80px',
            position: 'relative',
            backgroundColor: 'var(--friendly-palette-shades-50)',
            border: 'none',
            '&:hover': {
              backgroundColor: 'var(--friendly-palette-shades-50)'
            },
            [`& .${selectClasses.indicator}`]: {
              transition: '0.2s',
              marginTop: '7px',
              [`&.${selectClasses.expanded}`]: {
                transform: 'rotate(-180deg)'
              }
            },
            '& .MuiBox-root': {
              width: '95%',
              flexFlow: 'row wrap'
            }
          }}
          {...(personNames.length && {
            endDecorator: (
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
                  event.stopPropagation();
                }}
                onClick={onEndDecorator}
                sx={{
                  marginRight: '5px',
                  position: 'absolute',
                  top: '28px',
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
          {participants.map(participant => {
            const { fullName, email } = participant;

            return (
              <Option
                key={email}
                data-testid={`select-option-${email}`}
                value={fullName}
                onClick={() => handleSelect(email)}
              >
                <Typography level='body-md'>{fullName}</Typography>
              </Option>);
            }
          )}
        </Select>
      </section >
    </div >
  );
};

export default Participants;
