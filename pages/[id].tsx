/* eslint-disable @next/next/no-img-element */
import React from "react";

import { useRouter } from "next/router";
import useStores from '../stores/useStores';
import { MyPageContext } from './_app';

import ReactToPrint from "react-to-print";

import { Button, Container, Stack } from "@mui/material";
import DetailItem from '../components/DetailItem'

const Detail = () => {
  const { ItemStore } = useStores();
  const { itemDetail } = ItemStore;
  const componentRef = React.useRef();
  const [data, setData] = React.useState();

  const router = useRouter()
  const id = router?.query?.id

  React.useEffect(() => {
    const fetchDetail = async () => {
      try {
        await ItemStore.getItemDetail(id);
        setData(itemDetail)
      } catch (err) {
        console.error('error', err)
      }
    }

    fetchDetail()
  }, [id])

  const itemData = [
    {
      title: 'Name',
      value: itemDetail?.name || 'Unknown',
    },
    {
      title: 'Age',
      value: itemDetail?.age || 'Unknown',
    },
    {
      title: 'Occupation',
      value: itemDetail?.occupation || 'Unknown',
    },
    {
      title: 'Relatives',
      value: itemDetail?.relatives?.length ? itemDetail.relatives.map(item => item.name) : 'Unknown',
    },
    {
      title: 'First Episode',
      value: itemDetail?.firstEpisode || 'Unknown',
    },
    {
      title: 'Voiced by',
      value: itemDetail?.voicedBy || 'Unknown',
    },
  ]


  return (
    <Container>
      <div style={{ margin: '1rem 0'}}>
        <div ref={componentRef}>
          <Stack direction="row" spacing={3}>
            <img
              src={itemDetail?.image}
              alt={itemDetail?.name || 'image'}
              style={{ width: '400px', height: '500px' }}
            />
            <Stack>
              {itemDetail?.name && itemData.map(item => (
                <DetailItem data={item} key={item.title} />
              ))}
              <ReactToPrint
                trigger={() => <Button variant="contained">Print</Button>}
                content={() => componentRef.current}
              />
            </Stack>
          </Stack>
        </div>
      </div>
    </Container>
  )
}

export async function getServerSideProps({ store, query }: MyPageContext) {
  await store?.ItemStore.getItemDetail(Number(query.id));

  return {
    props: {},
  };
};

export default Detail
