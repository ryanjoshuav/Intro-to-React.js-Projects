const apiRequest = async (url = "", optionsObj = null, errorMessage = null) => {
  try {
    const resp = await fetch(url, optionsObj);
    if (!resp.ok) throw Error("Please reload the app");
    const data = await resp.json();
  } catch (error) {
    errorMessage = error.message;
  } finally {
    return errorMessage;
  }
};

export default apiRequest;
