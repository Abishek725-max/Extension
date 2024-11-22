import React from 'react';
import MainLayout from '@/layouts/main-layout';
import DataNetTabs from '../../components/DataNet';

const DataNets = () => {
  return (
    <>
      <MainLayout>
        <DataNetTabs gridClassName='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5' />
      </MainLayout>
    </>
  )
}

export default DataNets;
