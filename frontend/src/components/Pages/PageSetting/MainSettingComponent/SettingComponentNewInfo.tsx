import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useGetOwnProfileQuery } from '../../../../redux/features/service/profileService';
import type { SelectChangeEvent } from '@mui/material/Select';
import { RelationshipUserStatus } from '../../../../utils/enum';
import { useEffect, useState } from 'react';

function SettingComponentNewInfo() {
  const { data: dataUser, isError } = useGetOwnProfileQuery();

  const [age, setAge] = useState('');

  useEffect(() => {
    if (dataUser?.about.status) setAge(dataUser?.about.status);
  }, [dataUser]);

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <>
      {!dataUser && !isError ? (
        <CircularProgress />
      ) : (
        <>
          <TextField value={dataUser?.about.age || ''} label="Возраст" variant="filled" />
          <FormControl variant="filled" sx={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-filled-label">Статус</InputLabel>
            <Select
              sx={{ textAlign: 'left' }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChangeStatus}
            >
              <MenuItem value={RelationshipUserStatus.notIndicated}>
                {RelationshipUserStatus.notIndicated}
              </MenuItem>
              <MenuItem value={RelationshipUserStatus.itIsComplicated}>
                {RelationshipUserStatus.itIsComplicated}
              </MenuItem>
              <MenuItem value={RelationshipUserStatus.inSearch}>
                {RelationshipUserStatus.inSearch}
              </MenuItem>
              <MenuItem value={RelationshipUserStatus.notLookingForAnyone}>
                {RelationshipUserStatus.notLookingForAnyone}
              </MenuItem>
              <MenuItem value={RelationshipUserStatus.inARelationship}>
                {RelationshipUserStatus.inARelationship}
              </MenuItem>
            </Select>
          </FormControl>

          <TextField value={dataUser?.about.interests || ''} label="Интересы" variant="filled" />
          <TextField
            value={dataUser?.about.work || ''}
            id="standard-basic"
            label="Место работы"
            variant="filled"
          />
        </>
      )}
    </>
  );
}

export default SettingComponentNewInfo;
