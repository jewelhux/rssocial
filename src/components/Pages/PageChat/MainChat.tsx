import { Container, Divider, Paper,} from "@mui/material";
import { Box } from "@mui/system";
import ChatComponentHeader from "./MainChatComponent/ChatComponentHeader";
import ChatComponentUsersChating from "./MainChatComponent/ChatComponentUsersChating";
import ChatComponentDialogBox from "./MainChatComponent/ChatComponentDialogBox";
import { ReactElement, useState } from "react";
import { Context } from "../../Context/context";

type ContextType = {
    isOpen: true | false,
    setisOpen: () =>void
  };

function MainChat():ReactElement  {

    const [isOpenUsers, setisOpenUsers] = useState(true);
    
    return (
        <Context.Provider value={isOpenUsers, setisOpenUsers}>
        <Container sx={{display: 'flex', flexDirection: "column", justifyContent:"center", mb: 2, mt: 1, flexGrow: 1 }}>
            <Paper elevation={8}>
                <Box p={1}>
                    <ChatComponentHeader />
                    <Divider />
                    <Box sx={{ display: 'flex' }}>
                        <ChatComponentUsersChating />
                        <Divider flexItem orientation="vertical" />
                        <ChatComponentDialogBox />
                    </Box>
                </Box>
            </Paper>
        </Container>
        </Context.Provider>
    );
}

export default MainChat;
