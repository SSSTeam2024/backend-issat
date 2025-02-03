const timeTableParamsService = require("../../services/TimeTableParamsServices/TimeTableParamsServices");

const addTimeTableParams = async (req, res) => {
  try {
    const {
      day_start_time,
      day_end_time,
      daily_pause_start,
      daily_pause_end,
      semestre1_end,
      semestre1_start,
      semestre2_end,
      semestre2_start,
    } = req.body;

    const timeTableParams = await timeTableParamsService.createTimeTableParams({
      day_start_time,
      day_end_time,
      daily_pause_start,
      daily_pause_end,
      semestre1_end,
      semestre1_start,
      semestre2_end,
      semestre2_start,
    });
    res.json(timeTableParams);
  } catch (error) {
    console.error(error);
  }
};

const updateTimeTableParams = async (req, res) => {
  try {
    const {
      day_start_time,
      day_end_time,
      daily_pause_start,
      daily_pause_end,
      semestre1_end,
      semestre1_start,
      semestre2_end,
      semestre2_start,
    } = req.body;

    const updatedTimeTableParams =
      await timeTableParamsService.updateTimeTableParams({
        day_start_time,
        day_end_time,
        daily_pause_start,
        daily_pause_end,
        semestre1_end,
        semestre1_start,
        semestre2_end,
        semestre2_start,
      });

    if (!updatedTimeTableParams) {
      return res.status(404).send("Params not found!");
    }
    res.json(updatedTimeTableParams);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getTimeTableParams = async (req, res) => {
  try {
    const params = await timeTableParamsService.getTimeTableParams();
    res.json(params);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTimeTableParams,
  updateTimeTableParams,
  addTimeTableParams,
};