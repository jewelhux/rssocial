/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        feedLng: {
          title: 'Welcome to the social network RSSocial',
          lastpost: 'Recent user posts:'
        },
        friendLng: {
          empty: 'Empty...',
          myFriend: 'My friends',
          myRequests: 'Application to friends',
          btnProfile: 'Profile',
          btnMessage: 'To write',
          btnDelete: 'Delete',
          btnAdd: 'Add',
          btnReject: 'Reject',
          infoAge: 'Age',
          infoJob: 'Job',
          infoInterests: 'Interests',
          hidden: 'Hidden'
        },
        profileLng: {
          infoAge: 'Age',
          infoJob: 'Job',
          infoInterests: 'Interests',
          infoStatus: 'Marital status',
          feedUser: "User's News feed",
          btnFriend: 'My friends',
          btnSetting: 'Setting',
          btnMessage: 'To write',
          btnOut: 'Exit',
          btnAddPhoto: 'Select a photo',
          btnAddPost: 'Send',
          inputPostText: 'Your message...'
        },
        settingLng: {
          chapterSystem: 'System Settings',
          chapterHuman: 'Personal data',
          settingLng: 'Language selection',
          infoAge: 'Age',
          infoJob: 'Job',
          infoInterests: 'Interests',
          infoStatus: 'Marital status',
          btnAddPhoto: 'Upload a new photo',
          btnSave: 'Save Settings'
        },
        startLng: {
          titleLogin: 'Log in to your account',
          password: 'Password',
          btnLogin: 'Enter',
          btnToRegistration: 'Go to registration',
          titleRegistration: 'Registration',
          firstName: 'Name',
          secondName: 'Surname',
          checkRules: "I accept rules that don't exist",
          btnRegistration: 'Register',
          btnToLogin: 'Go to the entrance',
          messageError: 'Erroneous input',
          wait: 'Wait...',
          close: 'Close',
          incorrectData: 'The user exists or the data is entered incorrectly',
          mail: 'Email'
        }
      }
    },
    ru: {
      translation: {
        feedLng: {
          title: 'Добро пожаловать в социальную сеть RSSocial',
          lastpost: 'Последние посты пользователей:'
        },
        friendLng: {
          empty: 'Пусто...',
          myFriend: 'Мои друзья',
          myRequests: 'Заявка в друзья',
          btnProfile: 'Профиль',
          btnMessage: 'Написать',
          btnDelete: 'Удалить',
          btnAdd: 'Принять',
          btnReject: 'Отклонить',
          infoAge: 'Возраст',
          infoJob: 'Место работы',
          infoInterests: 'Интересы',
          hidden: 'Сыкрыто'
        },
        profileLng: {
          infoAge: 'Возраст',
          infoJob: 'Место работы',
          infoInterests: 'Интересы',
          infoStatus: 'Семейное положение',
          feedUser: 'Лента новостей пользователя',
          btnFriend: 'Мои друзья',
          btnSetting: 'Настройки',
          btnMessage: 'Написать',
          btnOut: 'Выход',
          btnAddPhoto: 'Выберите фото',
          btnAddPost: 'Отправить',
          inputPostText: 'Ваше сообщение...'
        },
        settingLng: {
          chapterSystem: 'Системные настройки',
          chapterHuman: 'Личные данные',
          settingLng: 'Выбор языка',
          infoAge: 'Возраст',
          infoJob: 'Место работы',
          infoInterests: 'Интересы',
          infoStatus: 'Семейное положение',
          btnAddPhoto: 'Загрузить новое фото',
          btnSave: 'Сохранить настройки'
        },
        startLng: {
          titleLogin: 'Вход в аккаунт',
          password: 'Пароль',
          btnLogin: 'Войти',
          btnToRegistration: 'Перейти к регистрации',
          titleRegistration: 'Регистрация',
          firstName: 'Имя',
          secondName: 'Фамилия',
          checkRules: 'Я принимаю правила которых нет',
          btnRegistration: 'Зарегистрироваться',
          btnToLogin: 'Перейти к входу',
          messageError: 'Ошибочный ввод',
          wait: 'Ожидайте...',
          close: 'Закрыть',
          incorrectData: 'Пользователь существует или некоректно введены данные',
          mail: 'Почта'
        }
      }
    }
  },
  lng: 'ru',
  fallbackLng: 'ru',
  detection: {
    order: ['localStorage'],
    cache: ['localStorage']
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
