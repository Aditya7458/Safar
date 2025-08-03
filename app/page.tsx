"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Calendar,
  Wallet,
  Hotel,
  UtensilsCrossed,
  MapPinIcon,
  Gift,
  Star,
  Plane,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";

// Define types for the API response
type ApiResponse = {
  budgetTracker: {
    M: {
      spentINR: { N: string };
      remainingINR: { N: string };
      totalBudgetINR: { N: string };
      expenses: {
        L: Array<{
          M: {
            category: { S: string };
            amountINR: { N: string };
          };
        }>;
      };
    };
  };
  UserId: { S: string };
  tripOverview: {
    M: {
      tripType: { S: string };
      totalDays: { N: string };
      weatherForecast: {
        L: Array<{
          M: {
            date: { S: string };
            temperature: { S: string };
            condition: { S: string };
          };
        }>;
      };
      endDate: { S: string };
      destination: { S: string };
      itineraryHighlights: { L: Array<{ S: string }> };
      countdownDays: { N: string };
      startDate: { S: string };
      tripStatus: { S: string };
    };
  };
  TripId: { S: string };
  userProfile: {
    M: {
      name: { S: string };
      country: { S: string };
      membershipTier: { S: string };
      preferences: {
        M: {
          budgetType: { S: string };
          travelStyle: { S: string };
          language: { S: string };
          currency: { S: string };
          foodType: { S: string };
        };
      };
      phone: { S: string };
      email: { S: string };
    };
  };
};

// Define the shape of our transformed data
type DashboardData = {
  userProfile: {
    name: string;
    membershipTier: string;
    email?: string;
    phone?: string;
    country?: string;
    preferences?: {
      travelStyle: string;
      foodType: string;
      budgetType: string;
      language?: string;
      currency?: string;
    };
  };
  tripOverview: {
    destination: string;
    startDate: string;
    endDate: string;
    tripStatus: string;
    countdownDays?: number;
    totalDays?: number;
    tripType?: string;
    itineraryHighlights: string[];
    weatherForecast?: Array<{
      date: string;
      temperature: string;
      condition: string;
    }>;
  };
  budgetTracker: {
    totalBudgetINR: number;
    spentINR: number;
    remainingINR: number;
    expenses?: Array<{
      category: string;
      amountINR: number;
    }>;
  };
  recommendations: {
    hotels: Array<{ name: string; rating: number }>;
    restaurants: Array<{ name: string; cuisine: string }>;
    attractions: Array<{ name: string; type: string }>;
  };
  rewards: {
    availablePoints: number;
    pointsValueINR: number;
    upcomingOffers: string[];
  };
};

// Default data structure to use while loading
const defaultData: DashboardData = {
  userProfile: {
    name: "",
    membershipTier: "",
  },
  tripOverview: {
    destination: "",
    startDate: "",
    endDate: "",
    tripStatus: "",
    itineraryHighlights: [],
  },
  budgetTracker: {
    totalBudgetINR: 0,
    spentINR: 0,
    remainingINR: 0,
  },
  recommendations: {
    hotels: [
      { name: "Hotel Le Meurice", rating: 4.8 },
      { name: "Ibis Paris Tour Eiffel", rating: 4.2 },
    ],
    restaurants: [
      { name: "Krishna Bhavan", cuisine: "Indian Vegetarian" },
      { name: "Saravanaa Bhavan", cuisine: "South Indian" },
    ],
    attractions: [
      { name: "Eiffel Tower", type: "Monument" },
      { name: "Louvre Museum", type: "Museum" },
    ],
  },
  rewards: {
    availablePoints: 3500,
    pointsValueINR: 1750,
    upcomingOffers: [
      "10% off Seine River Cruise",
      "Free airport transfer for Gold members",
    ],
  },
};

