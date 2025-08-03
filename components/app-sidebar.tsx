"use client"

import type * as React from "react"
import {
  Home,
  Map,
  Search,
  Calendar,
  Wallet,
  Gift,
  MessageCircle,
  Settings,
  MapPin,
  Sparkles,
  Plane,
  Clock,
  Star,
  Hotel,
  UtensilsCrossed,
  Camera,
  Filter,
  Plus,
  Bot,
  TrendingUp,
  AlertTriangle,
  Crown,
  HelpCircle,
  Phone,
  Languages,
  User,
  Globe,
  Shield,
  ChevronRight,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Navigation data structure
const navigationData = {
  main: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
      badge: null,
      description: "Quick trip overview, weather, AI suggestions",
    },
  ],
  planning: [
    {
      title: "My Trips",
      url: "/trips",
      icon: Map,
      badge: "3",
      items: [
        {
          title: "Current Trip",
          url: "/trips/current",
          icon: MapPin,
          description: "Paris, France - 7 days left",
        },
        {
          title: "Upcoming Trips",
          url: "/trips/upcoming",
          icon: Clock,
          badge: "2",
        },
        {
          title: "Past Trips",
          url: "/trips/past",
          icon: Star,
          description: "Reviews & memories",
        },
      ],
    },
    {
      title: "Explore",
      url: "/explore",
      icon: Search,
      items: [
        {
          title: "Hotels",
          url: "/explore/hotels",
          icon: Hotel,
        },
        {
          title: "Restaurants",
          url: "/explore/restaurants",
          icon: UtensilsCrossed,
        },
        {
          title: "Attractions & Hidden Gems",
          url: "/explore/attractions",
          icon: Camera,
        },
        {
          title: "Search & Filters",
          url: "/explore/search",
          icon: Filter,
        },
      ],
    },
    {
      title: "Itinerary",
      url: "/itinerary",
      icon: Calendar,
      items: [
        {
          title: "Day-by-day Plan",
          url: "/itinerary/daily",
          icon: Calendar,
        },
        {
          title: "Add Activities",
          url: "/itinerary/add",
          icon: Plus,
        },
        {
          title: "AI Auto-adjust",
          url: "/itinerary/ai-adjust",
          icon: Bot,
          badge: "New",
        },
      ],
    },
  ],
  financial: [
    {
      title: "Budget Tracker",
      url: "/budget",
      icon: Wallet,
      items: [
        {
          title: "Budget vs Spent",
          url: "/budget/overview",
          icon: TrendingUp,
        },
        {
          title: "Category Expenses",
          url: "/budget/categories",
          icon: Wallet,
        },
        {
          title: "Spending Alerts",
          url: "/budget/alerts",
          icon: AlertTriangle,
          badge: "2",
        },
      ],
    },
    {
      title: "Rewards & Membership",
      url: "/rewards",
      icon: Gift,
      items: [
        {
          title: "Membership Benefits",
          url: "/rewards/membership",
          icon: Crown,
          description: "Gold Tier",
        },
        {
          title: "Points Balance",
          url: "/rewards/points",
          icon: Gift,
          badge: "3,500",
        },
        {
          title: "Available Offers",
          url: "/rewards/offers",
          icon: Sparkles,
          badge: "5",
        },
      ],
    },
  ],
  support: [
    {
      title: "Live Assistance",
      url: "/assistance",
      icon: MessageCircle,
      items: [
        {
          title: "Chat Support",
          url: "/assistance/chat",
          icon: MessageCircle,
          badge: "Online",
        },
        {
          title: "Emergency Numbers",
          url: "/assistance/emergency",
          icon: Phone,
        },
        {
          title: "Translate",
          url: "/assistance/translate",
          icon: Languages,
        },
      ],
    },
  ],
  account: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "Profile & Preferences",
          url: "/settings/profile",
          icon: User,
        },
        {
          title: "Language & Currency",
          url: "/settings/localization",
          icon: Globe,
        },
        {
          title: "Privacy Controls",
          url: "/settings/privacy",
          icon: Shield,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Sufer</h1>
            <p className="text-xs text-gray-500">No suffer with sufer</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Dashboard */}
        <SidebarGroup>
          <SidebarMenu>
            {navigationData.main.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <a href={item.url} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Planning & Discovery */}
        <SidebarGroup>
          <SidebarGroupLabel>Planning & Discovery</SidebarGroupLabel>
          <SidebarMenu>
            {navigationData.planning.map((item) => (
              <Collapsible key={item.title} defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto mr-2">
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url} className="flex items-center gap-3">
                              <subItem.icon className="h-3 w-3" />
                              <span className="flex-1">{subItem.title}</span>
                              {subItem.badge && (
                                <Badge variant={subItem.badge === "New" ? "default" : "secondary"} className="text-xs">
                                  {subItem.badge}
                                </Badge>
                              )}
                            </a>
                          </SidebarMenuSubButton>
                          {subItem.description && (
                            <p className="px-6 text-xs text-gray-500 mt-1">{subItem.description}</p>
                          )}
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Financial */}
        <SidebarGroup>
          <SidebarGroupLabel>Financial</SidebarGroupLabel>
          <SidebarMenu>
            {navigationData.financial.map((item) => (
              <Collapsible key={item.title} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url} className="flex items-center gap-3">
                              <subItem.icon className="h-3 w-3" />
                              <span className="flex-1">{subItem.title}</span>
                              {subItem.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {subItem.badge}
                                </Badge>
                              )}
                            </a>
                          </SidebarMenuSubButton>
                          {subItem.description && (
                            <p className="px-6 text-xs text-gray-500 mt-1">{subItem.description}</p>
                          )}
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Support */}
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarMenu>
            {navigationData.support.map((item) => (
              <Collapsible key={item.title} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url} className="flex items-center gap-3">
                              <subItem.icon className="h-3 w-3" />
                              <span className="flex-1">{subItem.title}</span>
                              {subItem.badge && (
                                <Badge
                                  variant={subItem.badge === "Online" ? "default" : "secondary"}
                                  className="text-xs bg-green-100 text-green-700"
                                >
                                  {subItem.badge}
                                </Badge>
                              )}
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Account */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarMenu>
            {navigationData.account.map((item) => (
              <Collapsible key={item.title} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url} className="flex items-center gap-3">
                              <subItem.icon className="h-3 w-3" />
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/help" className="flex items-center gap-3">
                <HelpCircle className="h-4 w-4" />
                <span>Help & Support</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
