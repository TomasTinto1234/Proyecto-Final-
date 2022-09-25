import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Button, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const AlertCard = ({ alertSubmit }) => {
  const history = useHistory();
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0(); // haciendo pruebas

  const onDown = () => {
    history.push("/");
  };

  return (
    <Alert
      position={"absolute"}
      display={"flex"}
      status={"success"}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="15rem"
      top={"10rem"}
      gap={"0.5rem"}
    >
      <AlertIcon boxSize="40px" mr={0} />
      {/* <AlertTitle mt={4} mb={1} fontSize="lg">
        {!alertSubmit[1]
          ? "La publicación no se pudo Actualizar, lo sentimos mucho!"
          : "La publicación se Actualizo correctamente"}
      </AlertTitle> */}
      <AlertDescription maxWidth="sm">
        Debes estar registrado para acceder al detalle.
      </AlertDescription>
      <br />
      <Button onClick={onDown}>Aceptar</Button>
      <Button onClick={() => loginWithRedirect()}>Iniciar Sesion</Button>
    </Alert>
  );
};

export default AlertCard;
