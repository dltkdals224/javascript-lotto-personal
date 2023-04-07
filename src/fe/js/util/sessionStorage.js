/**
 * 세션 스토리지에 값을 저장
 * @param {string} key
 * @param {any} value
 */
export const setSessionStorageItem = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * 세션 스토리지에서 값을 가져오기
 * @param {string} key
 * @returns {any}
 */
export const getSessionStorageItem = key => {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
