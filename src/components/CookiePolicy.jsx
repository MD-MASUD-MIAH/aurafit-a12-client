const CookiePolicy = () => {
  const sections = [
    {
      title: "What Are Cookies?",
      icon: "🔍",
      content:
        "Small text files stored on your device that help remember preferences and improve experience.",
    },
    {
      title: "Our Cookie Usage",
      icon: "🛠️",
      content: [
        { type: "essential", text: "Authentication and security" },
        { type: "preferences", text: "Remembering your settings" },
        { type: "analytics", text: "Understanding how you use AuraFit" },
        {
          type: "marketing",
          text: "Personalized recommendations (if enabled)",
        },
      ],
    },
    {
      title: "Cookie Control",
      icon: "⚙️",
      content:
        "Manage cookies via device settings or our Privacy Dashboard below.",
    },
  ];

  return (
    <div className="w-11/12 mx-auto md:p-4 sm:p-6 min-h-screen mt-10 md:mt-0">
      {/* Modern header with cookie icon */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM12 9v6m-3-3h6"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AuraFit Cookie Policy
        </h1>
        <p className="text-blue-600">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Card-style content sections */}
      <div className="space-y-6 mb-12">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden"
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <span className="text-2xl hidden sm:block">{section.icon}</span>
                <div className="w-full">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                    {section.title}
                  </h2>

                  {Array.isArray(section.content) ? (
                    <div className="space-y-3 sm:space-y-4">
                      {section.content.map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3"
                        >
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.type === "essential"
                                ? "bg-red-100 text-red-800"
                                : item.type === "preferences"
                                ? "bg-blue-100 text-blue-800"
                                : item.type === "analytics"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.type}
                          </span>
                          <p className="text-sm sm:text-base text-gray-600 flex-1">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-600">
                      {section.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cookie management dashboard */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Your Cookie Preferences
        </h3>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Essential Cookies</h4>
              <p className="text-sm text-gray-500">
                Required for app functionality
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1  rounded-full text-[8px] md:text-sm font-medium bg-gray-100 text-gray-800">
              Always Active
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Performance Cookies</h4>
              <p className="text-sm text-gray-500">Help us improve the app</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Personalization Cookies
              </h4>
              <p className="text-sm text-gray-500">
                For customized recommendations
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Legal footer */}
    </div>
  );
};

export default CookiePolicy;
