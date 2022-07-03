import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./App.scss";

interface Params {
  id: number;
  name: string;
  type: string;
  value: string;
}

interface MyFormValues {
  id: number;
  name: string;
  type: string;
  value: string;
}

const App = () => {
  const [isShowParams, setIsShowParams] = useState<boolean>(false);
  const [isErrorId, setIsErrorId] = useState<boolean>(false);
  const [params, setParams] = useState<Params[]>([]);

  const validationSchema = Yup.object().shape({
    id: Yup.number()
      .min(1, "Минимум 1")
      .typeError("Должно быть числом")
      .required("Обезательное поле"),
    name: Yup.string().required("Обезательное поле"),
    type: Yup.string().required("Обезательное поле"),
    value: Yup.string().required("Обезательное поле"),
  });

  const initialValues: MyFormValues = {
    id: 1,
    name: "",
    type: "",
    value: "",
  };

  return (
    <div className="wrapper">
      <div className="add-options">
        <div className="input-container">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, actions) => {
              if (params.find((el) => el.id === values.id))
                return setIsErrorId(true);

              setIsErrorId(false);
              setParams((prev) => [
                ...prev,
                {
                  id: values.id,
                  name: values.name,
                  type: values.type,
                  value: values.value,
                },
              ]);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="content__formik">
                  <div
                    className={
                      (props.errors.id && props.touched.id) || isErrorId
                        ? "formik-component formik-component--error"
                        : "formik-component"
                    }
                  >
                    <label htmlFor="id">Id</label>
                    <input
                      id="id"
                      name="id"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.id}
                    />
                    {props.errors.id && props.touched.id && (
                      <p className="formik-errors__text">{props.errors.id}</p>
                    )}
                    {isErrorId && (
                      <p className="formik-errors__text">
                        Такой id уже существует
                      </p>
                    )}
                  </div>

                  <div
                    className={
                      props.errors.name && props.touched.name
                        ? "formik-component formik-component--error"
                        : "formik-component"
                    }
                  >
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                    />
                    {props.errors.name && props.touched.name && (
                      <p className="formik-errors__text">{props.errors.name}</p>
                    )}
                  </div>

                  <div
                    className={
                      props.errors.type && props.touched.type
                        ? "formik-component formik-component--error"
                        : "formik-component"
                    }
                  >
                    <label htmlFor="type">Type</label>
                    <input
                      id="type"
                      name="type"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.type}
                    />
                    {props.errors.type && props.touched.type && (
                      <p className="formik-errors__text">{props.errors.type}</p>
                    )}
                  </div>

                  <div
                    className={
                      props.errors.value && props.touched.value
                        ? "formik-component formik-component--error"
                        : "formik-component"
                    }
                  >
                    <label htmlFor="value">Value</label>
                    <input
                      id="value"
                      name="value"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.value}
                    />
                    {props.errors.value && props.touched.value && (
                      <p className="formik-errors__text">
                        {props.errors.value}
                      </p>
                    )}
                  </div>
                </div>
                <div className="btn-container">
                  <button
                    type="submit"
                    disabled={!props.isValid && !props.dirty}
                  >
                    Добавить параметр
                  </button>
                  <button
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      e.preventDefault();
                      setIsShowParams((prev) => !prev);
                    }}
                  >
                    {isShowParams
                      ? "Скрыть все параметры"
                      : "Показать все параметры"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className={isShowParams ? "params" : "params params--hiden"}>
        {params.length ? (
          params.map((el) => (
            <div className="params__edit" key={el.id}>
              <span>{el.name}:</span>
              <input
                value={el.value}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  el.value = e.currentTarget.value;
                  setParams([...params]);
                }}
              />
            </div>
          ))
        ) : (
          <p>Не одного параметра, не найдено</p>
        )}
      </div>
    </div>
  );
};

export default App;
