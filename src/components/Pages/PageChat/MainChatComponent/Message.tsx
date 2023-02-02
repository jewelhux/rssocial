import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";
import { SmallAvatar } from "../../../Common/CustomStyleComponents";

export type DataMessage = {
  currentUser: boolean,
  message: string,
  imgSrc: string,
  timeOfCreateMassage: Date, 
}


function Message(dataMessage: DataMessage): ReactElement {


const createMinutes = (data: Date) => {
const currentData = Date.now()
const minutes = Math.ceil((currentData - data.getTime())/60000)
return minutes

}

  return (
    <Box padding={1} display='flex' sx={{ flexDirection: "column" }}>
      <Box display='flex' marginTop={1} sx={{ flexDirection: dataMessage.currentUser ? 'row-reverse' : 'row' }}>
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
            wordBreak: 'break-all',

          }}
        >
          {dataMessage.message}
        </Typography>
      </Box>
      <Typography variant='subtitle1' display='flex' sx={{ fontSize: 14, flexDirection: `dataMessage.currentUser ? 'row-reverse' : 'row'` }}>
        {createMinutes(dataMessage.timeOfCreateMassage)} минут назад
      </Typography>
    </Box>
  );
}


export default Message;

























