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
import { isString } from 'lodash';

import classes from './Participants.module.scss';

const Participants = (props: IParticipants) => {
  const { participants, collectParticipants } = props;
  const [personNames, setPersonNames] = useState<string[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [checkedParticipants, setCheckedParticipants] = useState<boolean[]>([]);
  const selectRef = useRef<HTMLButtonElement | null>(null);

  const getEmails = () => participants.map(participant => participant.email);
  const getFullNames = () => participants.map(participant => participant.fullName);

  const isParticipantsIndeterminate = useMemo(() => personNames.length !== participants.length
    && personNames.length > 0, [personNames, participants]);
  const isAllParticipantsChecked = useMemo(() => personNames.length === participants.length, [personNames, participants]);

  const initializeParticipants = () => {
    setPersonNames(getFullNames());
    setSelectedParticipants(getEmails());
    collectParticipants(getEmails());
  };

  const deInitializeParticipants = () => {
    setPersonNames([]);
    setSelectedParticipants([]);
    collectParticipants([]);
    setCheckedParticipants(checkedParticipants.map(() => !!checkedParticipants.includes(false)));
  };

  const onEndDecorator = () => {
    deInitializeParticipants();
  };

  useEffect(() => {
    initializeParticipants();
  }, [participants]);

  const handleSelectChange = (event: SyntheticEvent | null,
    newValue: Array<string>) => {
    setPersonNames(newValue);
    collectParticipants([...selectedParticipants]);
  };

  const handleSelectAllParticipants = () => {
    setCheckedParticipants(checkedParticipants.map(() => !!checkedParticipants.includes(false)));
    deInitializeParticipants();

    if (personNames.length !== participants.length) {
      initializeParticipants();
    }
  };

  const handleSelectParticipant = (name: string) => {
    let updatesdList;

    selectedParticipants.includes(name) ? updatesdList = selectedParticipants.filter(item => item !== name) :
      updatesdList = [...selectedParticipants, name];

      setSelectedParticipants(updatesdList);
  };

  const removeParticipate = (label: React.ReactNode | string, value: string) => {
    if (isString(label)) {
      const filteredLabels = selectedParticipants.filter(item => item !== label);

      setSelectedParticipants(filteredLabels);
      collectParticipants(filteredLabels);
    }

    const filteredValues = personNames.filter(item => item !== value);

    setPersonNames(filteredValues);
  };

  return (
    <div className={classes.mainContainer}>
      <section className={classes.container}>
        <div className={classes.selectAll}>
          <Checkbox
            id='select-all-checkboxes'
            data-testid='select-all-checkboxes'
            checked={isAllParticipantsChecked}
            indeterminate={isParticipantsIndeterminate}
            onChange={handleSelectAllParticipants}
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
          onChange={handleSelectChange}
          ref={selectRef}
          indicator={<KeyboardArrowDown />}
          renderValue={selected => (
            <Box sx={{ display: 'flex', gap: '0.55rem' }}>
              {selected.map((selectedOption) => {
                const fullName = selectedOption.value;
                const email = selectedOption.label;

                return (
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
                    {fullName}
                    <CloseRounded onClick={() => removeParticipate(email, fullName)}
                      sx={{
                        color: 'var(--friendly-palette-primary-700)',
                        backgroundColor: 'var(--friendly-palette-shades-50)',
                        borderRadius: '50%'
                      }} />
                  </Chip>
                );
              })}
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
                label={email}
                onClick={() => handleSelectParticipant(email)}
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
