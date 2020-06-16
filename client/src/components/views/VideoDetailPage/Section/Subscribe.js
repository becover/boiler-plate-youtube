import React, { useEffect, useState } from "react";
import Axios from "axios";

function Subscribe(props) {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    const variable = { userTo: props.userTo };
    Axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.status === 200) {
        setSubscribeNumber(response.data.subscribeNumber);
      } else {
        alert("구독자 수 정보를 받아오지 못 했습니다");
      }
    });

    const subscribeVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    Axios.post("/api/subscribe/subscribed", subscribeVariable).then(
      (response) => {
        if (response.status === 200) {
          setSubscribed(response.data.subscribed);
        } else {
          alert("사용자 아이디 정보를 받아오지 못 했습니다");
        }
      }
    );
  }, []);

  const onSubscribe = () => {
    const variable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };

    if (subscribed) {
      Axios.post("/api/subscribe/unSubscribe", variable).then((response) => {
        if (response.status === 200) {
          setSubscribeNumber((subscribeNumber) => subscribeNumber - 1);
          setSubscribed(!subscribed);
        } else {
          alert("구독 취소 하는데 실패 했습니다.");
        }
      });
    } else {
      Axios.post("/api/subscribe/subscribe", variable).then((response) => {
        if (response.status === 200) {
          setSubscribeNumber((subscribeNumber) => subscribeNumber + 1);
          setSubscribed(!subscribed);
        } else {
          alert("구독 하는데 실패 했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? "#aaa" : "#c00"}`,
          borderStyle: "none",
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
          outlineColor: "aqua",
        }}
        onClick={onSubscribe}
      >
        {subscribeNumber} {subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
