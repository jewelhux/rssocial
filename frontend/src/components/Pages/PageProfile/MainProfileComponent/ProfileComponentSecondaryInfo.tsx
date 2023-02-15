import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetOwnProfileQuery } from '../../../../redux/features/service/profileService';
import { CustomGrid, CustomGridItem } from '../../../Common/CustomStyleComponents';

function ProfileComponentSecondaryInfo(): ReactElement {
  const { data: user } = useGetOwnProfileQuery();
  const { t } = useTranslation();

  return (
    <CustomGrid
      sx={{
        maxWidth: 600,
        alignSelf: 'center',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }
      }}
    >
      <CustomGridItem variant="outlined">
        <b>{t('profileLng.infoAge')}: </b> {user?.about.age ?? ''}
      </CustomGridItem>
      <CustomGridItem variant="outlined">
        <b>{t('profileLng.infoStatus')}: </b> {user?.about.status ?? ''}
      </CustomGridItem>
      <CustomGridItem variant="outlined">
        <b>{t('profileLng.infoInterests')}: </b> {user?.about.interests ?? ''}
      </CustomGridItem>
      <CustomGridItem variant="outlined">
        <b>{t('profileLng.infoJob')}: </b>
        {user?.about.work ?? ''}
      </CustomGridItem>
    </CustomGrid>
  );
}

export default ProfileComponentSecondaryInfo;
