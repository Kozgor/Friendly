import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import classes from './DefaultBoard.module.scss';

const DefaultBoard = () => {
  const a = 0;
  return (
    <Box
      component="section"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        padding: 3,
        paddingRight: 5,
        marginLeft: 0
      }}
    >
      <div className={classes.navbar}>
        <Breadcrumbs aria-label="breadcrumbs" separator="<">
          <Link color="neutral">Back</Link>
          <Typography component="h3">Default Board</Typography>
        </Breadcrumbs>
        <Button
          color="neutral"
          variant="solid"
          type="button"
          aria-label="publish the board"
        >
          Publish
        </Button>
      </div>
      <div className={classes.boardSettings}>

      </div>
    </Box>
  );
};

export default DefaultBoard;
