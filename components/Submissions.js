import moment from "moment";
import styles from "../styles/Submission.module.css";

function HeatMap() {
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
                return (
                  <div className={styles.Point}>
                    <div className={styles.tooltip}>
                      <p style={{ color: "red" }}>
                        {date}/{month}/{year}
                      </p>
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

export default function Submissions() {
  return (
    <div className={styles.submissionDiv}>
      <div className={styles.totalsubmission}>
        <h2>
          697 <span>Submission in the last year</span>
        </h2>
        <div className={styles.btnYear}>
          <p>2022</p>
          <img src="/icons/angle-down.svg" />
        </div>
      </div>

      <HeatMap />
    </div>
  );
}
