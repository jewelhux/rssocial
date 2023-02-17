import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetProfileQuery } from '../../../../redux/features/service/profileService';
import { CustomGrid, CustomGridItem } from '../../../Common/CustomStyleComponents';

function ProfileComponentSecondaryInfo({ id }: { id?: number }): ReactElement {
  const { data: profile } = useGetProfileQuery(id);
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
        <b>{t('profileLng.infoAge')}: </b> {profile?.about.age ?? t('friendLng.hidden')}
      </CustomGridItem>
      <CustomGridItem variant="outlined">
        <b>{t('profileLng.infoStatus')}: </b> {profile?.about.status ?? t('friendLng.hidden')}
      </CustomGridItem>
      <CustomGridItem variant="outlined">
        <b>{t('profileLng.infoInterests')}: </b> {profile?.about.interests ?? t('friendLng.hidden')}
      </CustomGridItem>
      <CustomGridItem variant="outlined">
        <b>{t('profileLng.infoJob')}: </b>
        {profile?.about.work ?? t('friendLng.hidden')}
      </CustomGridItem>
    </CustomGrid>
  );
}

export default ProfileComponentSecondaryInfo;
