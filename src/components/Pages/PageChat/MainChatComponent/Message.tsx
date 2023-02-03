import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";
import { ImageMessage, SmallAvatar } from "../../../Common/CustomStyleComponents";
import TimeAgo from "./TimeAgo";
import { DataMessage } from "../../../../utils/Type";



function Message(props: { dataMessage: DataMessage }): ReactElement {
  const { dataMessage } = props;

  const keyImage = dataMessage.imgMassage.length === 0 ? false : true;

  console.log('keyImage', keyImage)

  return (
    <Box padding={1} display='flex' sx={{ flexDirection: "column" }}>
      <Box display='flex' sx={{ flexDirection: "column" }}>

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
        {keyImage &&
        <Box display='flex' marginTop={1} sx={{ flexDirection: `${dataMessage.currentUser ? 'row-reverse' : 'row'}` }}>
          <ImageMessage src={dataMessage.imgMassage} alt="image" />
        </Box>}
      </Box>

      <Box display='flex' sx={{ fontSize: 14, flexDirection: `${dataMessage.currentUser ? 'row-reverse' : 'row'}` }}>
      <TimeAgo time={dataMessage.timeOfCreateMassage} />
      </Box>


    </Box>
  );
}

export default Message;
