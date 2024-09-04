import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import CheckBox from "../common/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import {
  setFeatures,
  setStep,
  setCompanyDetail,
} from "../../redux/slice/projectSlice";
import PhoneInput from "../common/PhoneInput";
import Loading from "../common/Loading";
import Input from "../common/Input";
import CustomButton from "../common/CustomButton";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

const nameSchema = z.object({
  fullName: z.string().min(1, "Fullname is required"),
});

const AddName = ({ nextStep, setProjectName, projectName }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      fullName: projectName || "",
    },
  });

  useEffect(() => {
    reset({ fullName: projectName || "" });
  }, [projectName, reset]);

  const onSubmit = (data) => {
    setProjectName(data.fullName);
    console.log(data.fullName);
    nextStep();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="ml-20">
          <div className="mb-6">
            <p className="text-xl text-gray-600 mb-3">Step 1 of 3</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-purple-500 h-2 rounded-full w-[33%] "></div>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-2xl text-gray-700 font-semibold my-3 leading-tight">{`Let's Start with the name of your Application `}</p>
          </div>
          <div className="mb-12">
            <Controller
              name="fullName"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Input
                  fullWidth={true}
                  variant="standard"
                  label="Full Name"
                  type="text"
                  value={value}
                  onChange={onChange}
                  className="mb-8"
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName?.message}
                  inputRef={ref}
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <CustomButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            type="submit"
          >
            Next
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const AddLabels = ({ projectName, onCheckBoxChange, features }) => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.project.step);

  const [labels, setLabels] = useState(false);
  const [navigation, setNavigation] = useState(false);
  const [toogles, setToogles] = useState(false);

  const handleLabels = (event) => {
    setLabels((prev) => !prev);
    const { name, checked } = event.target;
    setLabels(checked);
    onCheckBoxChange(name, checked);
    dispatch(setFeatures({ ...features, labels: checked }));
  };
  const handleNavigation = (event) => {
    const { name, checked } = event.target;
    setNavigation(checked);
    onCheckBoxChange(name, checked);
    dispatch(setFeatures({ ...features, navigation: checked }));
  };
  const handleToogles = (event) => {
    const { name, checked } = event.target;
    setToogles(checked);
    onCheckBoxChange(name, checked);
    dispatch(setFeatures({ ...features, toggles: checked }));
  };

  const handleClick = () => {
    dispatch(setStep(step + 1));
  };

  useEffect(() => {
    setLabels(features.labels || false);
    setNavigation(features.navigation || false);
    setToogles(features.toggles || false);
  }, [features]);

  return (
    <div>
      <div className="ml-20">
        <div className="mb-6">
          <p className="text-xl text-gray-600 mb-3">Step 2 of 3</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-purple-500 h-2 rounded-full w-[66%]"></div>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-2xl text-gray-700 font-semibold my-3 leading-tight">{`Enter the data for ${projectName} features you want to control`}</p>
        </div>
        <div className="mb-12">
          <div className="flex items-center mt-5">
            <label className="block text-gray-600 mr-5">{projectName}</label>
          </div>

          {/* toogles */}
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Features
          </h3>

          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <CheckBox
                value={labels}
                label={"Labels"}
                name={"labels"}
                onChange={handleLabels}
              />
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <CheckBox
                value={navigation}
                label={"Navigation"}
                name={"navigation"}
                onChange={handleNavigation}
              />
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <CheckBox
                value={toogles}
                label={"Toogles"}
                name={"toogles"}
                onChange={handleToogles}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <CustomButton variant="contained" color="primary" onClick={handleClick}>
          Continue
        </CustomButton>
      </div>
    </div>
  );
};
const AddLabels = ({ projectName, onCheckBoxChange, features }) => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.project.step);

  const [labels, setLabels] = useState(false);
  const [navigation, setNavigation] = useState(false);
  const [toogles, setToogles] = useState(false);

  const handleLabels = (event) => {
    setLabels((prev) => !prev);
    const { name, checked } = event.target;
    setLabels(checked);
    onCheckBoxChange(name, checked);
    dispatch(setFeatures({ ...features, labels: checked }));
  };
  const handleNavigation = (event) => {
    const { name, checked } = event.target;
    setNavigation(checked);
    onCheckBoxChange(name, checked);
    dispatch(setFeatures({ ...features, navigation: checked }));
  };
  const handleToogles = (event) => {
    const { name, checked } = event.target;
    setToogles(checked);
    onCheckBoxChange(name, checked);
    dispatch(setFeatures({ ...features, toggles: checked }));
  };

  const handleClick = () => {
    dispatch(setStep(step + 1));
  };

  useEffect(() => {
    setLabels(features.labels || false);
    setNavigation(features.navigation || false);
    setToogles(features.toggles || false);
  }, [features]);

  return (
    <div>
      <div className="ml-20">
        <div className="mb-6">
          <p className="text-xl text-gray-600 mb-3">Step 2 of 3</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-purple-500 h-2 rounded-full w-[66%]"></div>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-2xl text-gray-700 font-semibold my-3 leading-tight">{`Enter the data for ${projectName} features you want to control`}</p>
        </div>
        <div className="mb-12">
          <div className="flex items-center mt-5">
            <label className="block text-gray-600 mr-5">{projectName}</label>
          </div>

          {/* toogles */}
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Features
          </h3>

          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <CheckBox
                value={labels}
                label={"Labels"}
                name={"labels"}
                onChange={handleLabels}
              />
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <CheckBox
                value={navigation}
                label={"Navigation"}
                name={"navigation"}
                onChange={handleNavigation}
              />
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <CheckBox
                value={toogles}
                label={"Toogles"}
                name={"toogles"}
                onChange={handleToogles}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <CustomButton variant="contained" color="primary" onClick={handleClick}>
          Continue
        </CustomButton>
      </div>
    </div>
  );
};

