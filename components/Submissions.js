import moment from "moment";
import { useEffect, useState } from "react";
import _ from "underscore";
import styles from "../styles/Submission.module.css";
const currentYear = [moment(Date.now(), "x").year()];

export default function Submissions({ data }) {
  var totalSubmission = 0;
  var years = [2022];
  var calendarData = [];

  const getSubmissionCalendar = (gfg = {}, leetcode = {}) => {
    let submissioncount = 0;
    const convert = (x) => {
      var Temp = {};
      Object.keys(x).map(
        (e) => (
          (submissioncount += x[e]),
          (Temp[moment(e, "X").format("DD-MM-YYYY")] = x[e])
        )
      );

      return Temp;
    };
    gfg = convert(gfg);
    leetcode = convert(leetcode);
    totalSubmission = submissioncount;
    return { gfg, leetcode };
  };

  const getActiveYears = (gfg = [], leetcode = []) => {
    return _.union(gfg, leetcode).sort().reverse();
  };

  let ActiveYears = getActiveYears(
    data?.gfg?.data?.userCalendar?.activeYears,
    data?.leetcode?.data?.matchedUser?.userCalendar?.activeYears
  );

  let SubmissionCalendar = getSubmissionCalendar(
    data?.gfg?.data?.userCalendar?.submissionCalendar,
    JSON.parse(
      (data &&
        data?.leetcode &&
        data?.leetcode?.data?.matchedUser?.userCalendar?.submissionCalendar) ||
        "{}"
    )
  );

  years.push(ActiveYears);
  calendarData = SubmissionCalendar;

  return (
    <div className={styles.submissionDiv}>
      <div className={styles.totalsubmission}>
        <h2>
          {totalSubmission} <span>Submission in the last year</span>
        </h2>
        <div className={styles.btnYear}>
          <p>{years[0]}</p>
          <img src="/icons/angle-down.svg" />
        </div>
      </div>
      <div className={styles.HeatMapDiv}>
        <HeatMap data={calendarData} />
      </div>
    </div>
  );
}

// COMPONENT
function HeatMap({ data }) {
  var getDaysOfMonth = function (year, month) {
    var temp = [];
    var days = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
    for (var i = 1; i <= days; i++) {
      var monthDateTstamp = moment(
        `${year}-${month}-${i}`,
        "YYYY-MM-DD"
      ).format("X");

      temp.push(monthDateTstamp);
    }
    return temp;
  };

  var getCalendarinYear = function (year) {
    var res = [];
    for (var month = 1; month <= 12; month++) {
      res.push(getDaysOfMonth(year, month));
    }
    return res;
  };

  var calendar = getCalendarinYear(2022);

  function getNumWeeksForMonth(year, month) {
    var date = new Date(year, month - 1, 1);
    var day = date.getDay();
    var numDaysInMonth = new Date(year, month, 0).getDate();
    return Math.ceil((numDaysInMonth + day) / 7);
  }

  function MonthDiv({ timestamp, month }) {
    let year = moment(timestamp[0], "X").year();
    let start = moment(timestamp[0], "X").day();
    let end = moment(timestamp[timestamp.length - 1], "X").day();
    let Totalweeks = getNumWeeksForMonth(year, month);
    var date = 0;

    return (
      <div className={styles.Box}>
        {/* <BuildMonth dates={timestamp} /> */}
        {[...Array(Totalweeks)].map((_, week) => (
          <div className={styles.WeekRow}>
            {[...Array(7).keys()].map((index, day) => {
              if (week == 0 && day < start) {
                return <svg className={styles.PointTrans}></svg>;
              } else if (week == Totalweeks - 1 && day > end) {
                return <svg className={styles.PointTrans}></svg>;
              } else {
                // MAIN POINT
                date += 1;
                var currDate = `${
                  JSON.stringify(date).length == 1 ? "0" + `${date}` : date
                }-${
                  JSON.stringify(month).length == 1 ? "0" + `${month}` : month
                }-${year}`;

                let submissions = {
                  gfg: (data && data?.gfg && data?.gfg[currDate]) || 0,
                  leetcode:
                    (data && data?.leetcode && data?.leetcode[currDate]) || 0,
                };

                let totalsubmission = submissions.gfg + submissions.leetcode;

                return (
                  <div
                    style={{
                      backgroundColor:
                        totalsubmission == 0
                          ? "#FFFFFF36"
                          : totalsubmission <= 2
                          ? "#2CBB5DBF"
                          : totalsubmission <= 8
                          ? "#2CBB5D"
                          : "#6BCF8E",
                    }}
                    className={styles.Point}
                  >
                    <div className={styles.tooltip}>
                      {`${totalsubmission} submissions on ${currDate}`}
                    </div>
                    {/* <rect x="-3em" radius={10} y="-1em">
                      <title color="red" >Hello, World!</title>
                    </rect> */}
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.HeatMap}>
      {calendar.map((_, month) => (
        <MonthDiv timestamp={_} month={month + 1} />
      ))}
    </div>
  );
}
