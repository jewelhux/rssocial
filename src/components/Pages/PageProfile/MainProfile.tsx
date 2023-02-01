import { Container, Divider, Paper,} from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement } from 'react';
import ProfileComponentLeft from "./MainProfileComponent/ProfileComponentLeft";
import ProfileComponentRight from "./MainProfileComponent/ProfileComponentRight";

function MainProfile():ReactElement  {
    return (
        <Container sx={{ mb: 2, mt: 10, flexGrow: 1 }}>
            <Paper elevation={8}>
                <Box p={3} sx={{ display: 'flex' }}>
                    <ProfileComponentLeft />
                    <Divider flexItem orientation="vertical"/>
                    <ProfileComponentRight />
                </Box>
            </Paper>
        </Container>
    );
}


export default MainProfile;