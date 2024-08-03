import React, { ReactNode } from 'react';
import { Box, Paper } from "@mui/material";

interface ContainerProps {
    children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0 }}>
            <Paper elevation={3}
                   sx={{
                       padding: 2,
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center',
                       height: 'calc(100vh - 88px)',
                       width: '100%'
                   }}>
                {children}
            </Paper>
        </Box>
    );
};

export default Container;