// Mock data to use when API is unavailable
const mockApiResponse = {
  budgetTracker: {
    M: {
      spentINR: { N: "75000" },
      remainingINR: { N: "175000" },
      totalBudgetINR: { N: "250000" },
      expenses: {
        L: [
          {
            M: {
              category: { S: "Flights" },
              amountINR: { N: "45000" },
            },
          },
          {
            M: {
              category: { S: "Hotel" },
              amountINR: { N: "20000" },
            },
          },
          {
            M: {
              category: { S: "Food" },
              amountINR: { N: "5000" },
            },
          },
          {
            M: {
              category: { S: "Activities" },
              amountINR: { N: "5000" },
            },
          },
        ],
      },
    },
  },
  UserId: { S: "USR2025IND001" },
  tripOverview: {
    M: {
      tripType: { S: "Leisure" },
      totalDays: { N: "7" },
      weatherForecast: {
        L: [
          {
            M: {
              date: { S: "2025-09-15" },
              temperature: { S: "22°C" },
              condition: { S: "Sunny" },
            },
          },
          {
            M: {
              date: { S: "2025-09-16" },
              temperature: { S: "20°C" },
              condition: { S: "Partly Cloudy" },
            },
          },
          {
            M: {
              date: { S: "2025-09-17" },
              temperature: { S: "18°C" },
              condition: { S: "Light Rain" },
            },
          },
        ],
      },
      endDate: { S: "2025-09-22" },
      destination: { S: "Paris, France" },
      itineraryHighlights: {
        L: [
          { S: "Eiffel Tower night visit" },
          { S: "Seine River Cruise" },
          { S: "Day trip to Versailles Palace" },
          { S: "Louvre Museum guided tour" },
        ],
      },
      countdownDays: { N: "43" },
      startDate: { S: "2025-09-15" },
      tripStatus: { S: "Upcoming" },
    },
  },
  TripId: { S: "TRIP2025PARIS001" },
  userProfile: {
    M: {
      name: { S: "Aditya Rajput" },
      country: { S: "India" },
      membershipTier: { S: "Gold" },
      preferences: {
        M: {
          budgetType: { S: "Mid-range" },
          travelStyle: { S: "Cultural Explorer" },
          language: { S: "English" },
          currency: { S: "INR" },
          foodType: { S: "Vegetarian" },
        },
      },
      phone: { S: "+91-9876543210" },
      email: { S: "aditya.rajput@example.com" },
    },
  },
};

// Add this client-only component wrapper
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Return null on server-side and first render
  }

  return <>{children}</>;
}

// Date formatter that's safe for hydration
const formatDate = (dateString: string) => {
  try {
    // Use a simple date format that's consistent across server and client
    const date = new Date(dateString);
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][date.getMonth()];
    const day = date.getDate();

    return `${month} ${day}`;
  } catch (e) {
    return dateString; // Fallback to the original string if parsing fails
  }
};

