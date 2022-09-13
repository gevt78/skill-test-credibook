/* eslint-disable @next/next/no-img-element */
import React from 'react';
import useStores from '../stores/useStores';
import { MyPageContext } from './_app';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button, Container, Grid, Link, Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles'


interface UserData {
  id: number,
  name: string;
  image: string;
  occupation: string,
}

export const CustomPaper = styled(Paper)(() => ({
  cursor: 'pointer',
  background: '#fff',
  position: 'relative',
  boxShadow: 'unset',
  padding: '0.5rem',
  border: '1px solid transparent',
  transition: 'background 0.5s ease-in-out',
  '&:hover ': {
    border: '1px solid #fff',
    '&:before': {
      margin: '-5px', /* !importanté */
      background: 'linear-gradient(to top right, #BDBFBE, #F5F5F5)',
      boxShadow: '1px 2px 20px #EEEEEE',
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    transition: 'margin 0.3s ease-in-out, box-shadow 0.7s ease-in-out',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    borderRadius: 'inherit', /* !importanté */
    background: 'linear-gradient(45deg, transparent, transparent)',
  },
}))

const Home = () => {
  const { ItemStore } = useStores();
  const { itemList } = ItemStore;

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    const title = "Bob's Burger Character List";
    const headers = [["ID", "NAME", "OCCUPATION"]];

    const data = itemList.map((data: UserData) => [data.id, data.name, data.occupation || '-']);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 32);
    (doc as any).autoTable(content);
    doc.save("report.pdf")
  }

  return (
    <Container>
      <Stack style={{ marginTop: '1rem' }} spacing={3}>
        <Stack alignItems="flex-end">
          <Button
            onClick={() => exportPDF()}
            variant="contained"
            style={{ width: '200px' }}
          >
            Generate Report
          </Button>
        </Stack>
        <Stack flexDirection="row">
          <Grid
            container
            spacing={12}
          >
            {itemList.length ? itemList.map((data: UserData) => (
              <Grid
              item
              key={data.id}
              xs={3}
              >
                <CustomPaper>
                  <Link href={`${data.id}`} style={{ textDecoration: 'none', }}>
                    <img
                      src={data?.image}
                      alt={data.name}
                      style={{ width: '100%', height: '320px' }}
                    />
                    <div style={{ fontSize: '1.5rem', color: '#000', lineHeight: '1.75rem' }}>
                      <div>
                        {data.name}
                      </div>
                    </div>
                    <div style={{ fontSize: '1rem', lineHeight: '1.25rem' }}>
                      {data.occupation || '-'}
                    </div>
                  </Link>
                </CustomPaper>
              </Grid>
            )) : (
              <div>There is no item</div>
            )}
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
};

Home.getInitialProps = async ({ store }: MyPageContext) => {
  await store?.ItemStore.getItemList();

  return {
    props: {},
  };
};

export default Home;
