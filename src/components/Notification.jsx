import React from "react";

const Notification = ({ text }) => {
  return (
    <div className="fixed bottom-8 right-[50%] translate-1/2 bg-gray-400 text-gray-800 px-4 py-2 rounded-md shadow-lg">
      {text}
    </div>
  );
};

export default Notification;
