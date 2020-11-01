export const setTitle = (title) => {
  return {
    type: "SET_TITLE",
    payload: title,
  };
};
export const setDescription = (description) => {
  return {
    type: "SET_DESCRIPTION",
    payload: description,
  };
};
export const setSaveLocation = (location) => {
  return {
    type: "SET_SAVE_LOCATION",
    payload: location,
  };
};
export const addCoverImage = (image) => {
  return {
    type: "ADD_COVER_IMAGE",
    payload: image,
  };
};
