import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TT from "../../assets/TT.svg";
import ZealGrid from "../../assets/ZealGrid.svg";
import RadioButton from "../../assets/RadioButton.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { signIn, resetPassword } from "../../redux/slice/authSlice";
import Input from "../../components/common/Input";
import CustomButton from "../../components/common/CustomButton";
import Loading from "../../components/common/Loading";
import DialogWrapper from "../../components/common/DialogWrapper";
import DialogActionsWrapper from "../../components/common/DialogActionsWrapper";
import DialogTitleWrapper from "../../components/common/DialogTitleWrapper";
import DialogContentWrapper from "../../components/common/DialogContentWrapper";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 charachters long" }),
});

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      await dispatch(signIn(data)).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("email", { type: "manual", message: "Failed to sign in" });
    }
  };

  const handleForgotPassword = async () => {
    try {
      await dispatch(resetPassword(forgotPasswordEmail)).unwrap();
      setForgotPasswordEmail("");
      setOpen(false);
      alert("Password reset email sent");
    } catch (error) {
      setResetPasswordError("Could not reset password");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9F9]">
      <div className="flex w-full max-w-screen-lg mx-auto p-8 relative">
        <div className="w-1/2 bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mt-8 mb-8">
            Sign in <br /> to ZealGrid
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mt-10 mb-10">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Input
                    type="email"
                    label="Email"
                    variant="standard"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    fullWidth={true}
                  />
                )}
              />
            </div>
            <div className="relative mt-10 mb-10">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Input
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    variant="standard"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    fullWidth={true}
                  />
                )}
              />

              {showPassword ? (
                <VisibilityOff
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Visibility
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <div className="text-right mb-6">
              <button
                type="button"
                className="text-indigo-600 hover:underline"
                onClick={() => setOpen(true)}
              >
                Forgot Password?
              </button>
            </div>
            <div className="mt-8 mb-6 text-center">
              <CustomButton
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                {isSubmitting ? <Loading size={30} color="white" /> : "Sign In"}
              </CustomButton>
            </div>
          </form>
        </div>

        <div className="w-1/2 relative flex items-center justify-center">
          <div className="absolute top-5 left-[70%] transform -rotate-12">
            <img src={TT} alt="TT SVG" className="w-[162.87px] h-[112.46px]" />
          </div>
          <div className="absolute top-[50%] left-[70%] transform -translate-y-[-50%]">
            <img src={ZealGrid} alt="Zeal Grid SVG" className="w-48" />
          </div>
          <div className="absolute bottom-5 left-[70%]">
            <img
              src={RadioButton}
              alt="Radio Button SVG"
              className="w-24 transform rotate-25"
            />
          </div>
        </div>
      </div>

      <DialogWrapper
        open={open}
        onClose={() => {
          setOpen(false);
          setForgotPasswordEmail("");
          setResetPasswordError("");
        }}
      >
        <DialogTitleWrapper>Reset Password</DialogTitleWrapper>
        <DialogContentWrapper>
          <Input
            autoFocus={true}
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth={true}
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
          />
          {resetPasswordError && (
            <div className="text-red-500 text-center mb-4">
              {resetPasswordError}
            </div>
          )}
        </DialogContentWrapper>
        <DialogActionsWrapper>
          <CustomButton
            onClick={() => {
              setOpen(false);
              setForgotPasswordEmail("");
              setResetPasswordError("");
            }}
            variant="text"
            color="primary"
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={handleForgotPassword}
            variant="text"
            color="primary"
          >
            Reset Password
          </CustomButton>
        </DialogActionsWrapper>
      </DialogWrapper>
    </div>
  );
};

export default SignInPage;
