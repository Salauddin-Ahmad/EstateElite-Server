import useAgent from "../../../hook/useAgent";
import useAuth from "../../../hook/useAuth";

const AgentProfile = () => {
    const { user } = useAuth();
    const [isAgent, isAgentLoading] = useAgent();

    if (isAgentLoading) {
        <h1>...Loading</h1>
    }

    if (!isAgent) {
        return <h2 className="text-center text-2xl">Access Denied</h2>;
      }



   


  return (
    <div className="flex gap-8">
      <div>
        <h2 className="text-2xl">
          <span>Hi, Welcome </span>
          {user.displayName ? user.displayName : "Back"}
        </h2>
        <h2 className="text-2xl my-2">Role: {isAgent ?  'Agent' : 'Unknown'}</h2>
      </div>

      <div className="flex justify-center">
        <img
          className="rounded-md w-72 border border-slate-600 shadow-stone-900 shadow-2xl"
          src={user.photoUrl || user.photoURL}
          alt=""
        />
      </div>
    </div>
  );
};

export default AgentProfile;
