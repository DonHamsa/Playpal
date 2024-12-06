"use client";
import { postcodeValidator } from "postcode-validator";
import styles from "./ProfileForm.module.css";
import { useState } from "react";

const ProfileForm = ({
  setNewUserProfileInfo,
  profileName,
  userEmail,
  userAge,
  postcode,
}) => {
  const [formButtonClicked, setFormButtonClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormButtonClicked(true);

    const name = e.target[0].value;
    const age = e.target[1].value;
    const postcode = e.target[2].value;

    setNewUserProfileInfo([name, age, postcode]);
  };

  const handlePostcode = (event) => {
    const postcode = event.target.value.trim();
    const validPostcode = postcodeValidator(postcode, "GB");
    if (!validPostcode) {
      event.target.setCustomValidity("Please enter a valid Postcode");
    } else {
      event.target.setCustomValidity("");
    }
  };

  const handleInvalidName = (event) => {
    const input = event.target;

    if (input.validity.patternMismatch) {
      input.setCustomValidity("Please enter your name.");
    } else {
      input.setCustomValidity(""); // Clear the custom message if valid
    }
  };

  return (
    <>
      <div className={styles.totalPageBox}>
        <div className={styles.bigBox}>
          <form onSubmit={handleSubmit}>
            <p className={styles.profileText}>Edit Profile</p>
            <label className={styles.label}>
              Name
              <input
                className={styles.input}
                defaultValue={profileName}
                pattern="[A-Za-z\s]+"
                title="Please enter your name"
                onInvalid={handleInvalidName}
              ></input>
            </label>
            <label className={styles.label}>
              Age
              <input
                defaultValue={userAge && userAge}
                className={styles.input}
                placeholder="Enter your age"
                type="number"
                min="10"
                max="70"
                required
              ></input>
            </label>
            <label className={styles.label}>
              {" "}
              Postcode
              <input
                defaultValue={postcode && postcode}
                className={styles.input}
                name="postcode"
                placeholder="Enter your postcode"
                onInput={handlePostcode}
                required
              ></input>
            </label>

            <label className={styles.label}>
              {" "}
              Email Address
              <input
                value={userEmail}
                className={`${styles.input} ${styles.email}`}
                readOnly
              ></input>
            </label>
            <button
              type="submit"
              className={styles.button}
              disabled={formButtonClicked}
            >
              {formButtonClicked ? "Updating Profile... " : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
