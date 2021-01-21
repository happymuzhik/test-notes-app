(function() {
  const STORAGE_NAME = 'app_storage';

  const appLocalStorage = {
    set: (propName, value) => {
      let ls = localStorage.getItem(STORAGE_NAME) ? JSON.parse(localStorage.getItem(STORAGE_NAME)) : {};
      ls[propName] = value;
      localStorage.setItem(STORAGE_NAME, JSON.stringify(ls));
    },

    get: (propName) => {
      if (!propName){
        return localStorage.getItem(STORAGE_NAME) ? JSON.parse(localStorage.getItem(STORAGE_NAME)) : {};
      }
      let ls = JSON.parse(localStorage.getItem(STORAGE_NAME));
      return (ls&&ls[propName])?ls[propName]:false;
    },

    reset: () => {
      localStorage.setItem(STORAGE_NAME, JSON.stringify({}));
    }
  };

  window.appLocalStorage = appLocalStorage;
})();