export default function TravelDashboard() {
  const [budgetProgress, setBudgetProgress] = useState(0);
  const [data, setData] = useState<DashboardData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsRefreshing(true);

      let apiData: ApiResponse[];

      try {
        // Try fetching from the API first
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(
          "https://2cdg85h8sa.execute-api.ap-southeast-2.amazonaws.com/dashboard",
          {
            signal: controller.signal,
            cache: "no-store",
            headers: {
              Accept: "application/json",
            },
          }
        ).finally(() => clearTimeout(timeoutId));

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        apiData = await response.json();

        if (apiData.length === 0) {
          throw new Error("No data returned from API");
        }

        console.log("Successfully fetched data from API");
      } catch (fetchError) {
        // If API fetch fails, use mock data
        console.warn("API fetch failed, using mock data:", fetchError);

        // Use mock data as fallback
        apiData = [mockApiResponse as unknown as ApiResponse];
      }

      // Transform the API data to our format
      const transformedData = transformApiData(apiData[0]);
      setData({
        ...defaultData, // Keep recommendations and rewards from default data
        ...transformedData,
      });
      setError(null);
    } catch (err) {
      console.error("Error processing data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Use a separate useEffect for client-side only code to avoid hydration mismatches
  useEffect(() => {
    // This will only run on the client, after hydration
    fetchData();

    // Optional: Add a retry mechanism for better reliability
    const retryTimeout = setTimeout(() => {
      if (error) {
        console.log("Retrying fetch after error...");
        fetchData();
      }
    }, 5000); // Retry after 5 seconds if there was an error

    return () => clearTimeout(retryTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Only calculate progress when we have valid budget data
    if (data.budgetTracker.totalBudgetINR > 0) {
      const progress =
        (data.budgetTracker.spentINR / data.budgetTracker.totalBudgetINR) * 100;
      setBudgetProgress(progress);
    }
  }, [data.budgetTracker]);

  // Transform the API response to match our data structure
  const transformApiData = (apiItem: ApiResponse): Partial<DashboardData> => {
    return {
      userProfile: {
        name: apiItem.userProfile.M.name.S,
        membershipTier: apiItem.userProfile.M.membershipTier.S,
        email: apiItem.userProfile.M.email.S,
        phone: apiItem.userProfile.M.phone.S,
        country: apiItem.userProfile.M.country.S,
        preferences: {
          travelStyle: apiItem.userProfile.M.preferences.M.travelStyle.S,
          foodType: apiItem.userProfile.M.preferences.M.foodType.S,
          budgetType: apiItem.userProfile.M.preferences.M.budgetType.S,
          language: apiItem.userProfile.M.preferences.M.language.S,
          currency: apiItem.userProfile.M.preferences.M.currency.S,
        },
      },
      tripOverview: {
        destination: apiItem.tripOverview.M.destination.S,
        startDate: apiItem.tripOverview.M.startDate.S,
        endDate: apiItem.tripOverview.M.endDate.S,
        tripStatus: apiItem.tripOverview.M.tripStatus.S,
        countdownDays: Number(apiItem.tripOverview.M.countdownDays.N),
        totalDays: Number(apiItem.tripOverview.M.totalDays.N),
        tripType: apiItem.tripOverview.M.tripType.S,
        itineraryHighlights: apiItem.tripOverview.M.itineraryHighlights.L.map(
          (item) => item.S
        ),
        weatherForecast: apiItem.tripOverview.M.weatherForecast.L.map(
          (item) => ({
            date: item.M.date.S,
            temperature: item.M.temperature.S,
            condition: item.M.condition.S,
          })
        ),
      },
      budgetTracker: {
        totalBudgetINR: Number(apiItem.budgetTracker.M.totalBudgetINR.N),
        spentINR: Number(apiItem.budgetTracker.M.spentINR.N),
        remainingINR: Number(apiItem.budgetTracker.M.remainingINR.N),
        expenses: apiItem.budgetTracker.M.expenses.L.map((item) => ({
          category: item.M.category.S,
          amountINR: Number(item.M.amountINR.N),
        })),
      },
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Modify the WeatherForecast component to use ClientOnly
  const WeatherForecast = () => {
    if (!data.tripOverview.weatherForecast) return null;

    return (
      <div className="mt-4 border-t pt-4">
        <h4 className="font-semibold mb-3 text-gray-800">Weather Forecast</h4>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {data.tripOverview.weatherForecast.map((day, index) => (
            <div
              key={index}
              className="flex-shrink-0 p-3 bg-blue-50 rounded-lg text-center min-w-[120px]"
            >
              <p className="text-sm text-gray-600">
                <ClientOnly>{formatDate(day.date)}</ClientOnly>
              </p>
              <p className="font-medium my-1">{day.temperature}</p>
              <p className="text-sm">{day.condition}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading && !isRefreshing) {
    return (
      <SidebarInset>
        <DashboardHeader title="Dashboard" />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">
              Loading your travel dashboard...
            </p>
          </div>
        </div>
      </SidebarInset>
    );
  }

  if (error) {
    return (
      <SidebarInset>
        <DashboardHeader title="Dashboard" />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl text-red-600 mb-2">
              Error Loading Dashboard
            </h2>
            <p className="text-gray-700">{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={fetchData}
              disabled={isRefreshing}
            >
              {isRefreshing ? "Trying Again..." : "Try Again"}
            </button>
          </div>
        </div>
      </SidebarInset>
    );
  }

  // Wrap the entire return with an error boundary
  return (
    <SidebarInset>
      <DashboardHeader
        title="Dashboard"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Trip Overview */}
          <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                Trip Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="font-semibold text-lg">
                        {data.tripOverview.destination}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Travel Dates</p>
                      <p className="font-semibold">
                        {data.tripOverview.startDate} to{" "}
                        {data.tripOverview.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Plane className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge
                        variant="outline"
                        className="border-green-200 text-green-700 bg-green-50"
                      >
                        {data.tripOverview.tripStatus}
                      </Badge>
                      {data.tripOverview.countdownDays !== undefined && (
                        <span className="ml-2 text-sm text-gray-600">
                          {data.tripOverview.countdownDays} days to go
                        </span>
                      )}
                    </div>
                  </div>
                  {data.tripOverview.tripType && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Trip Type</p>
                        <p className="font-semibold">
                          {data.tripOverview.tripType}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-gray-800">
                    Itinerary Highlights
                  </h4>
                  <ul className="space-y-2">
                    {data.tripOverview.itineraryHighlights.map(
                      (item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      )
                    )}
                  </ul>

                  <WeatherForecast />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Tracker */}
          <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl text-gray-800">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Wallet className="h-6 w-6 text-green-600" />
                </div>
                Budget Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Total Budget</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(data.budgetTracker.totalBudgetINR)}
                  </p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Spent</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(data.budgetTracker.spentINR)}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Remaining</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(data.budgetTracker.remainingINR)}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget Usage</span>
                  <span>{budgetProgress.toFixed(1)}%</span>
                </div>
                <Progress value={budgetProgress} className="h-3" />
              </div>

              {/* Expense Breakdown */}
              {data.budgetTracker.expenses &&
                data.budgetTracker.expenses.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3 text-gray-800">
                      Expense Breakdown
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {data.budgetTracker.expenses.map((expense, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 rounded-lg text-center"
                        >
                          <p className="text-sm text-gray-600">
                            {expense.category}
                          </p>
                          <p className="font-medium text-gray-800">
                            {formatCurrency(expense.amountINR)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* User Preferences (new section) */}
          {data.userProfile.preferences && (
            <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-800">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  Your Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-500">Travel Style</p>
                    <p className="font-medium text-purple-800">
                      {data.userProfile.preferences.travelStyle}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-500">Food Preference</p>
                    <p className="font-medium text-blue-800">
                      {data.userProfile.preferences.foodType}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-500">Budget Type</p>
                    <p className="font-medium text-green-800">
                      {data.userProfile.preferences.budgetType}
                    </p>
                  </div>
                </div>

                {/* User contact information */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 text-gray-800">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">
                        {data.userProfile.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800">
                        {data.userProfile.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium text-gray-800">
                        {data.userProfile.country}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Hotels */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg text-gray-800">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Hotel className="h-5 w-5 text-purple-600" />
                  </div>
                  Hotels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.recommendations.hotels.map((hotel, index) => (
                    <li key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-800">
                        {hotel.name}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">
                          {hotel.rating}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Restaurants */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg text-gray-800">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <UtensilsCrossed className="h-5 w-5 text-orange-600" />
                  </div>
                  Restaurants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.recommendations.restaurants.map((restaurant, index) => (
                    <li key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-800">
                        {restaurant.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {restaurant.cuisine}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Attractions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg text-gray-800">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <MapPinIcon className="h-5 w-5 text-teal-600" />
                  </div>
                  Attractions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.recommendations.attractions.map((attraction, index) => (
                    <li key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-800">
                        {attraction.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {attraction.type}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Rewards */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl text-gray-800">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Gift className="h-6 w-6 text-yellow-600" />
                </div>
                Rewards & Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-gray-600 mb-1">
                      Available Points
                    </p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {data.rewards.availablePoints.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Worth {formatCurrency(data.rewards.pointsValueINR)}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-gray-800">
                    Upcoming Offers
                  </h4>
                  <ul className="space-y-2">
                    {data.rewards.upcomingOffers.map((offer, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
                      >
                        <Gift className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{offer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
