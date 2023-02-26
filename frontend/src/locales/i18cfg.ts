/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        header: {
          search: 'Search...',
          messages: 'Messages',
          profile: 'Profile',
          friends: 'Friends',
          settings: 'Settings',
          logout: 'Log out',
          login: 'Login'
        },
        chat: {
          placeholder: 'Your text...',
          title: 'Conversations'
        },
        feedLng: {
          title: 'Welcome to the social network RSSocial',
          lastpost: 'Recent user posts:'
        },
        friendLng: {
          empty: 'Empty...',
          myFriend: 'My friends',
          myRequests: 'Application to friends',
          btnProfile: 'Profile',
          btnMessage: 'Message',
          btnDelete: 'Unfriend',
          btnRevoke: 'Cancel application',
          btnAdd: 'Add',
          btnRequest: 'Add to friends',
          btnReject: 'Reject',
          infoAge: 'Age',
          infoJob: 'Job',
          infoInterests: 'Interests',
          hidden: 'Not entered',
          acceptedNotification: 'accepted your friend request!',
          requestedNotification: 'wants to be friends!'
        },
        profileLng: {
          infoAge: 'Age',
          infoJob: 'Job',
          infoInterests: 'Interests',
          infoStatus: 'Marital status',
          feedUser: "User's News feed",
          btnFriend: 'My friends',
          btnSetting: 'Settings',
          btnMessage: 'Message',
          btnMyMessages: 'My messages',
          btnOut: 'Log out',
          btnAddPhoto: 'Select a photo',
          btnAddPost: 'Send',
          inputPostText: 'Your message...',
          noUser: 'No such user',
          removeAdmin: 'Remove as Admin'
        },
        settingLng: {
          chapterSystem: 'System Settings',
          chapterHuman: 'Personal data',
          settingLng: 'Language selection',
          settingDarkTheme: 'Theme selection',
          infoAge: 'Age',
          infoJob: 'Job',
          infoInterests: 'Interests',
          infoStatus: 'Marital status',
          btnAddPhoto: 'Upload a new photo',
          btnSave: 'Save Settings'
        },
        settingDarkThemeSelect: {
          lightTheme: 'Light',
          darkTheme: 'Dark'
        },
        settingStatus: {
          notIndicated: 'not indicated',
          itIsComplicated: 'it is complicated',
          inSearch: 'in search',
          notLookingForAnyone: 'not looking for anyone',
          inARelationship: 'in a relationship'
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
          btnToLogin: 'Go to login',
          messageError: 'Error...',
          wait: 'Wait...',
          close: 'Close',
          incorrectData: `The user doesn't exist or the data is entered incorrectly`,
          incorrectDataLogin: 'Please check your input',
          mail: 'Email'
        },
        snacks: {
          largeFileSize: 'File size must be less then 5 megabyes!',
          profileUpdated: 'Profile updated!',
          udateFailed: 'Failed to update!',
          deleteFailed: 'Failed deleting!',
          addFailed: 'failed to add!',
          logout: 'Logout successfull!',
          login: 'Login successfull!',
          loginFailed: 'Wrong email or password!',
          registerFailed: 'User with this email already exists!'
        }
      }
    },
    ru: {
      translation: {
        header: {
          search: 'Поиск...',
          messages: 'Сообщения',
          profile: 'Профиль',
          friends: 'Друзья',
          settings: 'Настройки',
          logout: 'Выход',
          login: 'Вход'
        },
        feedLng: {
          title: 'Добро пожаловать в социальную сеть RSSocial',
          lastpost: 'Последние посты пользователей:'
        },
        chat: {
          placeholder: 'Ваш текст...',
          title: 'Разговоры'
        },
        friendLng: {
          empty: 'Пусто...',
          myFriend: 'Мои друзья',
          myRequests: 'Заявка в друзья',
          btnProfile: 'Профиль',
          btnMessage: 'Написать',
          btnDelete: 'Удалить',
          btnAdd: 'Принять',
          btnRequest: 'Добавить в друзья',
          btnReject: 'Отклонить',
          infoAge: 'Возраст',
          infoJob: 'Место работы',
          infoInterests: 'Интересы',
          hidden: 'Не указано',
          btnRevoke: 'Отменить заявку',
          acceptedNotification: 'принял Вашу заявку в друзья!',
          requestedNotification: 'хочет с Вами дружить!'
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
          btnMyMessages: 'Мои Сообщения',
          btnOut: 'Выход',
          btnAddPhoto: 'Выберите фото',
          btnAddPost: 'Отправить',
          inputPostText: 'Ваше сообщение...',
          noUser: 'Такого пользователья не существует',
          removeAdmin: 'Удалить как админ'
        },
        settingLng: {
          chapterSystem: 'Системные настройки',
          chapterHuman: 'Личные данные',
          settingLng: 'Выбор языка',
          settingDarkTheme: 'Выбор темы',
          infoAge: 'Возраст',
          infoJob: 'Место работы',
          infoInterests: 'Интересы',
          infoStatus: 'Семейное положение',
          btnAddPhoto: 'Загрузить новое фото',
          btnSave: 'Сохранить настройки'
        },
        settingDarkThemeSelect: {
          lightTheme: 'Светлая',
          darkTheme: 'Тёмная'
        },
        settingStatus: {
          notIndicated: 'не указан',
          itIsComplicated: 'всё сложно',
          inSearch: 'в поиске',
          notLookingForAnyone: 'никого не ищу',
          inARelationship: 'в отношениях'
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
          messageError: 'Ошибка...',
          wait: 'Ожидайте...',
          close: 'Закрыть',
          incorrectData: 'Пользователь существует или некоректно введены данные',
          incorrectDataLogin: 'Пожалуйста, проверьте вводимые данные',
          mail: 'Почта'
        },
        snacks: {
          largeFileSize: 'Файл должен быть меньше 5 мегабайт!',
          profileUpdated: 'Профиль обновлен!',
          udateFailed: 'Ошибка при обновлении!',
          deleteFailed: 'Ошибка при удалении!',
          addFailed: 'Ошибка при добавлении!',
          logout: 'Выход выполнен успешно!',
          login: 'Вход выполнен!',
          loginFailed: 'Неверные имейл либо пароль!',
          registerFailed: 'Такой пользователь уже существует!'
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
