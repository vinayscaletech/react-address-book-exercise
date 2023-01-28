import React from "react";

import $ from "./Address.module.css";

const Address = ({ address }) => {
  return (
    <address className={$.address}>
      {address.address}
    </address>
  );
};

export default Address;
