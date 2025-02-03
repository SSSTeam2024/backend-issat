const timeTableParamsModel = require("../../model/TimeTableParamsModel/TimeTableParamsModel");

const createTimeTableParams = async (params) => {
  return await timeTableParamsModel.create(params);
};

const getTimeTableParams = async () => {
  return await timeTableParamsModel.find();
};

const updateTimeTableParams = async (updateData) => {
  let params = await timeTableParamsModel.find();
  console.log(params);
  return await timeTableParamsModel.findByIdAndUpdate(params[0]._id, updateData, { new: true });
};

module.exports = {
  createTimeTableParams,
  getTimeTableParams,
  updateTimeTableParams,
};