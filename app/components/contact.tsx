import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  Instagram,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isHovered, setIsHovered] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Form submitted:", formData);
      alert("Message sent! (Demo only)");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "hello@example.com",
      link: "mailto:hello@example.com",
      delay: 0,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: "+62 812 3456 7890",
      link: "tel:+6281234567890",
      delay: 0.1,
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      value: "Jakarta, Indonesia",
      link: null,
      delay: 0.2,
    },
  ];

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, link: "#", name: "LinkedIn" },
    { icon: <Github className="w-5 h-5" />, link: "#", name: "GitHub" },
    { icon: <Instagram className="w-5 h-5" />, link: "#", name: "Instagram" },
  ];

  return (
    <section
      id="contact"
      className="relative  py-16 sm:py-20 lg:py-24"
    >
      {/* Enhanced Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 border-4 border-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 border-4 border-amber-400 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-48 sm:w-64 h-48 sm:h-64 border-4 border-yellow-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
      </div>

      {/* Floating Elements - Hidden on mobile for cleaner look */}
      <div className="hidden sm:block absolute top-20 right-20 w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-ping"></div>
      <div
        className="hidden sm:block absolute bottom-40 left-20 w-2 h-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="hidden sm:block absolute top-1/3 right-1/4 w-4 h-4 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-12 sm:mb-16"
          style={{ animation: "fadeInUp 0.6s ease-out both" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mb-4 sm:mb-6">
            <MessageCircle className="w-4 h-4 text-gray-900" />
            <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Get In Touch
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4">
            Mari Berkolaborasi!
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Siap mewujudkan ide brilian Anda? Hubungi saya dan mari ciptakan
            sesuatu yang luar biasa bersama.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left side - Contact Info */}
          <div className="space-y-6">
            {/* Hero Message Card */}
            <div
              className="relative group"
              style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}
            >
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-700 transform hover:scale-[1.02] transition-all duration-500">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl shadow-lg shrink-0">
                    <Sparkles className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">
                      Let's Create Something Amazing!
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      Punya proyek menarik atau sekadar ingin ngobrol? Mari kita
                      wujudkan ide-ide brilian bersama! 🚀
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((item, idx) => (
                <div
                  key={idx}
                  className="transform transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    animation: `slideInLeft 0.6s ease-out ${
                      0.2 + item.delay
                    }s both`,
                  }}
                >
                  <a
                    href={item.link || "#"}
                    className={`group relative flex items-center gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-500 overflow-hidden bg-white shadow-lg ${
                      item.link
                        ? "border-gray-200 hover:border-amber-400 hover:shadow-2xl cursor-pointer"
                        : "border-gray-200"
                    }`}
                    onMouseEnter={() => setIsHovered(idx)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    {/* Sliding background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>

                    {/* Icon */}
                    <div
                      className={`relative z-10 p-3 sm:p-4 rounded-xl transition-all duration-500 shadow-md shrink-0 ${
                        isHovered === idx
                          ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-gray-900 scale-110 rotate-6"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 min-w-0">
                      <p
                        className={`text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                          isHovered === idx ? "text-amber-400" : "text-gray-500"
                        }`}
                      >
                        {item.title}
                      </p>
                      <p
                        className={`text-sm sm:text-base lg:text-lg font-bold transition-colors duration-300 truncate ${
                          isHovered === idx ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>

                    {/* Arrow */}
                    {item.link && (
                      <div className="relative z-10 shrink-0">
                        <ArrowRight
                          className={`w-5 h-5 transition-all duration-300 ${
                            isHovered === idx
                              ? "text-amber-400 translate-x-1"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                    )}
                  </a>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div
              className="pt-4 sm:pt-6"
              style={{ animation: "fadeInUp 0.8s ease-out 0.5s both" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"></div>
                <p className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Follow Me
                </p>
              </div>
              <div className="flex gap-3 sm:gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    className="group relative p-3 sm:p-4 rounded-xl border-2 border-gray-200 hover:border-transparent transition-all duration-500 hover:scale-110 overflow-hidden bg-white shadow-md hover:shadow-xl"
                    title={social.name}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-500 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"
                      style={{ transitionDelay: "0.1s" }}
                    ></div>

                    {/* Icon */}
                    <div className="relative z-10 text-gray-900 group-hover:text-gray-900 transform group-hover:rotate-12 transition-all duration-300">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div
            className="relative group"
            style={{ animation: "fadeInUp 0.8s ease-out 0.6s both" }}
          >
            <div className="relative bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-200 p-6 sm:p-8 lg:p-10 shadow-xl">
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-yellow-500/20 to-transparent rounded-bl-3xl"></div>

              {/* Header */}
              <div className="mb-6 sm:mb-8 relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-3">
                  <div className="w-1.5 sm:w-2 h-10 sm:h-12 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full"></div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
                      Send Message
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      I'll reply within 24 hours ⚡
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 sm:space-y-6 relative z-10">
                {/* Name Input */}
                <div className="relative group/input">
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wider">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput("name")}
                      onBlur={() => setFocusedInput(null)}
                      required
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-transparent focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-gray-900 font-medium text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                    {focusedInput === "name" && (
                      <div className="absolute inset-0 rounded-xl border-2 border-amber-400 animate-pulse pointer-events-none"></div>
                    )}
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative group/input">
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput("email")}
                      onBlur={() => setFocusedInput(null)}
                      required
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-transparent focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-gray-900 font-medium text-sm sm:text-base"
                      placeholder="john@example.com"
                    />
                    {focusedInput === "email" && (
                      <div className="absolute inset-0 rounded-xl border-2 border-amber-400 animate-pulse pointer-events-none"></div>
                    )}
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative group/input">
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wider">
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput("message")}
                      onBlur={() => setFocusedInput(null)}
                      required
                      rows="4"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-transparent focus:outline-none transition-all duration-300 resize-none bg-gray-50 focus:bg-white text-gray-900 font-medium text-sm sm:text-base"
                      placeholder="Tell me about your amazing project..."
                    />
                    {focusedInput === "message" && (
                      <div className="absolute inset-0 rounded-xl border-2 border-amber-400 animate-pulse pointer-events-none"></div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="group/btn relative w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold py-4 sm:py-5 rounded-xl shadow-2xl transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden hover:shadow-amber-400/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {/* Animated shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover/btn:opacity-50 transform -skew-x-12 group-hover/btn:translate-x-full transition-all duration-1000"></div>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-xl border-2 border-amber-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>

                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-amber-400 rounded-full animate-spin"></div>
                      <span className="relative text-base sm:text-lg tracking-wider">
                        Sending...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="relative text-base sm:text-lg tracking-wider">
                        Send Message
                      </span>
                      <Send className="w-5 h-5 relative group-hover/btn:translate-x-2 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
