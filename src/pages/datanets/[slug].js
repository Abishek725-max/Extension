import React from 'react';
import { useRouter } from 'next/router';
import DataNetDetails from '../../components/DataNetDetails';
import MainLayout from '@/layouts/main-layout';

const DataNetDetailsPage = () => {
  const router = useRouter()

  return (
    <>
      <MainLayout>
        <DataNetDetails />
      </MainLayout>
    </>
  )
}

export default DataNetDetailsPage;
