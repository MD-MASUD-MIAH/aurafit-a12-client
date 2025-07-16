const PrivacyPolicy = () => {
  const policySections = [
    {
      id: "information",
      title: "1. Information We Collect",
      content: [
        "A. Personal Information: Name, email, age, gender (for account creation)",
        "B. Health & Activity Data: Step count, heart rate, sleep data (if supported)",
        "C. Device & Usage Data: Device model, OS version, app usage patterns",
      ],
    },
    {
      id: "usage",
      title: "2. How We Use Your Data",
      content: [
        "Provide personalized fitness insights and recommendations",
        "Improve app functionality and user experience",
        "Send notifications (workout reminders, goals achieved)",
      ],
    },
    {
      id: "sharing",
      title: "3. Data Sharing & Third Parties",
      content: [
        "We do not sell your personal data",
        "Data may be shared with cloud service providers for storage",
        "Analytics tools (Google Analytics, Firebase) for app improvement",
      ],
    },
    {
      id: "security",
      title: "4. Data Security",
      content: [
        "Encryption for sensitive data (SSL/TLS)",
        "Regular security audits",
        "User authentication to prevent unauthorized access",
      ],
    },
    {
      id: "rights",
      title: "5. User Rights",
      content: [
        "Access, update, or delete your data via app settings",
        "Opt out of non-essential data collection",
        "Export your fitness data (e.g., as CSV/PDF)",
      ],
    },
  ];

  return (
    <div className="w-11/12 mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        AuraFit Privacy Policy
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <p className="text-gray-700 mb-8 leading-relaxed">
        At AuraFit, we are committed to protecting your privacy. This Privacy
        Policy explains how we collect, use, disclose, and safeguard your
        information when you use our fitness tracking app and services.
      </p>

      <div className="space-y-6">
        {policySections.map((section) => (
          <div key={section.id} className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">
              {section.title}
            </h2>
            <ul className="space-y-2 pl-5 text-gray-700">
              {section.content.map((item, index) => (
                <li key={index} className="list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800">Contact Us</h3>
        <p className="text-gray-700 mt-1">
          For questions about this policy: <br />
          <a
            href="mailto:privacy@aurafit.com"
            className="text-blue-600 hover:underline"
          >
            privacy@aurafit.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;