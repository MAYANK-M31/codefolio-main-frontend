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

  //   function BuildMonth({ dates }) {
  //     for (let i in dates) {
  //         console.log(i);

  //       for (let j = 0; j <= 6; j++) {
  //         if (j == moment(dates[i], "X").day()) {
  //           return <div className={styles.Point}></div>;
  //         } else {
  //           return (
  //             <div
  //               style={{ color: "transparent" }}
  //               className={styles.Point}
  //             ></div>
  //           );
  //         }
  //       }
  //     }
  //   }

  function getNumWeeksForMonth(year, month) {
    var date = new Date(year, month - 1, 1);
    var day = date.getDay();
    var numDaysInMonth = new Date(year, month, 0).getDate();
    return Math.ceil((numDaysInMonth + day) / 7);
  }

  function MonthDiv({ timestamp, month }) {
      let year = moment(timestamp,"X").year()
    return (
      <div className={styles.Box}>
        {/* <BuildMonth dates={timestamp} /> */}
        {[...Array(getNumWeeksForMonth(year,month))].map((_, day) => (
          <div className={styles.WeekRow}>
            {[...Array(7).keys()].map((index) => (
              <svg className={styles.Point}>{index}</svg>
            ))}
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
