import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";
import { SmallAvatar } from "../../../Common/CustomStyleComponents";
import 'moment/locale/ru';
import TimeAgo from "./TimeAgo";
import { DataMessage } from "../../../Types/Type";

function Message(props: { dataMessage: DataMessage }): ReactElement {
  const { dataMessage } = props;

  return (
    <Box padding={1} display='flex' sx={{ flexDirection: "column" }}>
      <Box display='flex' marginTop={1} sx={{ flexDirection: `${dataMessage.currentUser ? 'row-reverse' : 'row'}` }}>
        <SmallAvatar alt="image" src={dataMessage.imgSrc} />
        <Typography
          sx={{
            margin: '0 10px',
            borderRadius: '10px',
            backgroundColor: `${dataMessage.currentUser ? '#1876f9' : '#c1c3c7'}`,
            color: `${dataMessage.currentUser ? 'white' : 'black'}`,
            padding: 1,
            hyphens: 'auto',
            maxWidth: '65%',
            wordBreak: 'break-word',
          }}
        >
          {dataMessage.message}
        </Typography>
      </Box>
      <Box display='flex' sx={{ fontSize: 14, flexDirection: `${dataMessage.currentUser ? 'row-reverse' : 'row'}` }}>
      <TimeAgo time={dataMessage.timeOfCreateMassage} />
      </Box>
    </Box>
  );
}

export default Message;
