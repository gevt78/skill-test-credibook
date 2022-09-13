import React from 'react';
import {
  Container,
  Stack,
  Link,
  Divider,
} from '@mui/material';

const Navigation = (): JSX.Element => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', position: 'sticky', top: 0, zIndex: 100 }}>
      <Container>
        <Stack
          flexDirection="row"
          alignItems="center"
          style={{ padding: '1rem 0'}}
        >
          <Link href="/" style={{ textDecoration: 'none', marginRight: '1rem', color: '#000' }}>
            <Stack style={{ fontSize: '1rem', marginRight: '1rem', lineHeight: '1rem' }}>
              Bob's Burger <span>Character</span>
            </Stack>
          </Link>
          <div style={{ marginRight: '1rem' }}>
            <Link href="/" style={{ textDecoration: 'none', marginRight: '1rem', color: '#000' }}>
              Home
            </Link>
          </div>
          <div>
            <Link href="/about" style={{ textDecoration: 'none', color: '#000' }}>
              <div>About</div>
            </Link>
          </div>
        </Stack>
      </Container>
      <Divider />
    </div>
  );
};

export default Navigation;
