import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import {
  useGetProfileQuery,
  useUpdateOwnProfileMutation
} from '../../../../redux/features/service/profileService';
import type { SelectChangeEvent } from '@mui/material/Select';
import { RelationshipUserStatus } from '../../../../utils/enum';
import { useEffect, useState } from 'react';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { useTranslation } from 'react-i18next';

function SettingComponentNewInfo() {
  const { t } = useTranslation();
  const { data: dataUser, isError, isLoading } = useGetProfileQuery();
  const [sendProfileUser, { isLoading: isLoadingProfileUser }] = useUpdateOwnProfileMutation();

  const formData = new FormData();

  const [ageUser, setAgeUser] = useState('18');
  const [statusUser, setStatusUser] = useState('');
  const [interestsUser, setInterestsUser] = useState('');
  const [workUser, setWorkUser] = useState('');
  const [avatarUser, setAvatarUser] = useState<File | null>(null);
  const [avatarUserServer, setAvatarUserServer] = useState<string | null>(null);

  useEffect(() => {
    if (dataUser?.about.status) {
      setStatusUser(dataUser.about.status);
    }
    if (dataUser?.about.age) {
      setAgeUser(dataUser.about.age.toString());
    }
    if (dataUser?.about.interests) {
      setInterestsUser(dataUser.about.interests);
    }
    if (dataUser?.about.work) {
      setWorkUser(dataUser.about.work);
    }
    if (dataUser?.avatar) {
      setAvatarUserServer(dataUser.avatar);
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
      const file = event.target.files[0];
      setAvatarUser(file);
      setAvatarUserServer(null);
      formData.append('avatar', file);
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
            label={t('settingLng.infoAge')}
            variant="filled"
            value={ageUser}
            onChange={handleAgeUser}
            disabled={isLoadingProfileUser}
            sx={{ width: '100%' }}
          />
          <FormControl variant="filled" sx={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-filled-label">
              {t('settingLng.infoStatus')}
            </InputLabel>
            <Select
              sx={{ textAlign: 'left' }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={statusUser}
              onChange={handleChangeStatusUser}
              disabled={isLoadingProfileUser}
            >
              <MenuItem value={RelationshipUserStatus.notIndicated}>
                {t('settingStatus.notIndicated')}
              </MenuItem>
              <MenuItem value={RelationshipUserStatus.itIsComplicated}>
                {t('settingStatus.itIsComplicated')}
              </MenuItem>
              <MenuItem value={RelationshipUserStatus.inSearch}>
                {t('settingStatus.inSearch')}
              </MenuItem>
              <MenuItem value={RelationshipUserStatus.notLookingForAnyone}>
                {t('settingStatus.notLookingForAnyone')}
              </MenuItem>
              <MenuItem value={RelationshipUserStatus.inARelationship}>
                {t('settingStatus.inARelationship')}
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            type={'text'}
            label={t('settingLng.infoInterests')}
            variant="filled"
            value={interestsUser}
            onChange={handleInterestsUser}
            disabled={isLoadingProfileUser}
            sx={{ width: '100%' }}
          />
          <TextField
            type={'text'}
            id="standard-basic"
            label={t('settingLng.infoJob')}
            variant="filled"
            value={workUser}
            onChange={handleWorkUser}
            disabled={isLoadingProfileUser}
            sx={{ width: '100%' }}
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
              {t('settingLng.btnAddPhoto')}
            </label>
          </Button>
          <img
            src={
              avatarUserServer
                ? avatarUserServer
                : avatarUser
                ? URL.createObjectURL(avatarUser)
                : DEFAULT_IMAGE
            }
            alt="Image-avatar"
            style={{ width: '280px' }}
          />
          <Button
            variant="outlined"
            onClick={handleSendProfileUser}
            disabled={isLoadingProfileUser}
          >
            {t('settingLng.btnSave')}
          </Button>
        </>
      )}
    </>
  );
}

export default SettingComponentNewInfo;
