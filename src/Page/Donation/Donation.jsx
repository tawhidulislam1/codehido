import { useState } from "react";
import { FaHeart, FaEnvelope, FaMoneyBillWave } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Donation = () => {
  const axiosPublic = useAxiosPublic();
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
    cause: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosPublic.post("/donation-request", form);
      setSuccess(true);
      setForm({ name: "", email: "", amount: "", cause: "", message: "" });
      Swal.fire({
        title: "Donation Request Sent!",
        text: "Your donation request has been submitted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Donation form error:", error);
      Swal.fire({
        title: "Request failed",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FAFF] py-16 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-3/5 p-8 sm:p-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="p-3 rounded-full bg-[#E6F0FF] text-[#2974FF]">
              <FaHeart className="text-2xl" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#2974FF] font-semibold">
                Support Our Mission
              </p>
              <h1 className="text-4xl font-bold text-[#0F172A]">Donation Request</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full p-4 rounded-xl border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2974FF]"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="w-full p-4 rounded-xl border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2974FF]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                min="1"
                required
                placeholder="Amount (BDT)"
                className="w-full p-4 rounded-xl border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2974FF]"
              />

              <input
                type="text"
                name="cause"
                value={form.cause}
                onChange={handleChange}
                required
                placeholder="Donation Cause"
                className="w-full p-4 rounded-xl border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2974FF]"
              />
            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              required
              placeholder="Tell us why you want to support this cause"
              className="w-full p-4 rounded-xl border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2974FF]"
            ></textarea>

            <button
              type="submit"
              className="bg-[#2974FF] hover:bg-[#1558D6] text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              Send Donation Request
            </button>

            {success && (
              <p className="text-green-600 font-medium">Donation request sent successfully!</p>
            )}
          </form>
        </div>

        <div className="md:w-2/5 bg-[#E6F0FF] p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-[#0F172A] mb-6">Why support us?</h2>
          <p className="text-[#475569] mb-6">
            Your contribution helps us build digital solutions, empower communities, and create a better future through technology.
          </p>

          <div className="space-y-4 text-[#0F172A]">
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-[#2974FF] text-xl" />
              <span>Transparent and impactful giving</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#2974FF] text-xl" />
              <span>Direct communication with our team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
