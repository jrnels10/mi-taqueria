import React, { useContext } from "react";
import { PencilSquare } from "react-bootstrap-icons";

import "./buttons.scss";
import { UserContext } from "../../Utils/Contexts/UserContext";
import { TaqueriaContext } from "../../Utils/Contexts/TaqueriaContext";
import { useHistory, useLocation } from "react-router";

export const EditButton = () => {
  const history = useHistory();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const {
    taqueria,
    taqueria: { selectTaco },
  } = useContext(TaqueriaContext);
  const editAction = (e: React.MouseEvent<HTMLElement>) => {
    taqueria.dispatch({ type: "EDIT_TACO", payload: { taco: selectTaco } });
    history.push(`${location.pathname}/update`);
  };

  return user && user.id === selectTaco.userId ? (
    <button onClick={editAction}>
      <PencilSquare size={24} />{" "}
    </button>
  ) : null;
};
