import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, Lightbulb, Shield, Cloud, Gift } from "lucide-react"
import { db } from "@/src/db"
import { talks } from "@/src/db/schema"
import { LucideIcon } from "lucide-react"
import { InferSelectModel } from "drizzle-orm"
import { unstable_cache } from "next/cache"

// Map of icon names to components
const iconMap: Record<string, LucideIcon> = {
  Users,
  Lightbulb,
  Shield,
  Cloud,
  Gift,
}

type Talk = InferSelectModel<typeof talks>

// Cache the talks query for 1 hour
const getTalks = unstable_cache(
  async () => {
    return db.select().from(talks).orderBy(talks.time)
  },
  ["talks"],
  { revalidate: 3600, tags: ["talks"] }
)

export default async function MeetupSchedule() {
  // Fetch talks from the database with caching
  const talksList = await getTalks()

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
          <CardTitle className="text-2xl font-bold text-center">AWS Generative AI Meetup</CardTitle>
          <p className="text-center text-slate-300 mt-1">Schedule</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Time</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Session
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {talksList.map((talk: Talk, index: number) => {
                  const Icon = iconMap[talk.iconName]
                  return (
                    <tr
                      key={talk.id}
                      className={`transition-colors ${
                        talk.isCurrent
                          ? "bg-sky-50 border-l-4 border-sky-500"
                          : index % 2 === 0
                            ? "bg-white hover:bg-slate-50"
                            : "bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{talk.time}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {Icon && <Icon className={`h-5 w-5 ${talk.iconColor}`} />}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900 flex items-center">
                              {talk.title}
                              {talk.isCurrent && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 animate-pulse ml-2">
                                  NOW
                                </span>
                              )}
                            </div>
                            {talk.speaker && <div className="text-sm text-slate-500 mt-1">{talk.speaker}</div>}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

