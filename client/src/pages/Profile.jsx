import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold">Profile</h2>
        <div className="mt-4 space-y-2">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
