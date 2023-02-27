import { Avatar, Box, CircularProgress, Stack, Typography, useMediaQuery } from '@mui/material';
import { ReactElement } from 'react';
import { Message, SendStatus } from '../../../../redux/features/service/types';
import { useGetProfileQuery } from '../../../../redux/features/service/profileService';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { formatDistance } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
  const { i18n } = useTranslation();
  const { data: profile } = useGetProfileQuery(message.user ? message.user : undefined);
  const isNotMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <Box padding={1} display="flex" sx={{ flexDirection: 'column' }}>
      <MessageWrapper own={own}>
        <MessageContainer own={own}>
          {isNotMobile && <Avatar alt="image" src={profile?.avatar || DEFAULT_IMAGE} />}
          <BubbleContainer own={own}>
            {message.image && <MessageImage src={message.image}></MessageImage>}
            {message.text && <SpeechBubble own={own}>{message.text}</SpeechBubble>}
          </BubbleContainer>
        </MessageContainer>
        <Stack flexDirection={'row'} gap={'10px'} alignItems={'flex-end'}>
          <Typography fontSize={12} mt={1}>
            {formatDistance(new Date(message.createdAt), new Date(), {
              addSuffix: true,
              locale: i18n.language === 'en' ? enUS : ru
            })}
          </Typography>
          {message.status && (
            <Box width={20} height={20}>
              {message.status === SendStatus.pending ? (
                <CircularProgress size={15} />
              ) : message.status === SendStatus.success ? (
                <DoneIcon fontSize="small" />
              ) : (
                <ErrorOutlineIcon fontSize="small" color="error" />
              )}
            </Box>
          )}
        </Stack>
      </MessageWrapper>
    </Box>
  );
}

export default ChatMessage;
