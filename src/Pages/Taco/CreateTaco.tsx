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
import { Link } from "react-router-dom";
import { DaySelector } from "../../Components/Selectors";
import { TaqueriaContext } from "../../Utils/Contexts/TaqueriaContext";
import { MapContext } from "../../Utils/Contexts/MapContext";

const CreateTaco = (props: any) => {
  const { register, handleSubmit } = useForm<Taqueria>();
  const [taco, settaco] = useState({});
  const [headerMessage, setheaderMessage] = useState<string>(
    "Create new Taqueria"
  );
  const { tacoService, taqueria } = useContext(TaqueriaContext);
  const onSubmit = useCallback(
    async (formValues: Taqueria) => {
      const taco = {
        ...taqueria,
        ...formValues,
      };
      console.log(taco);
      taqueria.update
        ? tacoService.updateTaqueria(taco)
        : tacoService.createTaqueria(taco);
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

  return (
    <Container className="taco_page text-white">
      <div>{headerMessage}</div>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="name"
            placeholder="Enter name of your taqueria"
            ref={register}
            value={taqueria.name}
            onChange={(e) => constructTaco(e)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            type="description"
            value={taqueria.description}
            placeholder="Tell us about your taqueria..."
            ref={register}
            onChange={(e) => constructTaco(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicLocation">
          {/* <Form.File
            id="exampleFormControlFile1"
            name="file"
            type="file"
            ref={register}
            label="Image of Taqueria"
          /> */}
        </Form.Group>
        <Form.Group controlId="formBasicLocation">
          <GeoAddress setheaderMessage={setheaderMessage} />
        </Form.Group>
        <Form.Group controlId="formBasicDays">
          <Form.Label className="m-auto text-center  w-100">
            Days of operation
          </Form.Label>
          <DaySelector
            propsDays={taqueria.daysOfTheWeek.split(",")}
            callBack={(days: string) =>
              taqueria.dispatch({
                type: "CREATE",
                payload: {
                  taqueria: { ...taqueria, daysOfTheWeek: days },
                },
              })
            }
          />
        </Form.Group>

        {/* <Form.Group controlId="formBasicHours">
          <Form.Label>Hours of operation</Form.Label>
          <TimePicker
            onChange={(time: any) => setTimePicker(time, "")}
            value={new Date()}
          />
        </Form.Group> */}
        <div className="w-100 mt-5 text-center">
          <Button className="w-75" variant="primary" type="submit">
            {taqueria.update ? "Update" : "Create"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default withRouter(CreateTaco);

const GeoAddress = (props: any) => {
  const { taqueria } = useContext(TaqueriaContext);
  const { mapboxService } = useContext(MapContext);
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
  // const addLocation = async (e: { preventDefault: () => void }) => {
  //   taqueria.dispatch({
  //     type: "SET_LOCATE",
  //     payload: { setLocate: true },
  //   });
  //   setheaderMessage("Click the location where your taqueria is located.");
  // };

  return (
    <Form.Group controlId="formLocation">
      <Form.Label>Location</Form.Label>
      <InputGroup>
        <FormControl
          placeholder="Enter address or click on map"
          onChange={(e) => setAddress(e.target.value)}
          value={
            address
              ? address
              : taqueria.latitude
              ? `${taqueria.latitude}, ${taqueria.longitude}`
              : ""
          }
        />
        <Button variant="primary" onClick={(e) => queryAddress(e)}>
          Search
        </Button>
      </InputGroup>
      <Form.Text className="text-muted">
        Dont know the address? Use{" "}
        <Link
          to={{
            pathname: "/map/createtaco",
          }}
        >
          map
        </Link>{" "}
        to add your taqueria location.
      </Form.Text>
    </Form.Group>
  );
};
