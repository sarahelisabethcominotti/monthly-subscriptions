import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { SubscriptionContext } from "../SubscriptionContext";

export const apiUrl = "https://monthly-subscriptions.onrender.com";

export const Calendar = () => {
  const {listOfSubscriptions, setListOfSubscriptions} = useContext(SubscriptionContext)
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState([]);

  const deleteSubscription = (id) => {
    Axios.delete(`${apiUrl}/deleteSubscription/${id}`)
      .then((response) => {
        setListOfSubscriptions(
          listOfSubscriptions.filter((subscription) => subscription._id !== id)
        );
        alert("SUBSCRIPTION DELETED SUCCESSFULLY");
      })
      .catch((error) => {
        console.error("There was an error deleting the subscription!", error);
      });
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // current month
  const generateCalendarDays = () => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    let calendarDays = [];

    // previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
      calendarDays.push({
        day: lastDateOfPrevMonth - i + 1,
        isCurrentMonth: false,
      });
    }

    // current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: true,
        isToday:
          i === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear(),
      });
    }

    // next month
    const remainingDays = 42 - calendarDays.length; // Total 6 weeks (6*7 = 42 days)
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    setDays(calendarDays);
  };

  useEffect(() => {
    generateCalendarDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  // buttons
  const handlePrevNext = (direction) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + direction); // -1 for prev, +1 for next
    setDate(newDate);
  };

  const dayDates = listOfSubscriptions.map((subscription) => {
    const dateForDay = new Date(subscription.start);
    const dayDate = dateForDay.getDate();
    return dayDate;
  });

  console.log(dayDates);

  return (
    <>
      <div className="calendar-container">
        <header className="calendar-header">
          <p className="calendar-current-date">
            {months[date.getMonth()]} {date.getFullYear()}
          </p>
          <div className="calendar-navigation">
            <span
              id="calendar-prev"
              className="material-symbols-rounded"
              onClick={() => handlePrevNext(-1)}
            >
              chevron_left
            </span>
            <span
              id="calendar-next"
              className="material-symbols-rounded"
              onClick={() => handlePrevNext(1)}
            >
              chevron_right
            </span>
          </div>
        </header>

        <div className="calendar-body">
          <ul className="calendar-weekdays">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul className="calendar-dates">
            {days.map((day, index) => (
              <li
                key={index}
                className={`${day.isCurrentMonth ? "" : "inactive"} ${
                  day.isToday ? "active" : ""
                } column ${
                  day.isCurrentMonth && dayDates.includes(day.day)
                    ? "show-summary"
                    : ""
                }`}
              >
                <p>{day.day}</p>
                {listOfSubscriptions
                  .filter((sub) => {
                    const subscriptionDay = new Date(sub.start).getDate();
                    return subscriptionDay === day.day;
                  })
                  .map((sub, index) => (
                    <div key={index} className="subscription-info">
                      {/* add logo with api */}
                      <p>{sub.name}</p>
                      <p>£{sub.price}</p>
                      <button className="delete-button" onClick={() => deleteSubscription(sub._id)}>
                        <span
                          className="material-symbols-rounded"
                        >
                          delete
                        </span>
                      </button>
                    </div>
                  ))}
                {/* making appear a dot when there is a subscription happening on that day */}
                <p>{dayDates.includes(day.day) ? "•" : ""}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Calendar