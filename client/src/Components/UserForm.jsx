import React from "react";
// import Styles from "../Styles/user.module.css";
import Styles from "../Styles/keyboard.module.css";

export default function UserForm() {
  return (
    <div className={Styles.users}>
        <h3>Name</h3>
        <input type="text" />
        <h3>Difficulty Level</h3>
        <select placeholder="Select Level">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button>Submit</button>
      </div>
  );
}
