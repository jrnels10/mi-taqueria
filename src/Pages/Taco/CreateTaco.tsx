import React, { useCallback, useState, useContext } from "react";
import {
  Container,
  Form,
  Button,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IPhotos, ISchedule, Taqueria } from "../../Utils/Interfaces";
import { withRouter } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { DaySelector } from "../../Components/Selectors";
import { TaqueriaContext } from "../../Utils/Contexts/TaqueriaContext";
import { MapContext } from "../../Utils/Contexts/MapContext";
import { PageControl } from "../../Components/Navigation/Navigation";
import { Schedule } from "../../Utils/Constructors/Schedule";
import { XSquareFill } from "react-bootstrap-icons";

const CreateTaco = (props: any) => {
  const { register, handleSubmit } = useForm<Taqueria>();
  const history = useHistory();
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
      const del = taco.deleteImages.map(
        async (deletePhoto: IPhotos) =>
          await tacoService.deleteTaqueriaImage(deletePhoto)
      );
      const res = taqueria.update
        ? await tacoService.updateTaqueria(taco)
        : await tacoService.createTaqueria(taco);
      if (res.status === 200 || res.status === 201) {
        history.push(`/taco/${res.data.id}`);
      }
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
  const createDays = (days: ISchedule) => {
    const newDays = new Schedule({ ...days });
    console.log(newDays);
    taqueria.dispatch({
      type: "CREATE",
      payload: {
        taqueria: { ...taqueria, schedule: newDays },
      },
    });
  };
  console.log(taqueria.photos);
  return (
    <Container className="taco_page ">
      <PageControl></PageControl>
      <Form className="taco_page_create " onSubmit={handleSubmit(onSubmit)}>
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
          <GeoAddress setheaderMessage={setheaderMessage} />
        </Form.Group>
        <Form.Group controlId="formBasicDays">
          <Form.Label className="m-auto text-center  w-100">
            Days of operation
          </Form.Label>
          <DaySelector propsDays={taqueria.schedule} callBack={createDays} />
        </Form.Group>
        <Form.Group controlId="formBasicImages">
          {taqueria.photos.length > 1 ? (
            <Alert variant="danger">Maximum photos uploaded!</Alert>
          ) : (
            <Form.File
              id="exampleFormControlFile1"
              name="file"
              type="file"
              ref={register}
              label="Image of Taqueria"
            />
          )}
          {taqueria.photos.length ? <ManagePhotos /> : null}
        </Form.Group>
        <div className="w-100 mt-5 text-center">
          <Button className="w-75 create_taco_buttons" type="submit">
            {taqueria.update ? "Update" : "Create"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default withRouter(CreateTaco);

const ManagePhotos = () => {
  const { tacoService, taqueria } = useContext(TaqueriaContext);
  const [toBeDeleted, settoBeDeleted] = useState([]);
  const deleteImages = async (photo: any) => {
    // const del = await tacoService.deleteTaqueriaImage(photo);
    // if (del) {
    taqueria.dispatch({
      type: "DELETE_IMAGES",
      payload: {
        photos: [...taqueria.deleteImages, photo],
      },
    });
    // }
  };
  return (
    <div className="photoManger">
      {taqueria.photos.map((p: any) => {
        return (
          <Alert
            key={p.id}
            variant="secondary"
            className={`photoManger_card photoManger_card${
              taqueria.deleteImages.find((d: any) => d.id === p.id)
                ? "--deleted"
                : ""
            }`}
          >
            <label className="photoManger_card_name">{p.fileName}</label>
            <label className="photoManger_card_delete">
              <label>
                <XSquareFill size={25} onClick={() => deleteImages(p)} />
              </label>
            </label>
          </Alert>
        );
      })}
    </div>
  );
};

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
        <Button
          className="create_taco_buttons"
          onClick={(e) => queryAddress(e)}
        >
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