const AddInfo = ({ handleSave }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.project.loading);
  const companyDetail = useSelector((state) => state.project.companyDetail);

const AddInfo = ({ handleSave }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.project.loading);
  const companyDetail = useSelector((state) => state.project.companyDetail);

  return (
    <div>
      <div className="ml-20">
        <div className="mb-6">
          <p className="text-xl text-gray-600 mb-3">Step 3 of 3</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-purple-500 h-2 rounded-full w-full"></div>
            <div className="bg-purple-500 h-2 rounded-full w-full"></div>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-2xl text-gray-700 font-semibold my-3 leading-tight">{`Enter the data of your Company `}</p>
        </div>
        <div className="mb-12">
          <div className="flex">
            <div className="mr-5">
              <Input
                fullWidth={true}
                type="email"
                type="email"
                variant="standard"
                label="Email"
                value={companyDetail.email}
                className="mb-8"
                onChange={(e) =>
                  dispatch(
                    setCompanyDetail({
                      ...companyDetail,
                      email: e.target.value,
                    })
                  )
                }
                onChange={(e) =>
                  dispatch(
                    setCompanyDetail({
                      ...companyDetail,
                      email: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div className="ml-5">
              <Input
                fullWidth={true}
                type="text"
                type="text"
                variant="standard"
                label="Company Name"
                value={companyDetail.companyName}
                className="mb-8"
                onChange={(e) =>
                  dispatch(
                    setCompanyDetail({
                      ...companyDetail,
                      companyName: e.target.value,
                    })
                  )
                }
                onChange={(e) =>
                  dispatch(
                    setCompanyDetail({
                      ...companyDetail,
                      companyName: e.target.value,
                    })
                  )
                }
              />
            </div>
          </div>
          <div className="mt-3">
            <PhoneInput
              value={companyDetail.phone}
              onChangePhone={(e) =>
                dispatch(
                  setCompanyDetail({ ...companyDetail, phone: e.target.value })
                )
              }
            />
            <PhoneInput
              value={companyDetail.phone}
              onChangePhone={(e) =>
                dispatch(
                  setCompanyDetail({ ...companyDetail, phone: e.target.value })
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <CustomButton variant="contained" color="primary" onClick={handleSave}>
          {loading ? (
            <Loading size={30} color="white" thickness={5} />
          ) : (
            "Continue"
          )}
        <CustomButton variant="contained" color="primary" onClick={handleSave}>
          {loading ? (
            <Loading size={30} color="white" thickness={5} />
          ) : (
            "Continue"
          )}
        </CustomButton>
      </div>
    </div>
  );
};
};

export { AddName, AddLabels, AddInfo };
export { AddName, AddLabels, AddInfo };
