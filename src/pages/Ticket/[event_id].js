import React from "react";
import QRCode from "react-qr-code";
import { auth } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Ticket({ event_id }) {
  const [user, loading, error] = useAuthState(auth);
  const value = `${event_id}${user?.uid}`;
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <div className="bg-blue-300 shadow-lg w-2/4 h-3/4 rounded-lg flex flex-col items-center justify-around">
        <QRCode size={256} style={{ height: "50%", maxWidth: "80%", width: "100%" }} value={value} viewBox={`0 0 256 256`} />
        <div></div>
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const { event_id } = ctx.query;

  return {
    props: {
      event_id: event_id,
    },
  };
}
export default Ticket;
