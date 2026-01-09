import React from "react";
import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaUsers,
  FaAward,
  FaShieldAlt,
  FaClock,
  FaHeart,
  FaRocket,
  FaGlobe,
  FaHandshake,
} from "react-icons/fa";

const About = () => {
  const stats = [
    { icon: FaUsers, label: "Happy Customers", value: "50,000+" },
    { icon: FaBus, label: "Bus Routes", value: "500+" },
    { icon: FaTrain, label: "Train Routes", value: "200+" },
    { icon: FaAward, label: "Years of Service", value: "5+" },
  ];

  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure & Safe",
      description:
        "Your data and payments are protected with bank-level security encryption.",
    },
    {
      icon: FaClock,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to assist you whenever you need help.",
    },
    {
      icon: FaRocket,
      title: "Fast Booking",
      description:
        "Book your tickets in just a few clicks with our streamlined process.",
    },
    {
      icon: FaGlobe,
      title: "Wide Coverage",
      description:
        "Extensive network covering all major routes across Bangladesh.",
    },
  ];

  const team = [
    {
      name: "Ahmed Rahman",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description:
        "Visionary leader with 10+ years in transportation technology.",
    },
    {
      name: "Fatima Khan",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description:
        "Tech expert passionate about creating seamless user experiences.",
    },
    {
      name: "Mohammad Ali",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description:
        "Operations specialist ensuring smooth service delivery nationwide.",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-6">About TicketBari</h1>
          <p className="text-xl text-body max-w-3xl mx-auto mb-8">
            We're revolutionizing travel in Bangladesh by making ticket booking
            simple, secure, and accessible to everyone. Your journey starts with
            us.
          </p>
          <div className="flex justify-center space-x-8 text-primary">
            <FaBus className="text-4xl" />
            <FaTrain className="text-4xl" />
            <FaShip className="text-4xl" />
            <FaPlane className="text-4xl" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="text-2xl text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">Our Story</h2>
              <div className="space-y-4 text-body">
                <p>
                  Founded in 2019, TicketBari emerged from a simple observation:
                  booking travel tickets in Bangladesh was unnecessarily
                  complicated and time-consuming. Our founders, having
                  experienced the frustration firsthand, decided to create a
                  solution.
                </p>
                <p>
                  What started as a small team with a big vision has grown into
                  Bangladesh's leading digital ticketing platform. We've served
                  over 50,000 customers and continue to expand our network of
                  transport partners.
                </p>
                <p>
                  Today, we're proud to offer seamless booking experiences for
                  buses, trains, launches, and flights, making travel accessible
                  to everyone across Bangladesh.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop"
                alt="Our journey"
                className="rounded-xl shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-xl shadow-lg">
                <FaHeart className="text-3xl mb-2" />
                <div className="font-bold">Made with</div>
                <div className="text-sm">Love in Bangladesh</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Mission & Vision</h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              Driving the future of transportation in Bangladesh
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-consistent p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <FaRocket className="text-2xl text-primary" />
              </div>
              <h3 className="heading-3 mb-4">Our Mission</h3>
              <p className="text-body">
                To democratize travel by providing a simple, secure, and
                reliable platform that connects travelers with transport
                services across Bangladesh, making every journey effortless and
                enjoyable.
              </p>
            </div>

            <div className="card-consistent p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-6">
                <FaGlobe className="text-2xl text-secondary" />
              </div>
              <h3 className="heading-3 mb-4">Our Vision</h3>
              <p className="text-body">
                To become the leading digital transportation platform in South
                Asia, setting new standards for customer experience and
                technological innovation in the travel industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Why Choose TicketBari?</h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              We're committed to providing the best travel booking experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-700 rounded-full shadow-md mb-6">
                    <Icon className="text-2xl text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-body text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Meet Our Team</h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              The passionate people behind TicketBari's success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card-consistent p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {member.name}
                </h3>
                <div className="text-primary font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-body text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <FaHandshake className="text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Trust</h3>
              <p className="opacity-90">
                Building lasting relationships through transparency and
                reliability
              </p>
            </div>
            <div>
              <FaRocket className="text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="opacity-90">
                Continuously improving our platform with cutting-edge technology
              </p>
            </div>
            <div>
              <FaHeart className="text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Customer First</h3>
              <p className="opacity-90">
                Every decision we make is centered around our customers' needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-body mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust TicketBari for their
            travel needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/tickets" className="btn-primary-custom">
              Book Your Ticket
            </a>
            <a href="/contact" className="btn-outline-custom">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
