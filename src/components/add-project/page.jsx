import { useEffect } from "react";
import CheckBox from "../common/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import {
  setFeatures,
  setStep,
  setCompanyDetail,
  saveProjectData,
} from "../../redux/slice/projectSlice";
import Loading from "../common/Loading";
import Input from "../common/Input";
import CustomButton from "../common/CustomButton";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import PhoneNumberInput from "../common/PhoneNumberInput";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const nameSchema = z.object({
  fullName: z.string().min(1, "Fullname is required"),
});

const checkBoxSchema = z.object({
  labels: z.boolean().refine((value) => value === true, {
    message: "Labels must be checked",
  }),
  navigation: z.boolean().optional(),
  toggles: z.boolean().optional(),
});

const companyInfoSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("invalid email is required"),
  companyName: z.string().min(1, { message: "Company name is rewuired" }),
  phone: z.string().min(10, "phone number must be atleast 10 digits"),
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

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkBoxSchema),
    defaultValues: {
      labels: true,
      navigation: false,
      toggles: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(setStep(step + 1));
  };

  useEffect(() => {
    setValue("labels", features.labels ?? true);
    setValue("navigation", features.navigation || false);
    setValue("toggles", features.toggles || false);
  }, [features, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Features
            </h3>

            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <Controller
                  name="labels"
                  control={control}
                  render={({ field }) => (
                    <CheckBox
                      value={field.value}
                      label="Labels"
                      name={"Labels"}
                      onChange={async (e) => {
                        field.onChange(e.target.checked);
                        onCheckBoxChange(field.name, e.target.checked);
                        dispatch(
                          setFeatures({ ...features, labels: e.target.checked })
                        );
                        await trigger("labels");
                      }}
                      inputRef={field.ref}
                    />
                  )}
                />
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <Controller
                  name="navigation"
                  control={control}
                  render={({ field }) => (
                    <CheckBox
                      value={field.value}
                      label="Navigation"
                      name={"Navigation"}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        onCheckBoxChange(field.name, e.target.checked);
                        dispatch(
                          setFeatures({
                            ...features,
                            navigation: e.target.checked,
                          })
                        );
                      }}
                      inputRef={field.ref}
                    />
                  )}
                />
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <Controller
                  name="toggles"
                  control={control}
                  render={({ field }) => (
                    <CheckBox
                      value={field.value}
                      label="Toggles"
                      name={"Toggles"}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        onCheckBoxChange(field.name, e.target.checked);
                        dispatch(
                          setFeatures({
                            ...features,
                            toggles: e.target.checked,
                          })
                        );
                      }}
                      inputRef={field.ref}
                    />
                  )}
                />
              </li>
            </ul>
          </div>
        </div>
        {errors.labels && (
          <div className="text-red-500 text-center mb-4">
            {errors.labels.message}
          </div>
        )}
        <div className="flex justify-center">
          <CustomButton variant="contained" color="primary" type="submit">
            Continue
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

const AddInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyDetail, projectName, features } = useSelector(
    (state) => state.project
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      email: companyDetail.email || "",
      companyName: companyDetail.companyName || "",
      phone: companyDetail.phone || "",
    },
  });

  const onSubmit = async () => {
    const data = {
      projectName,
      features,
      companyDetail,
    };
    await dispatch(saveProjectData(data)).then((result) => {
      if (result.type === "project/saveProjectData/fulfilled") {
        toast.success("Project Created successfully");
        navigate("/");
        console.log("projec created");
      } else if (result.type === "project/saveProjectData/rejected") {
        toast.error("Could not create project");
        navigate("/");
        console.error("Error saving project data:", result.payload);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="ml-20">
          <div className="mb-6">
            <p className="text-xl text-gray-600 mb-3">Step 3 of 3</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-purple-500 h-2 rounded-full w-full"></div>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-2xl text-gray-700 font-semibold my-3 leading-tight">{`Enter the data of your Company `}</p>
          </div>
          <div className="mb-12">
            <div className="flex">
              <div className="mr-5">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      fullWidth={true}
                      type="email"
                      variant="standard"
                      label="Email"
                      value={field.value}
                      className="mb-8"
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch(
                          setCompanyDetail({
                            ...companyDetail,
                            email: e.target.value,
                          })
                        );
                      }}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </div>
              <div className="ml-5">
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      fullWidth={true}
                      type="text"
                      variant="standard"
                      label="Company Name"
                      value={field.value}
                      className="mb-8"
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch(
                          setCompanyDetail({
                            ...companyDetail,
                            companyName: e.target.value,
                          })
                        );
                      }}
                      error={!!errors.companyName}
                      helperText={errors.companyName?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-3">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneNumberInput
                    fullWidth
                    name="phone"
                    control={control}
                    variant="standard"
                    label="Phone"
                    value={field.value}
                    className="mb-8"
                    onChange={(formattedValue) => {
                      field.onChange(formattedValue); // Ensure this still updates the form state
                      dispatch(
                        setCompanyDetail({
                          ...companyDetail,
                          phone: formattedValue,
                        })
                      );
                    }}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <CustomButton
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <Loading size={30} color="white" thickness={5} />
            ) : (
              "Continue"
            )}
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export { AddName, AddLabels, AddInfo };
