import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { app } from "../../Firebase/Firebase.init";

const auth = getAuth(app);

export default function ChangePassword() {
  const { user } = useAuth();

  const handleSendResetEmail = async () => {
    if (!user?.email) {
      Swal.fire({
        title: "No email found",
        text: "Please log in again and try again.",
        icon: "error",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, user.email);
      Swal.fire({
        title: "Password reset email sent",
        text: `A reset link has been sent to ${user.email}.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Failed to send reset email",
        text: error?.message || "Something went wrong.",
        icon: "error",
      });
    }
  };

  return (
    <div className="rounded-2xl border border-[#E6F0FF] bg-[#F5FAFF] p-6 shadow-xl sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#0F172A] sm:text-3xl">Change Password</h2>
        <p className="mt-2 text-sm text-[#475569]">Send a password reset email to your registered email address.</p>
      </div>

      <div className="max-w-lg rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <p className="mb-4 text-sm text-[#475569]">Email address:</p>
        <p className="mb-6 rounded-lg bg-[#E6F0FF] px-4 py-3 font-medium text-[#0F172A]">{user?.email || "Not available"}</p>

        <button
          type="button"
          onClick={handleSendResetEmail}
          className="w-full rounded-xl bg-[#2974FF] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1558D6]"
        >
          Send password reset email
        </button>
      </div>
    </div>
  );
}
