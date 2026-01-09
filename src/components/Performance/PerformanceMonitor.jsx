import { useEffect } from "react";

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observeWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ("PerformanceObserver" in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log("LCP:", lastEntry.startTime);

          // Send to analytics if needed
          if (window.gtag) {
            window.gtag("event", "web_vitals", {
              name: "LCP",
              value: Math.round(lastEntry.startTime),
              event_category: "Performance",
            });
          }
        });

        try {
          lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
        } catch (e) {
          console.warn("LCP observer not supported");
        }

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log("FID:", entry.processingStart - entry.startTime);

            if (window.gtag) {
              window.gtag("event", "web_vitals", {
                name: "FID",
                value: Math.round(entry.processingStart - entry.startTime),
                event_category: "Performance",
              });
            }
          });
        });

        try {
          fidObserver.observe({ entryTypes: ["first-input"] });
        } catch (e) {
          console.warn("FID observer not supported");
        }

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          console.log("CLS:", clsValue);

          if (window.gtag) {
            window.gtag("event", "web_vitals", {
              name: "CLS",
              value: Math.round(clsValue * 1000),
              event_category: "Performance",
            });
          }
        });

        try {
          clsObserver.observe({ entryTypes: ["layout-shift"] });
        } catch (e) {
          console.warn("CLS observer not supported");
        }
      }

      // Navigation Timing
      if (window.performance && window.performance.timing) {
        window.addEventListener("load", () => {
          setTimeout(() => {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            const domContentLoaded =
              timing.domContentLoadedEventEnd - timing.navigationStart;
            const firstPaint = timing.responseStart - timing.navigationStart;

            console.log("Page Load Time:", loadTime);
            console.log("DOM Content Loaded:", domContentLoaded);
            console.log("First Paint:", firstPaint);

            // Send to analytics
            if (window.gtag) {
              window.gtag("event", "page_load_time", {
                value: loadTime,
                event_category: "Performance",
              });
            }
          }, 0);
        });
      }
    };

    // Error Monitoring
    const monitorErrors = () => {
      window.addEventListener("error", (event) => {
        console.error("JavaScript Error:", {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error,
        });

        // Send to error tracking service
        if (window.gtag) {
          window.gtag("event", "exception", {
            description: event.message,
            fatal: false,
          });
        }
      });

      window.addEventListener("unhandledrejection", (event) => {
        console.error("Unhandled Promise Rejection:", event.reason);

        if (window.gtag) {
          window.gtag("event", "exception", {
            description: `Unhandled Promise: ${event.reason}`,
            fatal: false,
          });
        }
      });
    };

    // Resource Loading Monitoring
    const monitorResources = () => {
      if ("PerformanceObserver" in window) {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.duration > 1000) {
              // Log slow resources (>1s)
              console.warn("Slow Resource:", {
                name: entry.name,
                duration: entry.duration,
                size: entry.transferSize,
              });
            }
          });
        });

        try {
          resourceObserver.observe({ entryTypes: ["resource"] });
        } catch (e) {
          console.warn("Resource observer not supported");
        }
      }
    };

    // Memory Usage Monitoring (Chrome only)
    const monitorMemory = () => {
      if ("memory" in performance) {
        setInterval(() => {
          const memory = performance.memory;
          console.log("Memory Usage:", {
            used: Math.round(memory.usedJSHeapSize / 1048576) + " MB",
            total: Math.round(memory.totalJSHeapSize / 1048576) + " MB",
            limit: Math.round(memory.jsHeapSizeLimit / 1048576) + " MB",
          });
        }, 30000); // Check every 30 seconds
      }
    };

    // Initialize monitoring only in production
    if (process.env.NODE_ENV === "production") {
      observeWebVitals();
      monitorErrors();
      monitorResources();
      monitorMemory();
    }

    // Cleanup function
    return () => {
      // Cleanup observers if needed
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
