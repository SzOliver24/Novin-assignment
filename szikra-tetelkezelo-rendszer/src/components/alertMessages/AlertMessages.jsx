import { useSelector } from "react-redux";
import { Alert } from "reactstrap";

const AlertMessages = (props) => {
  const messages = useSelector((state) => state[props.slice].messages);

  return (
    <div className="alertMessages">
      {messages.map(({ message, type }, i) => {
        if (type === "error") {
          return (
            <Alert color="danger" key={i}>
              {message}
            </Alert>
          );
        }
      })}
    </div>
  );
};

export default AlertMessages;
