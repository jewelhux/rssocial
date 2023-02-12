import {
  Button,
  CardMedia,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import {
  useGetOwnProfileQuery,
  useUpdateOwnProfileMutation
} from '../../../../redux/features/service/profileService';
import type { SelectChangeEvent } from '@mui/material/Select';
import { RelationshipUserStatus } from '../../../../utils/enum';
import { useEffect, useState } from 'react';
import { DEFAULT_IMAGE } from '../../../../utils/const';

function SettingComponentNewInfo() {
  const { data: dataUser, isError, isLoading } = useGetOwnProfileQuery();
  const [sendProfileUser, { isLoading: isLoadingProfileUser }] = useUpdateOwnProfileMutation();

  const formData = new FormData();

  const [ageUser, setAgeUser] = useState('18');
  const [statusUser, setStatusUser] = useState('');
  const [interestsUser, setInterestsUser] = useState('');
  const [workUser, setWorkUser] = useState('');
  const [avatarUser, setAvatarkUser] = useState<File | null>(null);

  useEffect(() => {
    if (dataUser?.about.status) {
      setStatusUser(dataUser?.about.status);
    }
    if (dataUser?.about.age) {
      setAgeUser(dataUser?.about.age.toString());
    }
    if (dataUser?.about.interests) {
      setInterestsUser(dataUser?.about.interests);
    }
    if (dataUser?.about.work) {
      setWorkUser(dataUser?.about.work);
    }
  }, [dataUser]);

  const handleAgeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      if (+event.target.value > 120 || 18 > +event.target.value) {
        return;
      } else {
        setAgeUser(event.target.value);
        formData.append('age', event.target.value);
      }
    }
  };

  const handleChangeStatusUser = (event: SelectChangeEvent) => {
    setStatusUser(event.target.value);
    formData.append('status', statusUser || RelationshipUserStatus.notIndicated);
  };

  const handleInterestsUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterestsUser(event.target.value);
    formData.append('interests', event.target.value);
  };

  const handleWorkUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkUser(event.target.value);
    formData.append('work', event.target.value);
  };

  const handleAvatarUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAvatarkUser(event.target.files[0]);
      formData.append('avatar', event.target.files[0]);
    }
    event.target.value = '';
  };

  const handleSendProfileUser = () => {
    formData.append('age', ageUser);
    formData.append('status', statusUser);
    formData.append('interests', interestsUser);
    formData.append('work', workUser);
    if (avatarUser) formData.append('avatar', avatarUser);
    sendProfileUser(formData);
  };

  return (
    <>
      {(!dataUser && !isError) || isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            type="number"
            label="Возраст"
            variant="filled"
            value={ageUser}
            onChange={handleAgeUser}
            disabled={isLoadingProfileUser}
          />
          <FormControl variant="filled" sx={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-filled-label">Статус</InputLabel>
            <Select
              sx={{ textAlign: 'left' }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={statusUser}
              onChange={handleChangeStatusUser}
              disabled={isLoadingProfileUser}
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

          <TextField
            type={'text'}
            label="Интересы"
            variant="filled"
            value={interestsUser}
            onChange={handleInterestsUser}
            disabled={isLoadingProfileUser}
          />
          <TextField
            type={'text'}
            id="standard-basic"
            label="Место работы"
            variant="filled"
            value={workUser}
            onChange={handleWorkUser}
            disabled={isLoadingProfileUser}
          />

          <input
            style={{ display: 'none', width: '80%' }}
            type="file"
            name="file"
            id="file"
            accept=".jpg, .jpeg, .png"
            onInput={handleAvatarUser}
          />
          <Button sx={{ width: '100%', padding: 0 }} disabled={isLoadingProfileUser}>
            <label style={{ cursor: 'pointer', width: '100%' }} htmlFor="file">
              Загрузите новое фото
            </label>
          </Button>
          <CardMedia
            component="img"
            image={dataUser?.avatar ?? DEFAULT_IMAGE}
            alt="Image-avatar"
            sx={{ width: '250px' }}
          />
          <Button
            variant="outlined"
            onClick={handleSendProfileUser}
            disabled={isLoadingProfileUser}
          >
            Сохранить настройки
          </Button>
        </>
      )}
    </>
  );
}

export default SettingComponentNewInfo;
