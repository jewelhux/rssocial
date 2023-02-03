import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import FeedComponentFeed from './MainFeedComponent/FeedComponentFeed'

function PageFeed() {
  return (
    <Container sx={{ mb: 2, mt: 6, flexGrow: 1 }}>
      <FeedComponentFeed />
    </Container>
  );
}

export default PageFeed;