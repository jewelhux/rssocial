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
import { useSnackbar } from 'notistack';

function SettingComponentNewInfo() {
  const { t } = useTranslation();
  const { data: dataUser, isError, isLoading } = useGetProfileQuery();
  const [sendProfileUser, { isLoading: isLoadingProfileUser }] = useUpdateOwnProfileMutation();

  const [ageUser, setAgeUser] = useState('18');
  const [statusUser, setStatusUser] = useState('');
  const [interestsUser, setInterestsUser] = useState('');
  const [workUser, setWorkUser] = useState('');
  const [avatarUser, setAvatarUser] = useState<File | null>(null);
  const [avatarUserServer, setAvatarUserServer] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (dataUser?.relationship) {
      setStatusUser(dataUser.relationship);
    }
    if (dataUser?.age) {
      setAgeUser(dataUser.age.toString());
    }
    if (dataUser?.interests) {
      setInterestsUser(dataUser.interests);
    }
    if (dataUser?.work) {
      setWorkUser(dataUser.work);
    }
    if (dataUser?.avatar) {
      setAvatarUserServer(dataUser.avatar);
    }
  }, [dataUser]);

  const handleAgeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setAgeUser(event.target.value);
    }
  };

  const handleAgeUserKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && ageUser.length === 1) {
      setAgeUser('');
    }
  };

  const handleChangeStatusUser = (event: SelectChangeEvent) => {
    setStatusUser(event.target.value);
  };

  const handleInterestsUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterestsUser(event.target.value);
  };

  const handleWorkUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkUser(event.target.value);
  };

  const handleAvatarUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file.size < 5 * 1024 * 1024) {
        setAvatarUser(file);
        setAvatarUserServer(null);
      } else enqueueSnackbar(t('snacks.largeFileSize'), { variant: 'warning' });
    }
    event.target.value = '';
  };

  const handleSendProfileUser = () => {
    const formData = new FormData();
    if (ageUser) formData.append('age', ageUser);
    formData.append('relationship', statusUser || RelationshipUserStatus.notIndicated);
    formData.append('interests', interestsUser);
    formData.append('work', workUser);
    if (avatarUser) formData.append('avatar', avatarUser);
    sendProfileUser(formData)
      .unwrap()
      .then(
        () => enqueueSnackbar(t('snacks.profileUpdated'), { variant: 'success' }),
        () => enqueueSnackbar(t('snacks.udateFailed'), { variant: 'error' })
      );
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
            onKeyDown={handleAgeUserKeyDown}
            disabled={isLoadingProfileUser}
            onBlur={(e) => {
              const value = parseInt(e.target.value, 10);
              if (isNaN(value) || value < 18) {
                setAgeUser('');
              } else if (isNaN(value) || value > 120) {
                setAgeUser('120');
              }
            }}
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
              {Object.values(RelationshipUserStatus).map((status, index) => (
                <MenuItem key={index} value={status}>
                  {t('settingStatus.' + status)}
                </MenuItem>
              ))}
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
