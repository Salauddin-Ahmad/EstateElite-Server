import useAuth from "../../../hook/useAuth";

const MyProfile = () => {
  const {user} = useAuth();
  

  return (
    <div className="flex gap-8">
      <div>
        <h2 className=" text-2xl">
          <span>Hi, Welcome </span>
          {user.displayName ? user.displayName : "Back"}
        </h2>
        <h2 className="text-2xl my-2">Role: User</h2>
      </div>

      <div className="flex justify-center ">
        <img
          className="rounded-md w-72 border border-slate-600 shadow-stone-900 shadow-2xl  "
          src={user.photoUrl || user.photoURL}
          alt=""
        />
      </div>
    </div>
  );
};

export default MyProfile;
