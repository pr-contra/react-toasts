import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './Toast.css';

const Toast = (props) => {
  const { toastList, setList, position, autoDismiss, dismissTime } = props;

  useEffect(() => {
    if (!autoDismiss || !dismissTime) return;

    const interval = setInterval(() => {
      if (toastList.length) {
        deleteToast(toastList[0].id);
      }
    }, dismissTime);

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
  }, [toastList, autoDismiss, dismissTime]);

  const deleteToast = (id) => {
    const toastListItemIndex = toastList.findIndex((e) => e.id === id);
    toastList.splice(toastListItemIndex, 1);
    setList([...toastList]);
  };

  return (
    <>
      <div className={`notification-container ${position}`}>
        {toastList.map((toast, i) => (
          <div
            key={i}
            className={`notification toast ${position}`}
            style={{ backgroundColor: toast.backgroundColor }}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>
            <div className="notification-image">
              <img src={toast.icon} alt="" />
            </div>
            <div>
              <p className="notification-title">{toast.title}</p>
              <p className="notification-message">{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  setList: PropTypes.func.isRequired,
  position: PropTypes.string,
  autoDelete: PropTypes.bool,
  dismissTime: PropTypes.number,
};

export default Toast;
