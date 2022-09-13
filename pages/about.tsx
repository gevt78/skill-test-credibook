import React from "react";

import {
  Container,
  Link,
  Stack,
} from "@mui/material";

import DetailItem from '../components/DetailItem'

const About = () => {
  const data = [
    {
      title: 'State Management',
      value: (<Link href="https://mobx.js.org/README.html">Mobx</Link>),
    },
    {
      title: 'Theme',
      value: (<Link href="https://mui.com/">Material UI</Link>),
    },
    {
      title: 'API',
      value: (<Link href="https://bobs-burgers-api-ui.herokuapp.com/documentation#introduction">bobs-burgers-api</Link>),
    },
  ]
  return (
    <Container>
      <Stack style={{ marginTop: '1rem'}}>
        <Stack style={{ fontSize: '1.5rem', fontWeight: '600' }}>
          Tech Stack
        </Stack>
        {data.map(item => (
          <DetailItem data={item} key={item.title} />
        ))}
      </Stack>
    </Container>
  )
}

export default About
