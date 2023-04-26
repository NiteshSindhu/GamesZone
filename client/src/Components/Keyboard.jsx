import React, { useEffect, useState } from "react";
import Styles from "../Styles/keyboard.module.css";
import axios from "axios";
import {
  handleWordError,
  handleWordRequest,
  handleWordSuccessful,
} from "../Redux/action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const Keyboard = () => {
  const { isWords, wordLoading, wordError, wordLength } = useSelector(
    (word) => word,
    shallowEqual
  );
  const dispatch = useDispatch();
  const [word, setWord] = useState("");
  const [sameWord, setSameWord] = useState("");
  const [capsOn, setCapsOn] = useState(false);
  const [score, setScore] = useState(0);
  const [shiftOn, setShiftOn] = useState(false);

  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  const CheckSting = (value) => typeof value === "string";
  const InputHandle = (value) => {
    /**
     * The function handles input and applies capitalization based on the state of caps lock and shift
     * keys.
     */
    if (value) {
      if (!capsOn && shiftOn && CheckSting(value)) {
        value = value.toUpperCase();
      } else if (capsOn && shiftOn && CheckSting(value)) {
        value = value.toLowerCase();
      } else if (capsOn && CheckSting(value)) {
        value = value.toUpperCase();
      }
      setWord((word) => word + value);
      const totalLength = word.length + 1;
      if (wordLength === totalLength) {
        CheckWord(word + value);
      }
    }
    setShiftOn(false);
    // console.log(word);
  };

  const CheckWord = (word) => {
    let flag = true;
    for (let i = 0; i < wordLength; i++) {
      if (word[i] !== isWords[i]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      setScore(score + wordLength);
      setSameWord("Yes");
    } else {
      setScore(score - wordLength);
      setSameWord("No");
    }
    setTimeout(() => {
      setWord("");
      NewWords();
      setSameWord("");
    }, 2000);
  };

  const CapsLockOn = () => {
    setCapsOn(!capsOn);
  };

  const handleShiftOn = () => {
    setShiftOn(!shiftOn);
  };

  const NewWords = async () => {
    dispatch(handleWordRequest());
    try {
      const givenWord = await axios.get("http://localhost:8080/word");
      // console.log(givenWord.data);
      dispatch(handleWordSuccessful(givenWord.data));
    } catch (err) {
      dispatch(handleWordError());
    }
  };

  useEffect(() => {
    NewWords();
  }, []);
  // const progress = ((10 - seconds) / 10) * 100;

  return (
    <>
      <div
        className={Styles.Word}
        style={{ justifyContent: wordLoading ? "center" : "space-between" }}
      >
        {wordLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div
              style={{
                color:
                  sameWord === "Yes" ? "green" : sameWord === "No" ? "red" : "",
              }}
            >
              <h1>Word</h1>
              <h1>{isWords}</h1>
            </div>
            <div
              style={{
                color: score > 0 ? "green" : score < 0 ? "red" : "",
              }}
            >
              <h1>Score</h1>
              <h1>{score}</h1>
            </div>
            <div
              style={{
                color:
                  seconds > 7 ? "mint-green" : seconds < 4 ? "red" : "orange",
              }}
            >
              <h1>Time</h1>
              <h1>{seconds}</h1>
            </div>
          </>
        )}
      </div>
      <div className={Styles.keyboard}>
        <div>
          <div
            onClick={() => InputHandle("~")}
            className={`${Styles.key} ${Styles.key1st}`}
          >
            ~
          </div>
          <div
            onClick={() => InputHandle(1)}
            className={`${Styles.key} ${Styles.key1}`}
          >
            1
          </div>
          <div
            onClick={() => InputHandle(2)}
            className={`${Styles.key} ${Styles.key2}`}
          >
            2
          </div>
          <div
            onClick={() => InputHandle(3)}
            className={`${Styles.key} ${Styles.key3}`}
          >
            3
          </div>
          <div
            onClick={() => InputHandle(4)}
            className={`${Styles.key} ${Styles.key4}`}
          >
            4
          </div>
          <div
            onClick={() => InputHandle(5)}
            className={`${Styles.key} ${Styles.key5}`}
          >
            5
          </div>
          <div
            onClick={() => InputHandle(6)}
            className={`${Styles.key} ${Styles.key6}`}
          >
            6
          </div>
          <div
            onClick={() => InputHandle(7)}
            className={`${Styles.key} ${Styles.key7}`}
          >
            7
          </div>
          <div
            onClick={() => InputHandle(8)}
            className={`${Styles.key} ${Styles.key8}`}
          >
            8
          </div>
          <div
            onClick={() => InputHandle(9)}
            className={`${Styles.key} ${Styles.key9}`}
          >
            9
          </div>
          <div
            onClick={() => InputHandle(0)}
            className={`${Styles.key} ${Styles.key0}`}
          >
            0
          </div>
          <div
            onClick={() => InputHandle()}
            className={`${Styles.key} ${Styles.delete}`}
          >
            delete
          </div>
        </div>
        <div>
          <div
            onClick={() => InputHandle()}
            className={`${Styles.key} ${Styles.tab}`}
          >
            tab
          </div>
          <div
            onClick={() => InputHandle("q")}
            className={`${Styles.key} ${Styles.keyQ}`}
          >
            Q
          </div>
          <div
            onClick={() => InputHandle("w")}
            className={`${Styles.key} ${Styles.keyW}`}
          >
            W
          </div>
          <div
            onClick={() => InputHandle("e")}
            className={`${Styles.key} ${Styles.keyE}`}
          >
            E
          </div>
          <div
            onClick={() => InputHandle("r")}
            className={`${Styles.key} ${Styles.keyR}`}
          >
            R
          </div>
          <div
            onClick={() => InputHandle("t")}
            className={`${Styles.key} ${Styles.keyT}`}
          >
            T
          </div>
          <div
            onClick={() => InputHandle("y")}
            className={`${Styles.key} ${Styles.keyY}`}
          >
            Y
          </div>
          <div
            onClick={() => InputHandle("u")}
            className={`${Styles.key} ${Styles.keyU}`}
          >
            U
          </div>
          <div
            onClick={() => InputHandle("i")}
            className={`${Styles.key} ${Styles.keyI}`}
          >
            I
          </div>
          <div
            onClick={() => InputHandle("o")}
            className={`${Styles.key} ${Styles.keyO}`}
          >
            O
          </div>
          <div
            onClick={() => InputHandle("p")}
            className={`${Styles.key} ${Styles.keyP}`}
          >
            P
          </div>
          <div
            onClick={() => InputHandle()}
            className={`${Styles.key} ${Styles.keyFor}`}
          >
            \
          </div>
        </div>
        <div>
          <div onClick={CapsLockOn} className={`${Styles.key} ${Styles.caps}`}>
            caps
            <span className={capsOn ? Styles.capsLock : ""}></span>
          </div>
          <div
            onClick={() => InputHandle("a")}
            className={`${Styles.key} ${Styles.keyA}`}
          >
            A
          </div>
          <div
            onClick={() => InputHandle("s")}
            className={`${Styles.key} ${Styles.keyS}`}
          >
            S
          </div>
          <div
            onClick={() => InputHandle("d")}
            className={`${Styles.key} ${Styles.keyD}`}
          >
            D
          </div>
          <div
            onClick={() => InputHandle("f")}
            className={`${Styles.key} ${Styles.keyF}`}
          >
            F
          </div>
          <div
            onClick={() => InputHandle("g")}
            className={`${Styles.key} ${Styles.keyG}`}
          >
            G
          </div>
          <div
            onClick={() => InputHandle("h")}
            className={`${Styles.key} ${Styles.keyH}`}
          >
            H
          </div>
          <div
            onClick={() => InputHandle("j")}
            className={`${Styles.key} ${Styles.keyJ}`}
          >
            J
          </div>
          <div
            onClick={() => InputHandle("k")}
            className={`${Styles.key} ${Styles.keyK}`}
          >
            K
          </div>
          <div
            onClick={() => InputHandle("l")}
            className={`${Styles.key} ${Styles.keyL}`}
          >
            L
          </div>
          <div
            onClick={() => InputHandle()}
            className={`${Styles.key} ${Styles.enter}`}
          >
            Enter
          </div>
        </div>
        <div>
          <div
            onClick={handleShiftOn}
            className={`${Styles.key} ${Styles.shift}`}
          >
            Shift
            <span className={shiftOn ? Styles.capsLock : ""}></span>
          </div>
          <div
            onClick={() => InputHandle("z")}
            className={`${Styles.key} ${Styles.keyZ}`}
          >
            Z
          </div>
          <div
            onClick={() => InputHandle("x")}
            className={`${Styles.key} ${Styles.keyX}`}
          >
            X
          </div>
          <div
            onClick={() => InputHandle("c")}
            className={`${Styles.key} ${Styles.keyC}`}
          >
            C
          </div>
          <div
            onClick={() => InputHandle("v")}
            className={`${Styles.key} ${Styles.keyV}`}
          >
            V
          </div>
          <div
            onClick={() => InputHandle("b")}
            className={`${Styles.key} ${Styles.keyB}`}
          >
            B
          </div>
          <div
            onClick={() => InputHandle("n")}
            className={`${Styles.key} ${Styles.keyN}`}
          >
            N
          </div>
          <div
            onClick={() => InputHandle("m")}
            className={`${Styles.key} ${Styles.keyM}`}
          >
            M
          </div>
          <div
            onClick={() => InputHandle(",")}
            className={`${Styles.key} ${Styles.comma}`}
          >
            ,
          </div>
          <div
            onClick={() => InputHandle(".")}
            className={`${Styles.key} ${Styles.dot}`}
          >
            .
          </div>
          <div
            onClick={handleShiftOn}
            className={`${Styles.key} ${Styles.shift2}`}
          >
            Shift
            <span className={shiftOn ? Styles.capsLock : ""}></span>
          </div>
        </div>
        <div>
          <div
            onClick={() => InputHandle()}
            className={`${Styles.key} ${Styles.window}`}
          >
            ⊞
          </div>
          <div
            onClick={() => InputHandle()}
            className={`${Styles.key} ${Styles.ctrl}`}
          >
            ctrl
          </div>
          <div
            onClick={() => InputHandle()}
            className={`${Styles.key} ${Styles.option}`}
          >
            option
          </div>
          <div
            onClick={() => InputHandle()}
            className={`${Styles.key} ${Styles.alt1}`}
          >
            alt
          </div>
          <div
            onClick={() => InputHandle(" ")}
            className={`${Styles.key} ${Styles.space}`}
          >
            Space
          </div>
          <div
            onClick={() => InputHandle()}
            className={`${Styles.key} ${Styles.alt2}`}
          >
            alt
          </div>
          <div
            onClick={() => InputHandle()}
            className={`${Styles.key} ${Styles.option2}`}
          >
            option
          </div>
          <div
            onClick={() => InputHandle()}
            className={`${Styles.key} ${Styles.arrow1}`}
          >
            ←
          </div>
          <div
            onClick={() => InputHandle()}
            className={`${Styles.key} ${Styles.arrow}`}
          >
            →
          </div>
        </div>
      </div>
    </>
  );
};

export default Keyboard;
