function setStorage(value) {
  localStorage.setItem(`isLoggedIn`, JSON.stringify(value));
}
export default setStorage;
