import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaHeadset,
  FaQuestionCircle,
  FaBug,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "general",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone Support",
      details: ["+880 123 456 7890", "+880 987 654 3210"],
      description: "Call us for immediate assistance",
    },
    {
      icon: FaEnvelope,
      title: "Email Support",
      details: ["support@ticketbari.com", "info@ticketbari.com"],
      description: "Send us your queries anytime",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Office Address",
      details: ["House 123, Road 456", "Dhanmondi, Dhaka 1205", "Bangladesh"],
      description: "Visit our headquarters",
    },
    {
      icon: FaClock,
      title: "Business Hours",
      details: [
        "24/7 Online Support",
        "Office: 9 AM - 6 PM",
        "Sat-Thu (Fri Closed)",
      ],
      description: "We're here when you need us",
    },
  ];

  const supportCategories = [
    { value: "general", label: "General Inquiry", icon: FaQuestionCircle },
    { value: "booking", label: "Booking Support", icon: FaHeadset },
    { value: "technical", label: "Technical Issue", icon: FaBug },
    { value: "feedback", label: "Feedback", icon: FaPaperPlane },
  ];

  const faqs = [
    {
      question: "How can I cancel my booking?",
      answer:
        "You can cancel your booking from your dashboard or contact our support team. Cancellation policies vary by operator.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, we use industry-standard SSL encryption and secure payment gateways to protect your financial information.",
    },
    {
      question: "Can I modify my booking after confirmation?",
      answer:
        "Modifications depend on the operator's policy. Contact support with your booking details for assistance.",
    },
    {
      question: "What if I don't receive my ticket?",
      answer:
        "Tickets are sent via email and SMS. Check your spam folder or contact support if you haven't received them within 15 minutes.",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-6">Get in Touch</h1>
          <p className="text-xl text-body max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help you 24/7.
            Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="card-consistent p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="text-2xl text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="heading-2 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label-custom">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input-custom"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label-custom">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input-custom"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label-custom">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input-custom"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>

                <div>
                  <label className="form-label-custom">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-input-custom"
                  >
                    {supportCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label-custom">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="form-input-custom resize-none"
                    placeholder="Please describe your inquiry in detail..."
                    required
                  ></textarea>
                </div>

                {submitStatus === "success" && (
                  <div className="form-success">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="form-error">
                    ✗ Failed to send message. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-custom w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </div>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Find Us on Map
                </h3>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <FaMapMarkerAlt className="text-4xl mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">Dhanmondi, Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com/ticketbari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://twitter.com/ticketbari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://instagram.com/ticketbari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://linkedin.com/company/ticketbari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>

              <div className="card-consistent p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Emergency Support
                </h3>
                <p className="text-body text-sm mb-3">
                  For urgent travel-related issues, call our emergency hotline:
                </p>
                <div className="text-primary font-semibold text-lg">
                  +880 911 TICKET (842538)
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Available 24/7 for emergency assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="card-consistent p-6 group">
                <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100 flex items-center justify-between">
                  {faq.question}
                  <span className="text-primary group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 text-body">{faq.answer}</div>
              </details>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-body mb-4">
              Can't find what you're looking for?
            </p>
            <a href="/help" className="btn-outline-custom">
              Visit Help Center
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
