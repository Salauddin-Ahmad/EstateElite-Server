import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2"; // Import SweetAlert2
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { imageUpload } from "../../Utils";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();
  const { signInWithGoogle, createUser, updateUserProfile, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, image } = data;

    try {
      // Step 1: Upload image and get image URL
      const image_url = await imageUpload(image[0]);
      console.log("Image URL:", image_url);

      // Step 2: Create the user
      const result = await createUser(email, password);
      const loggedUser = result.user;
      console.log(loggedUser);

      // Step 3: Update user profile
      await updateUserProfile(name, image_url);

      // Step 4: Optimistic UI Update
      setUser({ ...loggedUser, displayName: name, photoURL: image_url });

      // Step 5: Create user entry in the database
      const userInfo = {
        name,
        email,
        photoURL: image_url,
      };

      const res = await axiosPublic.post("/users", userInfo);

      if (res.data.insertedId) {
        console.log("User added to DB");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log("Error:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error creating user",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
      toast.error(error?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log(result.user);

      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };

      const res = await axiosPublic.post("/users", userInfo);
      console.log(res.data);

      toast.success("Signin Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>EstateElite | Sign Up</title>
        <meta name="description" content="Sign Up to your EstateElite account." />
      </Helmet>
      <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
          <div
            className="hidden bg-cover bg-center lg:block lg:w-full"
            style={{ backgroundImage: `url("https://i.ibb.co/gm95zsP/cytonn-photography-TVyh-Dpv-L8-MY-unsplash.jpg")` }}
          ></div>
          <div className="w-full px-6 py-3 md:px-8 lg:w-1/2 bg-orange-300">
            <div className="flex justify-center mx-auto">
              <img className=" sm:h-8 rounded-full" src="https://i.ibb.co/CVjTYfB/Screenshot-2024-06-01-123321.png" alt="Logo" />
            </div>
            <p className="text-xl text-center text-gray-600">Get Your Free Account Now.</p>
            <div
              onClick={handleGoogleSignIn}
              className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border border-blue-500 rounded-lg hover:bg-yellow-300"
            >
              <div className="px-4 py-2">
                <svg className="w-6 h-6" viewBox="0 0 40 40">
                  <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                  <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                  <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                  <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                </svg>
              </div>
              <span className="w-5/6 px-4 py-3 font-bold text-center">Sign Up with Google</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="w-1/5 border-b lg:w-1/4"></span>
              <div className="text-xs text-center text-gray-500 uppercase hover:underline">Or Create new one</div>
              <span className="w-1/5 border-b lg:w-1/4"></span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="name">Username</label>
                <input
                  id="name"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
              </div>
              <div className="mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
              </div>

              <div className="mt-2">
  <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="password">Password</label>
  <input
    id="password"
    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
    type="password"
    {...register("password", {
      required: "Password is required",
      minLength: { value: 8, message: "Password must be at least 8 characters" },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: "Password must contain at least one letter, one number, and one special character"
      }
    })}
  />
  {errors.password && <p className="text-red-600">{errors.password.message}</p>}
</div>


              <div className="mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="image">Profile Picture</label>
                <input
                  id="image"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  type="file"
                  {...register("image", { required: "Profile picture is required" })}
                />
                {errors.image && <p className="text-red-600">{errors.image.message}</p>}
              </div>
              <div className="mt-6">
                <button className="w-full px-4 py-2 text-white bg-blue-700 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign Up</button>
              </div>
            </form>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b md:w-1/4"></span>
              <Link to="/login" className="text-xs text-gray-500 uppercase hover:underline">or sign in</Link>
              <span className="w-1/5 border-b md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
