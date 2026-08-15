import { useState } from "react";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { app } from "../../Firebase/Firebase.init";

const auth = getAuth(app);

export default function ChangePassword() {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      Swal.fire({
        title: "Session expired",
        text: "Please log in again and try again.",
        icon: "error",
      });
      return;
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        title: "Missing information",
        text: "Please fill in all password fields.",
        icon: "error",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: "Passwords do not match",
        text: "New password and confirm password must be the same.",
        icon: "error",
      });
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire({
        title: "Password too short",
        text: "New password must be at least 6 characters long.",
        icon: "error",
      });
      return;
    }

    try {
      setIsUpdating(true);

      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      Swal.fire({
        title: "Password updated",
        text: "Your password has been changed successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      const code = error?.code;

      if (code === "auth/wrong-password" || code === "auth/invalid-credential") {
        Swal.fire({
          title: "Old password is incorrect",
          text: "Please enter your current password correctly and try again.",
          icon: "error",
        });
        return;
      }

      Swal.fire({
        title: "Password update failed",
        text: error?.message || "Something went wrong. Please try again.",
        icon: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#E6F0FF] bg-[#F5FAFF] p-6 shadow-xl sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#0F172A] sm:text-3xl">Change Password</h2>
        <p className="mt-2 text-sm text-[#475569]">Update your current password using your existing account credentials.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm" style={{ color: "#475569" }}>
              Current / Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your current password"
              className="w-full rounded-xl border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#0F172A] focus:border-[#2974FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm" style={{ color: "#475569" }}>
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#0F172A] focus:border-[#2974FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm" style={{ color: "#475569" }}>
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full rounded-xl border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#0F172A] focus:border-[#2974FF] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="mt-6 w-full rounded-xl bg-[#2974FF] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1558D6] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isUpdating ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
