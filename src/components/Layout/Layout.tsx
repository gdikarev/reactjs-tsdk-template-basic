import React from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useAuth } from "@/hooks/useAuth.tsx";
import { routes } from "@/navigation/routes.tsx";

import './styles.css';

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', p: 0 }}>
            <Box component="main" sx={{ display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </Box>
            <Box
                component="footer"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    backgroundColor: '#f1f1f1',
                    position: 'relative',
                    bottom: 0,
                }}
            >
                {isAuthenticated && (
                    <>
                        <PermIdentityIcon className='footer-icons' />
                        <FavoriteBorderIcon className='footer-icons' onClick={() => navigate(routes.matches)} />
                        <SettingsOutlinedIcon className='footer-icons' />
                    </>
                )}
            </Box>
        </Container>
    );
};

export default Layout;