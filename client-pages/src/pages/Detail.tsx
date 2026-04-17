import { useParams, useSearchParams } from 'react-router';

import { PageLayout } from '../shared/layout/page-layout/PageLayout';


export const Detail = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();


  return (
    <PageLayout title='Detalhes'>
      Detail {id} {searchParams.get('filter')}
    </PageLayout>
  );
};
