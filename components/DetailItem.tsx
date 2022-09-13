import React from 'react'
import { Stack } from '@mui/material';

const DetailItem = ({ data }) => {
  return (
    <Stack style={{ marginBottom: '1rem' }}>
      <Stack style={{ fontSize: '0.875rem', lineHeight: '1.75rem', color: '#BDBFBE' }}>
        {data.title}:
      </Stack>
      <Stack style={{ fontSize: '1.25rem', lineHeight: '1.75rem' }}>
        {data.value}
      </Stack>
    </Stack>
  )
}

export default DetailItem
