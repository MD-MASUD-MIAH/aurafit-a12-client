const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using AuraFit, you agree to be bound by these Terms of Service and our Privacy Policy.",
        "If you do not agree with any part of these terms, you may not use our services.",
      ],
    },
    {
      title: "2. Service Description",
      content: [
        "AuraFit provides fitness tracking services including activity monitoring, health metrics, and personalized recommendations.",
        "We may modify or discontinue features at any time without prior notice.",
      ],
    },
    {
      title: "3. User Responsibilities",
      content: [
        "You must be at least 13 years old to use AuraFit.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to provide accurate health information and understand that AuraFit is not a medical device.",
      ],
    },
    {
      title: "4. Prohibited Conduct",
      content: [
        "You may not use AuraFit to:",
        "- Violate any laws or regulations",
        "- Harm, threaten, or harass others",
        "- Reverse engineer or attempt to extract source code",
        "- Distribute false or misleading health information",
      ],
    },
    {
      title: "5. Intellectual Property",
      content: [
        "All content, features, and functionality are owned by AuraFit and protected by intellectual property laws.",
        "You may not use our trademarks or branding without express written permission.",
      ],
    },
    {
      title: "6. Limitation of Liability",
      content: [
        "AuraFit is not liable for:",
        "- Any injuries resulting from your exercise routine",
        "- Inaccuracies in health data or recommendations",
        "- Interruptions or discontinuation of service",
        "Our total liability is limited to the amount you paid for the service.",
      ],
    },
    {
      title: "7. Modifications to Terms",
      content: [
        "We may update these terms periodically. Continued use after changes constitutes acceptance.",
        "We will notify users of significant changes through the app or email.",
      ],
    },
  ];

  return (
    <div className="w-11/12 mx-auto md:p-6 min-h-screen">
      <div className="bg-white rounded-2xl  overflow-hidden">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">AuraFit Terms of Service</h1>
              <p className="text-blue-100">
                Effective: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Please read these Terms carefully before using AuraFit. These
              Terms govern your access to and use of our fitness tracking
              services.
            </p>

            <div className="space-y-10">
              {sections.map((section, index) => (
                <div key={index} className="group">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                      <span className="text-blue-600 font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">
                        {section.title}
                      </h2>
                      <ul className="space-y-3 text-gray-700">
                        {section.content.map((item, i) => (
                          <li
                            key={i}
                            className={`relative pl-5 ${
                              item.startsWith("-")
                                ? "before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-400"
                                : "before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-600"
                            }`}
                          >
                            {item.startsWith("-") ? item.substring(1) : item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
