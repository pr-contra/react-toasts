import React, { useState } from 'react';
import Toast from './components/toast/Toast';
import Button from './components/button/Button';
import { BUTTON_PROPS } from './constants';
import checkIcon from './assets/check.svg';
import errorIcon from './assets/error.svg';
import infoIcon from './assets/info.svg';
import warningIcon from './assets/warning.svg';
import './App.css';

const App = () => {
  const [list, setList] = useState([]);
  let [autoDismiss, setAutoDismiss] = useState(false);
  const [dismissTime, setDismissTime] = useState(0);
  const [position, setPosition] = useState('top-right');

  const showToast = (type) => {
    let toastProperties = null;
    const id = `toast-${list.length + 1}`;

    if (autoDismiss && !dismissTime) {
      toastProperties = {
        id,
        title: 'Danger',
        description: 'Add a dismiss time value',
        backgroundColor: '#d9534f',
        icon: errorIcon,
      };
    }

    switch (type) {
      case 'success':
        toastProperties = {
          id,
          title: 'Success',
          description: 'This is a success toast component',
          backgroundColor: '#5cb85c',
          icon: checkIcon,
        };
        break;
      case 'danger':
        toastProperties = {
          id,
          title: 'Danger',
          description: 'This is a error toast component',
          backgroundColor: '#d9534f',
          icon: errorIcon,
        };
        break;
      case 'info':
        toastProperties = {
          id,
          title: 'Info',
          description: 'This is an info toast component',
          backgroundColor: '#5bc0de',
          icon: infoIcon,
        };
        break;
      case 'warning':
        toastProperties = {
          id,
          title: 'Warning',
          description: 'This is a warning toast component',
          backgroundColor: '#f0ad4e',
          icon: warningIcon,
        };
        break;
      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  };

  const onAutoDismissChange = () => {
    setAutoDismiss(!autoDismiss);
    cleanUp();
  };

  const onDismissTimeChange = (e) => {
    const time = parseInt(e.target.value, 10);
    setDismissTime(time);
    cleanUp();
  };

  const onPositionChange = (e) => {
    setPosition(e.target.value);
    cleanUp();
  };

  const cleanUp = () => {
    setList([]);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>React Toast Component</h1>
        <div className="toast-buttons">
          {BUTTON_PROPS.map((button) => (
            <Button
              key={button.id}
              className={button.className}
              label={button.label}
              handleClick={() => showToast(button.type)}
            />
          ))}
        </div>

        <div className="form">
          <div>
            <input
              id="auto"
              type="checkbox"
              name="auto-dismiss"
              value={autoDismiss}
              onChange={onAutoDismissChange}
              className="form-auto-checkbox"
            />
            <label htmlFor="auto" className="form-auto-label">
              Auto Dismiss
            </label>
          </div>

          <input
            className="dismiss-time-input"
            type="text"
            name="dismiss-time"
            placeholder="Insert time value in ms"
            onChange={onDismissTimeChange}
          />

          <select
            name="position"
            value={position}
            onChange={onPositionChange}
            className="position-select"
          >
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </div>
      </div>

      <Toast
        toastList={list}
        setList={setList}
        position={position}
        autoDismiss={autoDismiss}
        dismissTime={dismissTime}
      />
    </div>
  );
};

export default App;
