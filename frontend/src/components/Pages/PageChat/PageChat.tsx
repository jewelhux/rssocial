import MainChat from './MainChat';
import { useGetOwnProfileQuery } from '../../../redux/features/service/profileService';

function PageChat() {
  const { data } = useGetOwnProfileQuery();
  return (
    <>
      <div>{data?.id}</div>
      <MainChat />
    </>
  );
}

export default PageChat;
