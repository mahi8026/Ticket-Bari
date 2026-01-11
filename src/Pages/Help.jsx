import React, { useState } from "react";
import {
  FaSearch,
  FaQuestionCircle,
  FaTicketAlt,
  FaCreditCard,
  FaUser,
  FaShieldAlt,
  FaPhone,
  FaEnvelope,
  FaChevronDown,
  FaChevronRight,
  FaBook,
  FaVideo,
  FaDownload,
  FaHeadset,
} from "react-icons/fa";

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { id: "all", name: "All Topics", icon: FaBook },
    { id: "booking", name: "Booking & Tickets", icon: FaTicketAlt },
    { id: "payment", name: "Payment & Refunds", icon: FaCreditCard },
    { id: "account", name: "Account & Profile", icon: FaUser },
    { id: "security", name: "Security & Privacy", icon: FaShieldAlt },
  ];

  const faqs = [
    {
      id: 1,
      category: "booking",
      question: "How do I book a ticket on TicketBari?",
      answer:
        "To book a ticket: 1) Search for your route and date, 2) Select your preferred bus/train, 3) Choose your seats, 4) Enter passenger details, 5) Make payment. You'll receive confirmation via email and SMS.",
    },
    {
      id: 2,
      category: "booking",
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes, you can cancel or modify bookings from your dashboard. Cancellation policies vary by operator. Free cancellations are usually allowed up to 2-24 hours before departure, depending on the operator's terms.",
    },
    {
      id: 3,
      category: "booking",
      question: "What if my bus/train is delayed or cancelled?",
      answer:
        "If your service is delayed or cancelled by the operator, you'll be notified immediately. You can choose to reschedule for free or get a full refund. Contact our support team for assistance.",
    },
    {
      id: 4,
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards (Visa, Mastercard), mobile banking (bKash, Nagad, Rocket), and online banking. All payments are secured with SSL encryption.",
    },
    {
      id: 5,
      category: "payment",
      question: "How long does it take to process refunds?",
      answer:
        "Refunds are processed within 5-7 business days for card payments and 1-3 business days for mobile banking. You'll receive a confirmation email once the refund is initiated.",
    },
    {
      id: 6,
      category: "payment",
      question: "Why was my payment declined?",
      answer:
        "Payment can be declined due to insufficient funds, incorrect card details, bank restrictions, or technical issues. Please check your details and try again, or contact your bank.",
    },
    {
      id: 7,
      category: "account",
      question: "How do I create an account?",
      answer:
        "Click 'Sign Up' and provide your name, email, and phone number. You can also sign up using Google. Verify your email and phone to complete registration.",
    },
    {
      id: 8,
      category: "account",
      question: "I forgot my password. How do I reset it?",
      answer:
        "Click 'Forgot Password' on the login page, enter your email, and follow the reset instructions sent to your email. The reset link is valid for 24 hours.",
    },
    {
      id: 9,
      category: "account",
      question: "How do I update my profile information?",
      answer:
        "Go to Dashboard > Profile to update your personal information, contact details, and preferences. Some changes may require verification.",
    },
    {
      id: 10,
      category: "security",
      question: "Is my personal information safe?",
      answer:
        "Yes, we use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties without consent.",
    },
    {
      id: 11,
      category: "security",
      question: "How do I report a security concern?",
      answer:
        "Report security issues immediately to security@ticketbari.com or call our security hotline at +880-911-SECURE. We take all security concerns seriously.",
    },
    {
      id: 12,
      category: "booking",
      question: "Can I book tickets for someone else?",
      answer:
        "Yes, you can book tickets for family and friends. Just enter their details during booking. The ticket holder must carry valid ID matching the booking details.",
    },
  ];

  const quickActions = [
    {
      title: "Track Your Booking",
      description: "Check your booking status and get real-time updates",
      icon: FaTicketAlt,
      action: "Track Now",
      link: "/dashboard/my-bookings",
    },
    {
      title: "Contact Support",
      description: "Get help from our customer service team",
      icon: FaHeadset,
      action: "Contact Us",
      link: "/contact",
    },
    {
      title: "Download App",
      description: "Get the mobile app for easier booking",
      icon: FaDownload,
      action: "Download",
      link: "#",
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step booking guides",
      icon: FaVideo,
      action: "Watch Now",
      link: "#",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (faqId) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-6">Help Center</h1>
          <p className="text-xl text-body max-w-2xl mx-auto mb-8">
            Find answers to common questions, get support, and learn how to make
            the most of TicketBari.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-12">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  className="card-consistent p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="text-2xl text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {action.title}
                  </h3>
                  <p className="text-body text-sm mb-4">{action.description}</p>
                  <a href={action.link} className="btn-primary-custom text-sm">
                    {action.action}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              Find quick answers to the most common questions
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  <Icon className="text-sm" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="card-consistent overflow-hidden">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <FaQuestionCircle className="text-primary mt-1 flex-shrink-0" />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {openFaq === faq.id ? (
                          <FaChevronDown className="text-primary" />
                        ) : (
                          <FaChevronRight className="text-gray-400" />
                        )}
                      </div>
                    </button>

                    {openFaq === faq.id && (
                      <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-600">
                        <div className="pt-4 text-body">{faq.answer}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No results found
                </h3>
                <p className="text-body mb-4">
                  Try adjusting your search terms or browse different categories
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="btn-outline-custom"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Still Need Help?</h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              Our support team is here to assist you 24/7
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card-consistent p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <FaPhone className="text-2xl text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Call Us
              </h3>
              <p className="text-body text-sm mb-4">
                Speak directly with our support team
              </p>
              <a
                href="tel:+8801234567890"
                className="text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                +880 164 688 6795
              </a>
            </div>

            <div className="card-consistent p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                <FaEnvelope className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Email Support
              </h3>
              <p className="text-body text-sm mb-4">
                Send us your questions anytime
              </p>
              <a
                href="mailto:support@ticketbari.com"
                className="text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                mahimrahman07@gmail.com
              </a>
            </div>

            <div className="card-consistent p-6 text-center md:col-span-2 lg:col-span-1">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                <FaHeadset className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Live Chat
              </h3>
              <p className="text-body text-sm mb-4">
                Get instant help through live chat
              </p>
              <button className="btn-primary-custom text-sm">Start Chat</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
