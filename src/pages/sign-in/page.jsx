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

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(signIn({ email, password })).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to sign-In");
    }
  };

  const handleForgotPassword = async () => {
    try {
      await dispatch(resetPassword(forgotPasswordEmail)).unwrap();
      setForgotPasswordEmail("");
      setOpen(false);
      alert("Password reset email sent");
    } catch (error) {
      setError("Failed to reset password");
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F9F9F9" }}>
      <div className="flex w-full max-w-screen-lg mx-auto p-8 relative">
        <div className="w-1/2 bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mt-8 mb-8">
            Sign in <br /> to ZealGrid
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mt-10 mb-10">
              <Input
                type="email"
                id="email"
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth={true}
                required
              />
            </div>
            <div className="relative mt-10 mb-10">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                label="password"
                variant="standard"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth={true}
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
            {error && <p className="text-red-500 text-center">{error}</p>}
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
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                {loading ? <Loading size={30} color="white" /> : "Sign In"}
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

      <DialogWrapper open={open} onClose={() => setOpen(false)}>
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
        </DialogContentWrapper>
        <DialogActionsWrapper>
          <CustomButton
            onClick={() => setOpen(false)}
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
