import { IoClose } from "react-icons/io5";
export function UserDetailsModal({ user }) {
  if (!user) return null;

  const userDetails = [
    { label: "User Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Phone number", value: user.phone },
    {
      label: "Address",
      value: user.address || "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    { label: "Joining date", value: user.joinDate },
  ];

  return (
    <div className="bg-white">
      <h1 className="text-xl text-center  mb-8 font-bold">User Details</h1>
      {userDetails.map((detail, index) => (
        <div
          key={detail.label}
          className={`flex items-center justify-between px-6 py-4 ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          }`}
        >
          <span className="text-sm font-medium text-gray-700 min-w-[120px]">
            {detail.label}
          </span>
          <span className="text-sm text-gray-900 text-right flex-1 ml-4">
            {detail.value}
          </span>
        </div>
      ))}
    </div>
  );
}
