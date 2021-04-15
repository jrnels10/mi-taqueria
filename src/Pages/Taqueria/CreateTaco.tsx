import React, { useCallback, useState, useContext } from "react";
import {
  Container,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Taqueria } from "../../Utils/Interfaces";
import { withRouter } from "react-router";
import { Context } from "../../Utils/Context";
import { Toggle } from "../../Components/Toggle";

const CreateTaco = (props: any) => {
  const { register, handleSubmit } = useForm<Taqueria>();
  const [taco, settaco] = useState({
    ...props.location.query.taco,
  });
  const [headerMessage, setheaderMessage] = useState<string>(
    "Create new Taqueria"
  );
  const { tacoService, taqueria } = useContext(Context);
  const onSubmit = useCallback(
    async (formValues: Taqueria) => {
      const taco = {
        ...taqueria,
        ...formValues,
      };
      debugger;
      // tacoService.createTaqueria(taco);
    },
    [taqueria]
  );

  const constructTaco = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    return taqueria.dispatch({
      type: "CREATE",
      payload: { taqueria: { ...taqueria, [e.target.name]: e.target.value } },
    });
  };
  console.log(props.location.taco, taco);
  return (
    <Container className="sign text-white">
      <div>{headerMessage}</div>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="name"
            value={taco.name}
            placeholder="Enter name of your taqueria"
            ref={register}
            onChange={(e) => constructTaco(e)}
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            type="description"
            value={taco.description}
            placeholder="Tell us about your taqueria..."
            ref={register}
            onChange={(e) => constructTaco(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <GeoAddress setheaderMessage={setheaderMessage} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default withRouter(CreateTaco);

const GeoAddress = (props: any) => {
  const { setheaderMessage } = props;
  const { mapboxService, taqueria } = useContext(Context);
  const [address, setAddress] = useState<string>("");
  const queryAddress = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (address.includes(",")) {
      const res = await mapboxService.getLatLngFromAddress({
        address: address.split(" ").join("%20"),
      });
      if (res && res.status === 200) {
        taqueria.dispatch({
          type: "SET_LOCATE",
          payload: { setLocate: true },
        });
        return taqueria.dispatch({
          type: "SUGGESTED_LOCATION",
          payload: {
            latLng: [
              res.data.features[0].center[1],
              res.data.features[0].center[0],
            ],
          },
        });
      }
    }
  };
  const addLocation = async (e: { preventDefault: () => void }) => {
    taqueria.dispatch({
      type: "SET_LOCATE",
      payload: { setLocate: true },
    });
    setheaderMessage("Click the location where your taqueria is located.");
  };

  return (
    <Form.Group controlId="formLocation">
      <Form.Label>Location</Form.Label>
      <InputGroup>
        <FormControl
          placeholder="Enter address or click on map"
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button variant="primary" onClick={(e) => queryAddress(e)}>
          Search
        </Button>
      </InputGroup>
      <Form.Text className="text-muted">
        Dont know the address? Use{" "}
        <a href="#" onClick={addLocation}>
          map
        </a>{" "}
        to add your taqueria location.
      </Form.Text>
    </Form.Group>
  );
};
