import { Box } from '@mui/joy';

const NoContent = (props: { message: string }) => {
  const { message } = props;

  return (
    <Box aria-description={message} sx={{ width: '100%', textAlign: 'center' }}>
      <h2>{message}</h2>
    </Box>
  );
};

export default NoContent;
