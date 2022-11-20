import axios from "axios";
import { HOST } from "../config/constants";

const baseUrl = `${HOST}/users`;

export const getUsers = async (options) => {
  const response = await axios.get(baseUrl, options);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};
