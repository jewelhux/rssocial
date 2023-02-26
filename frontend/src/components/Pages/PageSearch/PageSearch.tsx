import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import SearchComponentUserCard from './MainSearchComponent/SearchComponentUserCard';
import { useGetAllProfilesQuery } from '../../../redux/features/service/profileService';

function PageSearch() {
  const [searchParams] = useSearchParams();

  //Вытаскиваем имя
  const nameQuery = searchParams.get('name') || '';
  const { t } = useTranslation();

  const { data, isLoading } = useGetAllProfilesQuery(nameQuery);

  return (
    <Box sx={{ width: '100%', typography: 'body1', flexGrow: 1 }}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}
        p={2}
      >
        {isLoading ? (
          <CircularProgress />
        ) : data?.profiles.length ? (
          data.profiles.map((user) => <SearchComponentUserCard key={user.id} user={user} />)
        ) : (
          t('friendLng.empty')
        )}
      </Box>
    </Box>
  );
}

export default PageSearch;
