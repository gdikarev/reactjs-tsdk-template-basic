import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import {Box, Container, Button} from "@mui/material";
import {routes} from "@/navigation/routes.tsx";

export const IndexPage: FC = () => {
  return (
      <Link to={routes.registration}>
          <Box position="fixed" bottom={0} left={0} right={0} bgcolor="white" padding={2}>
              <Container maxWidth="xs">
                  <Box display="flex" justifyContent="center">
                      <Button variant="contained" fullWidth>
                          Register
                      </Button>
                  </Box>
              </Container>
          </Box>
      </Link>
    );
};
