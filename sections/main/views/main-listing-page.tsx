import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import MedicalPage from '../medical-page';

const breadcrumbItems = [{ title: 'Personal Medical Data', link: '/main' }];

type TEmployeeListingPage = {};

export default async function MainListingPage({ }: TEmployeeListingPage) {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <Separator />
        <div className="grid gap-5 sm:grid-cols-2">
          <MedicalPage />
        </div>
      </div>
    </PageContainer>
  );
}
