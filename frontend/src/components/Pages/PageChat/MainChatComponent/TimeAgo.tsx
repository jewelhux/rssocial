import { Box } from '@mui/material';
import { ReactElement } from 'react';
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';

function TimeAgo({ time }: { time: number }): ReactElement {
  return (
    <>
      <Box display="flex" alignItems="center" mt={1} sx={{ gap: '5px', fontSize: 12 }}>
        {formatDistance(new Date(time), new Date(), { addSuffix: true, locale: ru })}
      </Box>
    </>
  );
}

export default TimeAgo;
