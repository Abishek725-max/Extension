import appAxios from "./axios-utils";

export const createDataSets = (data) => appAxios.post("/datasets/create", data);
export const dataSetsList = () => appAxios.get("/datasets");
