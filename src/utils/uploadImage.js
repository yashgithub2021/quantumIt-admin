import axiosInstance from "./axiosUtil";
import { getError } from "./error";

export const uploadImage = async (file, token, percentHandler) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        percentHandler(percent);
        console.log(`${loaded}kb of ${total}kb | ${percent}`);
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    };
    const { data } = await axiosInstance.post(
      "/api/admin/image",
      bodyFormData,
      options
    );
    if (data.data.location) {
      console.log("location", data.data.location);
      return data.data.location;
    }
  } catch (err) {
    return { error: getError(err) };
  }
};

export const uploadMultiImage = async (files, token, percentHandler) => {
  try {
    // console.log('files1', typeof files)
    const bodyFormData = new FormData();
    [...files].forEach((file) => {
      bodyFormData.append("image", file);
    });

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        percentHandler(percent);
        console.log(`${loaded}kb of ${total}kb | ${percent}`);
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    };
    const { data } = await axiosInstance.post(
      "/api/admin/multi-image",
      bodyFormData,
      options
    );
    if (data.data.location) {
      return data.data.location;
    }
  } catch (err) {
    return { error: getError(err) };
  }
};
