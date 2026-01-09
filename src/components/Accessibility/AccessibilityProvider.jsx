import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider"
    );
  }
  return context;
};

const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
  });

  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    // Load saved accessibility settings
    const savedSettings = localStorage.getItem("accessibility-settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        applySettings(parsed);
      } catch (error) {
        console.error("Failed to parse accessibility settings:", error);
      }
    }

    // Detect system preferences
    detectSystemPreferences();

    // Keyboard navigation detection
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        setIsKeyboardUser(true);
        document.body.classList.add("keyboard-navigation");
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
      document.body.classList.remove("keyboard-navigation");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    // Skip links for keyboard navigation
    addSkipLinks();

    // ARIA live region for announcements
    addLiveRegion();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const detectSystemPreferences = () => {
    // Detect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      updateSetting("reducedMotion", true);
    }

    // Detect prefers-contrast
    if (window.matchMedia("(prefers-contrast: high)").matches) {
      updateSetting("highContrast", true);
    }

    // Detect screen reader
    if (
      navigator.userAgent.includes("NVDA") ||
      navigator.userAgent.includes("JAWS") ||
      navigator.userAgent.includes("VoiceOver")
    ) {
      updateSetting("screenReader", true);
    }
  };

  const addSkipLinks = () => {
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.textContent = "Skip to main content";
    skipLink.className =
      "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded";
    skipLink.style.position = "absolute";
    skipLink.style.top = "-40px";
    skipLink.style.left = "6px";
    skipLink.style.transition = "top 0.3s";

    skipLink.addEventListener("focus", () => {
      skipLink.style.top = "6px";
    });

    skipLink.addEventListener("blur", () => {
      skipLink.style.top = "-40px";
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  };

  const addLiveRegion = () => {
    const liveRegion = document.createElement("div");
    liveRegion.id = "accessibility-announcements";
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    document.body.appendChild(liveRegion);
  };

  const announce = (message) => {
    const liveRegion = document.getElementById("accessibility-announcements");
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = "";
      }, 1000);
    }
  };

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("accessibility-settings", JSON.stringify(newSettings));
    applySettings(newSettings);

    // Announce changes
    announce(
      `${key.replace(/([A-Z])/g, " $1").toLowerCase()} ${
        value ? "enabled" : "disabled"
      }`
    );
  };

  const applySettings = (newSettings) => {
    const root = document.documentElement;

    // High contrast
    if (newSettings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    // Large text
    if (newSettings.largeText) {
      root.classList.add("large-text");
    } else {
      root.classList.remove("large-text");
    }

    // Reduced motion
    if (newSettings.reducedMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }

    // Screen reader optimizations
    if (newSettings.screenReader) {
      root.classList.add("screen-reader");
    } else {
      root.classList.remove("screen-reader");
    }
  };

  const resetSettings = () => {
    const defaultSettings = {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: true,
    };

    setSettings(defaultSettings);
    localStorage.removeItem("accessibility-settings");
    applySettings(defaultSettings);
    toast.success("Accessibility settings reset to default");
    announce("Accessibility settings reset to default");
  };

  const value = {
    settings,
    updateSetting,
    resetSettings,
    isKeyboardUser,
    announce,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityProvider;
