import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import SEOHead from "../components/SEO/SEOHead";
import {
  FcCustomerSupport,
  FcFlashOn,
  FcLock,
  FcClock,
  FcGlobe,
  FcApproval,
} from "react-icons/fc";
import {
  MdLocationOn,
  MdStar,
  MdArrowForward,
  MdPhone,
  MdEmail,
} from "react-icons/md";
import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaUsers,
  FaTicketAlt,
  FaAward,
  FaQuoteLeft,
  FaPlay,
  FaNewspaper,
  FaCalendarAlt,
  FaPercent,
  FaFire,
  FaClock,
} from "react-icons/fa";

const TicketCardMini = ({ ticket, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="card-premium group"
  >
    <figure className="h-48 overflow-hidden relative rounded-t-2xl">
      <motion.img
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        src={
          ticket.imageUrl ||
          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop"
        }
        alt={ticket.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 right-4"
      >
        <span className="badge-info bg-primary-500 text-white border-0">
          {ticket.ticketType}
        </span>
      </motion.div>
      <div className="absolute top-4 left-4">
        <span className="badge-success bg-accent-500 text-white border-0">
          <FaFire className="w-3 h-3 mr-1" />
          Hot Deal
        </span>
      </div>
    </figure>
    <div className="p-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-bold font-display mb-3 text-neutral-800 dark:text-neutral-200 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
      >
        {ticket.title}
      </motion.h2>
      <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        <MdLocationOn className="mr-1 text-primary-500" />
        <span className="font-medium">
          {ticket.from} → {ticket.to}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold font-display text-primary-600 dark:text-primary-400">
            ${ticket.price}
          </span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            per person
          </span>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={`/ticket/${ticket._id}`}
            className="btn-primary-custom text-sm"
          >
            <FaTicketAlt className="w-4 h-4 mr-2" />
            Book Now
          </Link>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Newsletter subscription handler
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast.success("Successfully subscribed to newsletter!");
      e.target.reset();
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  const { data: advertisedTickets = [] } = useQuery({
    queryKey: ["advertisedTickets"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          "https://ticket-bari-server-pi.vercel.app/tickets/advertised"
        );
        return res.data;
      } catch (error) {
        console.warn("API not available, using mock data");
        return [
          {
            _id: "1",
            title: "Dhaka to Chittagong Express",
            from: "Dhaka",
            to: "Chittagong",
            price: 45,
            ticketType: "Bus",
            imageUrl:
              "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop",
          },
          {
            _id: "2",
            title: "Cox's Bazar Beach Tour",
            from: "Dhaka",
            to: "Cox's Bazar",
            price: 85,
            ticketType: "Bus",
            imageUrl:
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop",
          },
          {
            _id: "3",
            title: "Sylhet Tea Garden Express",
            from: "Dhaka",
            to: "Sylhet",
            price: 55,
            ticketType: "Train",
            imageUrl:
              "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=1000&auto=format&fit=crop",
          },
        ];
      }
    },
  });

  const stats = [
    {
      icon: FaUsers,
      label: "Happy Customers",
      value: "50,000+",
      color: "text-primary-600 dark:text-primary-400",
    },
    {
      icon: FaTicketAlt,
      label: "Tickets Booked",
      value: "200,000+",
      color: "text-secondary-600 dark:text-secondary-400",
    },
    {
      icon: FaBus,
      label: "Transport Partners",
      value: "500+",
      color: "text-accent-600 dark:text-accent-400",
    },
    {
      icon: FaAward,
      label: "Years of Service",
      value: "5+",
      color: "text-success-600 dark:text-success-400",
    },
  ];

  const services = [
    {
      icon: FaBus,
      title: "Bus Tickets",
      description:
        "Comfortable AC and non-AC buses covering all major routes across Bangladesh",
      routes: "500+ Routes",
      color: "bg-gradient-to-br from-primary-500 to-primary-600",
    },
    {
      icon: FaTrain,
      title: "Train Tickets",
      description: "Fast and reliable train services connecting major cities",
      routes: "200+ Routes",
      color: "bg-gradient-to-br from-secondary-500 to-secondary-600",
    },
    {
      icon: FaShip,
      title: "Launch Tickets",
      description: "River transport connecting coastal and island areas",
      routes: "100+ Routes",
      color: "bg-gradient-to-br from-accent-500 to-accent-600",
    },
    {
      icon: FaPlane,
      title: "Flight Tickets",
      description: "Domestic and international flight bookings",
      routes: "50+ Routes",
      color: "bg-gradient-to-br from-success-500 to-success-600",
    },
  ];

  const features = [
    {
      icon: FcLock,
      title: "Secure Booking",
      description:
        "Bank-level security with SSL encryption for all transactions",
    },
    {
      icon: FcFlashOn,
      title: "Instant Confirmation",
      description: "Get your tickets confirmed instantly via email and SMS",
    },
    {
      icon: FcCustomerSupport,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your queries",
    },
    {
      icon: FcClock,
      title: "Easy Cancellation",
      description: "Hassle-free cancellation and refund process",
    },
    {
      icon: FcGlobe,
      title: "Wide Network",
      description: "Extensive coverage across Bangladesh and beyond",
    },
    {
      icon: FcApproval,
      title: "Verified Partners",
      description: "All transport operators are verified and trusted",
    },
  ];

  const testimonials = [
    {
      name: "Ahmed Rahman",
      role: "Business Traveler",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment:
        "TicketBari has made my business travels so much easier. The booking process is smooth and customer service is excellent.",
    },
    {
      name: "Fatima Khan",
      role: "Student",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment:
        "As a student, I appreciate the affordable prices and easy booking. Never had any issues with my tickets.",
    },
    {
      name: "Mohammad Ali",
      role: "Family Traveler",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment:
        "Booked tickets for my entire family's vacation. The process was seamless and we got great seats!",
    },
  ];

  return (
    <>
      <SEOHead
        title="TicketBari - Your Ultimate Travel Companion in Bangladesh"
        description="Book bus, train, launch, and flight tickets seamlessly across Bangladesh. Best prices, instant confirmation, 24/7 support, and 50,000+ happy customers. Start your journey today!"
        keywords="ticket booking Bangladesh, bus tickets Dhaka, train tickets Bangladesh, flight booking, launch tickets, online ticket booking, travel Bangladesh, TicketBari"
        url="/"
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="animate-fade-in"
      >
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="hero-overlay" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=1080&fit=crop")`,
            }}
          />
          <div className="relative z-10 container-custom text-center text-white">
            <motion.h1
              variants={itemVariants}
              className="heading-1 text-white mb-6"
            >
              Travel Made <span className="text-secondary-400">Simple</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed"
            >
              Book Bus, Train, Launch, and Flight tickets seamlessly across
              Bangladesh. Your next adventure starts here with the best prices
              and instant confirmation.
            </motion.p>
            <motion.div variants={itemVariants} className="cta-buttons">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/tickets"
                  className="btn-primary-custom text-lg px-8 py-4"
                >
                  <FaTicketAlt className="mr-2" />
                  Book Your Ticket
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toast.info("Demo video coming soon!")}
                className="btn-ghost-custom bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
              >
                <FaPlay className="mr-2" />
                Watch Demo
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* 2. STATS SECTION */}
        <section className="section-padding bg-surface-light dark:bg-surface-dark">
          <div className="container-custom">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid-cards-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    variants={scaleVariants}
                    className="stats-card"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="stats-icon"
                    >
                      <Icon className={`text-3xl ${stat.color}`} />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      className="stats-number"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="stats-label">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* 3. SERVICES SECTION */}
        <section className="section-padding section-neutral">
          <div className="container-custom">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-2 mb-6">Our Transportation Services</h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Choose from our comprehensive range of transportation options
                designed to meet all your travel needs across Bangladesh
              </p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid-cards-4"
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="service-card group"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`service-icon ${service.color}`}
                    >
                      <Icon className="text-3xl" />
                    </motion.div>
                    <h3 className="text-2xl font-bold font-display mb-4 text-neutral-800 dark:text-neutral-200">
                      {service.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="badge-info">{service.routes}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* 4. FEATURED DEALS SECTION */}
        <section className="section-padding bg-surface-light dark:bg-surface-dark">
          <div className="container-custom">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaFire className="text-3xl text-accent-500" />
                <h2 className="heading-2 text-primary-600 dark:text-primary-400">
                  Featured Deals
                </h2>
                <FaPercent className="text-3xl text-accent-500" />
              </div>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Hand-picked exclusive offers with the best prices and premium
                routes
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <FaClock className="text-accent-500" />
                <span className="text-sm text-accent-600 dark:text-accent-400 font-semibold">
                  Limited Time Offers - Book Now!
                </span>
              </div>
            </motion.div>

            {advertisedTickets.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid-cards-3"
              >
                {advertisedTickets.slice(0, 6).map((ticket, index) => (
                  <TicketCardMini
                    key={ticket._id}
                    ticket={ticket}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={scaleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="card-premium p-16 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <FaTicketAlt className="text-6xl text-primary-500 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                  Exciting Deals Coming Soon!
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                  We're preparing amazing offers for you. Check back soon for
                  exclusive deals!
                </p>
                <Link to="/tickets" className="btn-primary-custom">
                  Browse All Tickets
                </Link>
              </motion.div>
            )}

            {advertisedTickets.length > 0 && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Link to="/tickets" className="btn-outline-custom text-lg">
                  View All Deals
                  <MdArrowForward className="ml-2" />
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {/* 5. WHY CHOOSE US */}
        <section className="section-padding section-primary">
          <div className="container-custom">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-2 text-primary-600 dark:text-primary-400 mb-6">
                Why Choose TicketBari?
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                We're committed to providing the best travel booking experience
                with cutting-edge technology and exceptional customer service
              </p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid-cards-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="feature-card group"
                >
                  <div className="feature-icon">
                    <feature.icon className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-4 text-neutral-800 dark:text-neutral-200">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. TESTIMONIALS */}
        <section className="section-padding hero-gradient text-white">
          <div className="container-custom">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-2 text-white mb-6">
                What Our Customers Say
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Don't just take our word for it - hear from thousands of
                satisfied customers who trust TicketBari for their travel needs
              </p>
            </motion.div>

            <motion.div
              variants={scaleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="testimonial-card"
            >
              <FaQuoteLeft className="text-5xl text-primary-400 mx-auto mb-8" />
              <p className="testimonial-quote">
                "{testimonials[activeTestimonial].comment}"
              </p>
              <div className="flex items-center justify-center space-x-2 mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map(
                  (_, i) => (
                    <MdStar key={i} className="text-yellow-400 text-2xl" />
                  )
                )}
              </div>
              <div className="testimonial-author">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="testimonial-avatar"
                />
                <div className="text-left">
                  <div className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400">
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 7. NEWSLETTER SIGNUP */}
        <section className="section-padding section-secondary text-white">
          <div className="container-custom">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="cta-content"
            >
              <motion.div variants={scaleVariants}>
                <FaNewspaper className="text-6xl mx-auto mb-8" />
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="cta-title text-white"
              >
                Stay Updated with TicketBari
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="cta-description text-white/90"
              >
                Subscribe to our newsletter for exclusive deals, travel tips,
                destination guides, and be the first to know about new routes
                and special offers
              </motion.p>
              <motion.form
                variants={itemVariants}
                onSubmit={handleNewsletterSubmit}
                className="newsletter-form"
              >
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="newsletter-input"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="newsletter-button"
                >
                  Subscribe Now
                </motion.button>
              </motion.form>
              <motion.p
                variants={itemVariants}
                className="text-sm text-white/75 mt-6"
              >
                Join 50,000+ subscribers • No spam • Unsubscribe anytime
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* 8. CONTACT CTA */}
        <section className="section-padding bg-surface-light dark:bg-surface-dark">
          <div className="container-custom">
            <motion.div
              variants={scaleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="card-premium p-16 text-center"
            >
              <motion.h2 variants={itemVariants} className="heading-2 mb-6">
                Need Help Planning Your Journey?
              </motion.h2>
              <motion.p variants={itemVariants} className="cta-description">
                Our expert customer support team is available 24/7 to assist you
                with bookings, travel advice, and any questions about your
                journey
              </motion.p>
              <motion.div variants={containerVariants} className="cta-buttons">
                <motion.a
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+8801234567890"
                  className="btn-primary-custom"
                >
                  <MdPhone className="mr-2" />
                  Call Now
                </motion.a>
                <motion.a
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:support@ticketbari.com"
                  className="btn-secondary-custom"
                >
                  <MdEmail className="mr-2" />
                  Email Support
                </motion.a>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contact" className="btn-outline-custom">
                    Visit Contact Page
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Home;
