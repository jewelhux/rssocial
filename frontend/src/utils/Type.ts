export type DataMessage = {
  currentUser: boolean;
  message: string;
  imgSrc: string;
  imgMassage: string;
  timeOfCreateMassage: number;
};

export type DataOfUsers = {
  isOnlineUser: boolean;
  nameOfUser: string;
  imgOfUser: string;
};
export type ModeDark = 'light' | 'dark';

export type ThemeContextType = {
  modeDark: ModeDark;
  setModeDark: (mode: 'light' | 'dark') => void;
};
