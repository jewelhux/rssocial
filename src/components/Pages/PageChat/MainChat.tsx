import { Container, Divider, Paper,} from "@mui/material";
import { Box } from "@mui/system";
import ChatComponentHeader from "./MainChatComponent/ChatComponentHeader";
import ChatComponentUsersChating from "./MainChatComponent/ChatComponentUsersChating";
import ChatComponentDialogBox from "./MainChatComponent/ChatComponentDialogBox";
import { ReactElement } from "react";

function MainChat():ReactElement  {
    return (
        <Container sx={{ mb: 2, mt: 1, flexGrow: 1 }}>
            <Paper elevation={8}>
                <Box p={3}>
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
    );
}


export default MainChat;