import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import axios from 'axios';

import BoardHeader from '../components/BoardHeader/BoardHeader';
import { IColumn } from '../interfaces/column';
import { environment } from '../environment';

import classes from './Admin.module.scss';

const AdminPage = (props: { onSignOut: () => void }) => {
  const timeRef = useRef<HTMLInputElement>(null);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const columnInitValue = {
    columnId: '',
    columnTitle: '',
    columnSubtitle: '',
    columnStyle: '',
    columnAvatar: '',
    columnCards: [],
    isAddingDisabled: true
  };
  const [column, setColumn] = useState<IColumn>(columnInitValue);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columnTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setColumn((prevState) => ({
      ...prevState,
      columnTitle: event.target.value
    }));
  };

  const columnSubTitleChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setColumn((prevState) => ({
      ...prevState,
      columnSubtitle: event.target.value
    }));
  };

  const columnStyleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setColumn((prevState) => ({
      ...prevState,
      columnStyle: event.target.value
    }));
  };

  const columnAvatarChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setColumn((prevState) => ({
      ...prevState,
      columnAvatar: event.target.value
    }));
  };

  const columnInputsCollection = [
    {
      key: 'columnTitle',
      label: 'Column title:',
      type: 'input',
      value: column.columnTitle,
      onChange: columnTitleChangeHandler,
      placeholder: 'Please enter the column title:'
    },
    {
      key: 'columnSubtitle',
      label: 'Column subtitle:',
      type: 'input',
      value: column.columnSubtitle,
      onChange: columnSubTitleChangeHandler,
      placeholder: 'Please enter the column subtitle:'
    },
    {
      key: 'columnStyle',
      label: 'Column style:',
      type: 'color',
      value: column.columnStyle,
      onChange: columnStyleChangeHandler,
      placeholder: 'Please choose the column style:'
    },
    {
      key: 'columnAvatar',
      label: 'Column avatar:',
      type: 'input',
      value: column.columnAvatar,
      onChange: columnAvatarChangeHandler,
      placeholder: 'Please choose the column avatar:'
    }
  ];

  useEffect(() => {
    try {
      // axios.get(`${environment.FRIENDLY_LINK}admin/settings`).then(data => {
      //   console.log(data);
      // });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmitChangeSettings = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const time = (timeRef.current?.children[0] as HTMLInputElement)?.value;

      const response = await axios.post(
        `${environment.FRIENDLY_LINK}admin/settings`,
        { columns, time }
      );
      const responseData = response.data;
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const clearInputs = () => {
    setColumn(columnInitValue);
  };

  const addNewColumn = () => {
    setColumns((prevState) => [
      ...prevState,
      {
        ...column,
        columnId: Math.random().toString(),
        columnStyle: !column.columnStyle ? '#000000' : column.columnStyle
      }
    ]);
    console.log(column);
    clearInputs();
    setIsModalOpen(false);
  };

  const modal = (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
      >
        <Typography id="basic-modal-dialog-title" level="h2">
          Add new column
        </Typography>
        <Typography id="basic-modal-dialog-description">
          Fill in all inputs.
        </Typography>
        <form>
          <Stack spacing={2}>
            {columnInputsCollection.map((columnInput) => (
              <FormControl
                key={columnInput.key}
                className={classes[columnInput.key]}
              >
                <FormLabel htmlFor={columnInput.key}>
                  {columnInput.label}
                </FormLabel>
                <Input
                  className={classes.input}
                  id={columnInput.key}
                  type={columnInput.type}
                  placeholder={columnInput.placeholder}
                  value={columnInput.value}
                  onChange={columnInput.onChange}
                />
              </FormControl>
            ))}
            <Button onClick={addNewColumn}>Add Column</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );

  return (
    <>
      <BoardHeader
        fullName={'Admin'}
        isTimerVisible={false}
        onSignOut={props.onSignOut}
      />
      <form className={classes.settings} onSubmit={handleSubmitChangeSettings}>
        <FormControl className={classes.time}>
          <FormLabel htmlFor="time">Time: (minutes)</FormLabel>
          <Input
            className={classes.input}
            id="time"
            type="number"
            placeholder="Please enter the retrospective time"
            ref={timeRef}
            required
            defaultValue={10}
            slotProps={{
              input: {
                ref: timeRef,
                min: 1
              }
            }}
          />
        </FormControl>
        <section className={classes.columns}>
          <div className={classes['columns__header']}>
            <h3>Columns:</h3>
            <Button onClick={() => setIsModalOpen(true)}>Add Column</Button>
          </div>
          <div className={classes['columns__content']}>
            {columns.map((column) => (
              <div
                key={column.columnId}
                className={classes.column}
                style={{ backgroundColor: column.columnStyle }}
              >
                <img
                  className={classes['column__avatar']}
                  src={column.columnAvatar}
                  alt="avatar for column"
                />
                <div className={classes['column__info']}>
                  <h4>{column.columnTitle}</h4>
                  <p>{column.columnSubtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {modal}
        <Button type="submit">Save</Button>
      </form>
    </>
  );
};

export default AdminPage;
