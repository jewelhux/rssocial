import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";
import Moment from "react-moment";
import 'moment/locale/ru';

export function TimeAgo({ time }: { time: number }): ReactElement {

  const messageData = new Date(time)
  return (
    <>
      <Box display='flex' alignItems='center' mt={1} sx={{ gap: '5px', fontSize: 12 }}>
        <Moment fromNow ago>{messageData}</Moment>
        <Typography sx={{ fontSize: 12 }}>назад</Typography>
      </Box>
    </>

  );
}

export default TimeAgo;
