import type { FC } from 'react';
import { Box, Container, Button, Grid } from "@mui/material";

import { Link } from '@/components/Link/Link.tsx';

export const IndexPage: FC = () => {
  return (
      <Box position="fixed" bottom={0} left={0} right={0} bgcolor="white" padding={2}>
          <Container maxWidth="xs">
              <Grid container spacing={2}>
                  <Grid item xs={6}>
                      <Link to='/registration' style={{ textDecoration: 'none' }}>
                          <Button variant="contained" fullWidth>
                              Register
                          </Button>
                      </Link>
                  </Grid>
                  <Grid item xs={6}>
                      <Link to='/matches' style={{ textDecoration: 'none' }}>
                          <Button variant="contained" fullWidth>
                              Matches
                          </Button>
                      </Link>
                  </Grid>
              </Grid>
          </Container>
      </Box>
    );
};
