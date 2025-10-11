const API_BASE_URL =
  "http://localhost/custom-sites/novotion-backend/service/";

// Get all services
export async function getServices() {
  try {
    console.log(
      "Fetching services from:",
      `${API_BASE_URL}/service_api.php?action=read`
    );

    const response = await fetch(
      `${API_BASE_URL}/service_api.php?action=read`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors", // Important for CORS
        credentials: "omit",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("API Call failed:", error);
    // Return fallback data for development
    return getFallbackServices();
  }
}

// Fallback services
function getFallbackServices() {
  return [
    {
      id: 1,
      title: "Customer Support",
      description:
        "24/7 multilingual support to boost customer satisfaction and build lasting relationships.",
      image:
        "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=2940&auto=format&fit=crop",
      icon: "💬",
      features: [
        "24/7 Availability",
        "Multilingual Support",
        "CRM Integration",
      ],
    },
    // ... more fallback services
  ];
}
