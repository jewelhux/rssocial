import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import { ReactElement } from 'react';
import { Message } from '../../../../redux/features/service/types';
import { useGetProfileByIdQuery } from '../../../../redux/features/service/profileService';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';

const SpeechBubble = styled('div')<{ own: boolean }>`
  border-radius: 1.15rem;
  line-height: 1.25;
  position: relative;
  overflow-wrap: anywhere;
  margin-bottom: 15px;
  padding: 0.8rem;
  ${(props) =>
    props.own
      ? 'align-self: flex-end; background-color: #248bf5; color: #fff;'
      : 'align-self: flex-start; background-color: #e5e5ea; color: #000;'};
  &::before,
  &::after {
    bottom: -0.1rem;
    content: '';
    height: 1rem;
    position: absolute;
    z-index: -1;
  }
  ${(props) =>
    props.own
      ? `
      &::before {
        border-bottom-left-radius: 0.8rem 0.7rem;
        border-right: 1rem solid #248bf5;
        right: -0.35rem;
        transform: translate(0, -0.1rem);
      }
      &::after {
        background-color: ${props.theme.palette.background.default};
        border-bottom-left-radius: 0.5rem;
        right: -40px;
        transform:translate(-30px, -2px);
        width: 10px;
      }
  `
      : `
      &::before {
        border-bottom-right-radius: 0.8rem 0.7rem;
        border-left: 1rem solid #e5e5ea;
        left: -0.35rem;
        transform: translate(0, -0.1rem);
      }
      &::after {
        background-color: ${props.theme.palette.background.default};
        border-bottom-right-radius: 0.5rem;
        left: 20px;
        transform: translate(-30px, -2px);
        width: 10px;
      }
  `}
`;

const MessageWrapper = styled('div')<{ own: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.own ? 'flex-end' : 'flex-start')};
  align-self: ${(props) => (props.own ? 'flex-end' : 'flex-start')};
  width: 75%;
`;

const MessageContainer = styled('div')<{ own: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.own ? 'row-reverse' : 'row')};
  align-items: flex-end;
  gap: 12px;
`;

const BubbleContainer = styled('div')<{ own: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.own ? 'flex-end' : 'flex-start')};
  gap: 5px;
`;

const MessageImage = styled('img')`
  border-radius: 1.15rem;
  width: 100%;
  height: 30vh;
  object-fit: cover;
`;

function ChatMessage({ message, own }: { message: Message; own: boolean }): ReactElement {
  const { data: profile } = useGetProfileByIdQuery(message.userId);
  const isNotMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <Box padding={1} display="flex" sx={{ flexDirection: 'column' }}>
      <MessageWrapper own={own}>
        <MessageContainer own={own}>
          {isNotMobile && <Avatar alt="image" src={profile?.avatar ?? DEFAULT_IMAGE} />}
          <BubbleContainer own={own}>
            {message.image && <MessageImage src={message.image}></MessageImage>}
            {message.text && <SpeechBubble own={own}>{message.text}</SpeechBubble>}
          </BubbleContainer>
        </MessageContainer>
        <Typography fontSize={12} mt={1}>
          {formatDistance(new Date(message.date), new Date(), { addSuffix: true, locale: ru })}
        </Typography>
      </MessageWrapper>
    </Box>
  );
}

export default ChatMessage;
