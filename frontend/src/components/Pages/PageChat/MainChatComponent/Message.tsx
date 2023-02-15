import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { ImageMessage, SmallAvatar } from '../../../Common/CustomStyleComponents';
import TimeAgo from './TimeAgo';
import { Message } from '../../../../redux/features/service/types';
import { useGetProfileByIdQuery } from '../../../../redux/features/service/profileService';
import { DEFAULT_IMAGE } from '../../../../utils/const';

function ChatMessage({ message, own }: { message: Message; own: boolean }): ReactElement {
  const { data } = useGetProfileByIdQuery(message.userId);
  return (
    <Box padding={1} display="flex" sx={{ flexDirection: 'column' }}>
      <Box display="flex" sx={{ flexDirection: 'column' }}>
        <Box display="flex" marginTop={1} sx={{ flexDirection: `${own ? 'row-reverse' : 'row'}` }}>
          <SmallAvatar alt="image" src={data?.avatar ?? DEFAULT_IMAGE} />
          <Typography
            sx={{
              margin: '0 10px',
              borderRadius: '10px',
              backgroundColor: `${own ? '#1876f9' : '#c1c3c7'}`,
              color: `${own ? 'white' : 'black'}`,
              padding: 1,
              hyphens: 'auto',
              maxWidth: '65%',
              wordBreak: 'break-word'
            }}
          >
            {message.text}
          </Typography>
        </Box>
        {message.image && (
          <Box
            display="flex"
            marginTop={1}
            sx={{ flexDirection: `${own ? 'row-reverse' : 'row'}` }}
          >
            <ImageMessage src={message.image} alt="image" />
          </Box>
        )}
      </Box>

      <Box display="flex" sx={{ fontSize: 14, flexDirection: `${own ? 'row-reverse' : 'row'}` }}>
        <TimeAgo time={message.date} />
      </Box>
    </Box>
  );
}

export default ChatMessage;
