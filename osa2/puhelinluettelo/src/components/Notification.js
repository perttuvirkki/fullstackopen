const Notification = ({ message, errorMessage }) => {
  if (errorMessage !== null) return <div className="error">{errorMessage}</div>;

  if (message !== null) return <div className="success">{message}</div>;
};

export default Notification;
