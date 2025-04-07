import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, Lightbulb, Shield, Cloud, Gift } from "lucide-react"

export default function MeetupSchedule() {
  const talks = [
    {
      time: "17:00 - 17:30",
      title: "Kapunyitás",
      speaker: "",
      icon: <Users className="h-5 w-5 text-gray-500" />,
    },
    {
      time: "17:30 - 18:00",
      title: "Keynote: Mastering Prompt Engineering for Smarter Interactions",
      speaker: "Kacper Dąbrowski, AWS",
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
    },
    {
      time: "18:00 - 18:40",
      title: "GenAI security",
      speaker: "Czirok László, TC2",
      icon: <Shield className="h-5 w-5 text-emerald-500" />,
    },
    {
      time: "18:40 - 19:10",
      title: "AWS Amplify vs Vercel vs Cloudflare Pages / Workers",
      speaker: "Varga György, Shiwaforce",
      icon: <Cloud className="h-5 w-5 text-sky-500" />,
      current: true,
    },
    {
      time: "19:10",
      title: "Generative AI kvíz, nyereményekkel",
      speaker: "",
      icon: <Gift className="h-5 w-5 text-purple-500" />,
    },
  ]

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
                {talks.map((talk, index) => (
                  <tr
                    key={index}
                    className={`transition-colors ${
                      talk.current
                        ? "bg-sky-50 border-l-4 border-sky-500"
                        : index % 2 === 0
                          ? "bg-white hover:bg-slate-50"
                          : "bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{talk.time}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">{talk.icon}</div>
                        <div>
                          <div className="text-sm font-medium text-slate-900 flex items-center">
                            {talk.title}
                            {talk.current && (
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

