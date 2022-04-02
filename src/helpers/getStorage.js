function getStorage() {
  return JSON.parse(localStorage.getItem(`isLoggedIn`));
}
export default getStorage;
