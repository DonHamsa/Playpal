import { OptionToggle } from "./OptionToggle/OptionToggle";
import { useState, useEffect } from "react";
import styles from "./UserParkOptions.module.css";

export default function UserParkOptions({
  setUserSelectParkStatus,
  setWhichChard,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  bringBall,
  setBringBall,
  timeSlots,
  setTimeSlots,
  filteredEndTimes,
  setFilteredEndTimes,
  selectedOption,
  setSelectedOption,
}) {
  useEffect(() => {
    const generateTimeSlots = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 30, 0, 0); // Set end time at 23:30

      // Round up the current time to the nearest 30 minutes
      now.setMinutes(Math.ceil(now.getMinutes() / 30) * 30, 0, 0);

      const slots = [];
      while (now <= endOfDay) {
        slots.push({
          label: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          value: now.toISOString(), // Store the full ISO string for comparison later
        });
        now.setMinutes(now.getMinutes() + 30); // Increment by 30 minutes
      }

      return slots;
    };

    setTimeSlots(generateTimeSlots());
  }, []);

  useEffect(() => {
    // Update filtered end times when start time changes
    if (startTime === "Now") {
      setFilteredEndTimes(
        timeSlots.filter((slot) => new Date(slot.value) >= new Date())
      );
    } else {
      setFilteredEndTimes(
        timeSlots.filter((slot) => new Date(slot.value) > new Date(startTime))
      );
    }
  }, [startTime, timeSlots]);

  // Handle option selection
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === "Playing with pals") {
      const now = new Date();
      setStartTime(now.toISOString());
    }
  };

  // Handle the start time change
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    setEndTime("No End Time"); // Reset end time whenever start time changes
  };

  // Handle the end time change
  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  // Handle the ball option change
  const handleBallChange = (e) => {
    setBringBall(e.target.checked);
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserSelectParkStatus(true);
    setWhichChard(selectedOption);
  };

  return (
    <div className={styles.fullPage}>
      <div className={styles.formBox}>
        <p className={styles.firstLineText}>What's your park status?</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.optionsBox}>
            <OptionToggle
              options={["Playing with pals", "Looking for pals"]}
              onChange={handleOptionChange}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
          <div className={styles.labelBox}>
            <label className={styles.label} htmlFor="start-time">
              Start Time:
            </label>
            <select
              id="start-time"
              name="start-time"
              value={startTime === "Now" ? "Now" : startTime}
              onChange={handleStartTimeChange}
              className={styles.select}
              disabled={selectedOption === "Playing with pals"}
            >
              <option value="Now">Now</option>
              {timeSlots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.labelBox}>
            <label className={styles.label} htmlFor="end-time">
              End Time:
            </label>
            <select
              id="end-time"
              name="end-time"
              value={endTime}
              onChange={handleEndTimeChange}
              className={styles.select}
            >
              <option value="No End Time">No End Time</option>{" "}
              {/* Default value */}
              {filteredEndTimes.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>

          <label>
            <input
              className={styles.radio}
              type="checkbox"
              checked={bringBall}
              onChange={handleBallChange}
            />
            Bringing a ball?
          </label>

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
