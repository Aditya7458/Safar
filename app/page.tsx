"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar, Wallet, Hotel, UtensilsCrossed, MapPinIcon, Gift, Star, Plane } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarInset } from "@/components/ui/sidebar"

// Dummy Data
const data = {
  userProfile: {
    name: "Aditya Rajput",
    membershipTier: "Gold",
  },
  tripOverview: {
    destination: "Paris, France",
    startDate: "2025-09-15",
    endDate: "2025-09-22",
    tripStatus: "Upcoming",
    itineraryHighlights: [
      "Eiffel Tower night visit",
      "Seine River Cruise",
      "Day trip to Versailles Palace",
      "Louvre Museum guided tour",
    ],
  },
  budgetTracker: {
    totalBudgetINR: 250000,
    spentINR: 75000,
    remainingINR: 175000,
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
    upcomingOffers: ["10% off Seine River Cruise", "Free airport transfer for Gold members"],
  },
}

export default function TravelDashboard() {
  const [budgetProgress, setBudgetProgress] = useState(0)

  useEffect(() => {
    const progress = (data.budgetTracker.spentINR / data.budgetTracker.totalBudgetINR) * 100
    setBudgetProgress(progress)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <SidebarInset>
      <DashboardHeader title="Dashboard" />
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
                      <p className="font-semibold text-lg">{data.tripOverview.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Travel Dates</p>
                      <p className="font-semibold">
                        {data.tripOverview.startDate} to {data.tripOverview.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Plane className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                        {data.tripOverview.tripStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-gray-800">Itinerary Highlights</h4>
                  <ul className="space-y-2">
                    {data.tripOverview.itineraryHighlights.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
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
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(data.budgetTracker.spentINR)}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Remaining</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(data.budgetTracker.remainingINR)}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget Usage</span>
                  <span>{budgetProgress.toFixed(1)}%</span>
                </div>
                <Progress value={budgetProgress} className="h-3" />
              </div>
            </CardContent>
          </Card>

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
                      <div className="font-medium text-gray-800">{hotel.name}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{hotel.rating}</span>
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
                      <div className="font-medium text-gray-800">{restaurant.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{restaurant.cuisine}</div>
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
                      <div className="font-medium text-gray-800">{attraction.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{attraction.type}</div>
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
                    <p className="text-sm text-gray-600 mb-1">Available Points</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {data.rewards.availablePoints.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Worth {formatCurrency(data.rewards.pointsValueINR)}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-gray-800">Upcoming Offers</h4>
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
  )
}
