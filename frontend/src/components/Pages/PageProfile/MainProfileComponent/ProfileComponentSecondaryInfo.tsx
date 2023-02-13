import { ReactElement } from 'react';
import { useGetOwnProfileQuery } from '../../../../redux/features/service/profileService';
import { CustomGrid, CustomGridItem } from '../../../Common/CustomStyleComponents';

function ProfileComponentSecondaryInfo(): ReactElement {
  const { data: user } = useGetOwnProfileQuery();

  return (
    <CustomGrid
      sx={{
        maxWidth: 600,
        alignSelf: 'center',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }
      }}
    >
      <CustomGridItem variant="outlined">
        <b>Возраст: </b> {user?.about.age ?? ''}
      </CustomGridItem>
      <CustomGridItem variant="outlined">
        <b>Семейное положение: </b> {user?.about.status ?? ''}
      </CustomGridItem>
      <CustomGridItem variant="outlined">
        <b>Интересы: </b> {user?.about.interests ?? ''}
      </CustomGridItem>
      <CustomGridItem variant="outlined">
        <b>Место работы: </b>
        {user?.about.work ?? ''}
      </CustomGridItem>
    </CustomGrid>
  );
}

export default ProfileComponentSecondaryInfo;
