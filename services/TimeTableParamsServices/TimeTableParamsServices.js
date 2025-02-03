const timeTableParamsDao = require("../../dao/TimeTableParamsDao/TimeTableParamsDao");

const createTimeTableParams = async (params) => {
  try {
    return await timeTableParamsDao.createTimeTableParams(params);
  } catch (error) {
    console.error("Error when creating time table params", error);
    throw error;
  }
};

const updateTimeTableParams = async (updateData) => {
  return await timeTableParamsDao.updateTimeTableParams(updateData);
};

const getTimeTableParams = async () => {
  const result = await timeTableParamsDao.getTimeTableParams();
  return result;
};

module.exports = {
  getTimeTableParams,
  updateTimeTableParams,
  createTimeTableParams,
};