'use client'

import React, { useEffect, useState, MouseEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { FooterSection } from '@/components/footer-section'
import {
  ChevronRight,
  ChevronLeft,
  Settings,
  Video,
  List,
  MonitorPlay,
  Heart,
  ChevronDown,
  X,
} from 'lucide-react'

// --- TYPES ---
type ChartItem = {
  day: number
  val: string
}

type CreatorClip = {
  id: string | number
  name: string
  description?: string
  cats?: string
  run_time_format?: string
  image_landscape?: string
  image?: string
}

type CreatorInfo = {
  top_items?: CreatorClip[]
  views?: string | number
  watch?: string | number
  watched?: string | number
  favorit?: string | number
}

type CreatorData = {
  name?: string
  avatar_url?: string
  info?: CreatorInfo
}

type HistoryItem = {
  id: string
  type: string
  dates: string
  txhash: string
  network_url: string
  id_customer: string | null
  reason: string
  total: string
  status: string
  description: string
}

// --- CONSTANTS ---
const monthsList = [
  { name: 'January', value: '1' },
  { name: 'February', value: '2' },
  { name: 'March', value: '3' },
  { name: 'April', value: '4' },
  { name: 'May', value: '5' },
  { name: 'June', value: '6' },
  { name: 'July', value: '7' },
  { name: 'August', value: '8' },
  { name: 'September', value: '9' },
  { name: 'October', value: '10' },
  { name: 'November', value: '11' },
  { name: 'December', value: '12' },
]

// --- UTILS ---
function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function findCreatorPayload(input: any): CreatorData | null {
  if (!input) return null

  if (Array.isArray(input)) {
    for (const item of input) {
      const found = findCreatorPayload(item)
      if (found) return found
    }
    return null
  }

  if (isObject(input)) {
    const hasCreatorKeys =
      'name' in input || 'avatar_url' in input || 'info' in input

    if (hasCreatorKeys) {
      return input as CreatorData
    }

    for (const key of Object.keys(input)) {
      const found = findCreatorPayload(input[key])
      if (found) return found
    }
  }

  return null
}

function getTotal(value: any): string {
  if (value === null || value === undefined) return '0'
  return String(value)
}

export default function CreatorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string)

  // -- STATES: Creator & Chart --
  const [creatorData, setCreatorData] = useState<CreatorData | null>(null)
  const [loading, setLoading] = useState(true)

  const [chartData, setChartData] = useState<ChartItem[]>([])
  const [isChartLoading, setIsChartLoading] = useState(false)

  const currentDate = new Date()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(
    String(currentDate.getMonth() + 1)
  )
  const [selectedYear, setSelectedYear] = useState(
    String(currentDate.getFullYear())
  )

  // -- STATES: History Table --
  const [historyList, setHistoryList] = useState<HistoryItem[]>([])
  const [paginationHtml, setPaginationHtml] = useState<string>('')
  const [isHistoryLoading, setIsHistoryLoading] = useState(false)
  const [historyPage, setHistoryPage] = useState<number>(1)

  // --- API FETCHERS ---
  const fetchChartData = async (year: string, month: string) => {
    try {
      setIsChartLoading(true)
      const token = localStorage.getItem('user_token')

      if (!token || !id) {
        setChartData([])
        return
      }

      const response = await fetch('/api/creator-chart', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_creator: id,
          tahun: year,
          bulan: month,
        }),
      })

      const result = await response.json()
      if (result?.status === true && Array.isArray(result?.data)) {
        setChartData(result.data)
      } else {
        setChartData([])
      }
    } catch (error) {
      console.error('Error fetching chart data:', error)
      setChartData([])
    } finally {
      setIsChartLoading(false)
    }
  }

  const fetchHistoryData = async (page: number) => {
    try {
      setIsHistoryLoading(true)
      const token = localStorage.getItem('user_token')
      if (!token || !id) return

      // Memanggil endpoint history dengan parameter id dan page
      const response = await fetch(
        `https://api.usky.ai/creator/history?id=${id}&per_page=${page}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const result = await response.json()

      if (result?.list) {
        setHistoryList(result.list)
        setPaginationHtml(result.pagination || '')
      } else {
        setHistoryList([])
        setPaginationHtml('')
      }
    } catch (error) {
      console.error('Error fetching history:', error)
      setHistoryList([])
      setPaginationHtml('')
    } finally {
      setIsHistoryLoading(false)
    }
  }

  // --- USE EFFECTS ---
  useEffect(() => {
    const fetchCreatorDetail = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('user_token')

        if (!token) {
          router.push('/')
          return
        }

        if (!id) {
          setCreatorData(null)
          return
        }

        const response = await fetch('/api/creator-detail', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        })

        const result = await response.json()
        const creator = findCreatorPayload(result)

        if (creator) {
          setCreatorData(creator)
        } else {
          setCreatorData(null)
        }
      } catch (error) {
        console.error('Error fetching creator details:', error)
        setCreatorData(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCreatorDetail()
      fetchChartData(selectedYear, selectedMonth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // Trigger fetch history saat page berubah
  useEffect(() => {
    if (id) {
      fetchHistoryData(historyPage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, historyPage])

  // --- HANDLERS ---
  const handleApplyFilter = () => {
    fetchChartData(selectedYear, selectedMonth)
    setIsFilterOpen(false)
  }

  // Mencegah reload halaman saat menekan tombol navigasi paginasi (dari CodeIgniter string)
  const handlePaginationClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const anchor = target.closest('a')
    if (anchor) {
      e.preventDefault()
      const pageStr = anchor.getAttribute('data-ci-pagination-page')
      if (pageStr) {
        setHistoryPage(Number(pageStr))
      }
    }
  }

  // --- RENDER CHECKS ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!creatorData) {
    return (
      <div className="min-h-screen bg-[#020817] text-white flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Creator Not Found</h2>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          Go Back
        </button>
      </div>
    )
  }

  const info = creatorData.info || {}
  const topItems = info.top_items || []

  const totalViewVideo = getTotal(info.views)
  const totalWatchlist = getTotal(info.watch)
  const totalWatching = getTotal(info.watched)
  const totalFavorit = getTotal(info.favorit)

  const maxView =
    chartData.length > 0
      ? Math.max(...chartData.map((d) => Number(d.val) || 0), 1)
      : 1

  return (
    <div className="min-h-screen bg-[#020817] text-white font-sans">
      <SiteHeader />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <button
            onClick={() => router.back()}
            className="w-6 h-6 bg-[#0f172a] rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-3 h-3 text-white" />
          </button>
          <button onClick={() => router.push('/')} className="hover:text-white">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <button
            onClick={() => router.push('/creator')}
            className="hover:text-white"
          >
            Creators
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">Creator Details</span>
        </div>

        {/* Header Profile */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">{creatorData.name || '-'}</h1>
            <p className="text-sm text-gray-400">{topItems.length} Movies</p>
          </div>

          <div className="w-12 h-12 rounded-full bg-[#0f172a] border-2 border-gray-800 overflow-hidden flex items-center justify-center">
            {creatorData.avatar_url &&
            creatorData.avatar_url !== 'http://usky.ai/uploads/' ? (
              <img
                src={creatorData.avatar_url}
                alt={creatorData.name || 'Creator'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-white/30 grid grid-cols-3 gap-0.5 p-0.5">
                <div className="bg-white/60 col-span-3" />
                <div className="bg-white/60 row-span-2" />
                <div className="bg-white/60" />
                <div className="bg-white/60 row-span-2" />
                <div className="bg-white/60 col-span-3" />
              </div>
            )}
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-[#0b1221] rounded-xl p-6 border border-gray-800 mb-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Daily View Video</h3>
              <p className="text-xs text-gray-500">
                {selectedMonth}/{selectedYear}
              </p>
            </div>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <div className="relative w-full h-48">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              <div className="border-b border-dashed border-gray-800 w-full h-0" />
              <div className="border-b border-dashed border-gray-800 w-full h-0" />
              <div className="border-b border-dashed border-gray-800 w-full h-0" />
              <div className="border-b border-dashed border-gray-800 w-full h-0" />
            </div>

            <div
              className={`relative h-full flex items-end justify-between gap-1 md:gap-2 z-10 transition-opacity duration-300 ${
                isChartLoading ? 'opacity-30' : 'opacity-100'
              }`}
            >
              {chartData.length > 0 ? (
                chartData.map((item, idx) => {
                  const val = Number(item.val) || 0
                  const heightPercent = (val / maxView) * 100

                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-2 group flex-1 h-full justify-end relative"
                    >
                      <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-black text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-20 pointer-events-none shadow-lg transform translate-y-1">
                        {val} Views
                      </div>

                      <div
                        className="w-full max-w-[12px] md:max-w-[18px] bg-[#2563eb] rounded-t-[4px] hover:bg-[#3b82f6] transition-colors relative shadow-[0_0_10px_rgba(37,99,235,0.2)]"
                        style={{ height: `${Math.max(heightPercent, 2)}%` }}
                      />

                      <div className="h-4 flex items-center justify-center w-full">
                        <span
                          className={`text-[9px] text-gray-500 ${
                            idx % 5 !== 0 && idx !== 0 && idx !== chartData.length - 1
                              ? 'hidden md:block'
                              : 'block'
                          }`}
                        >
                          {item.day}
                        </span>
                      </div>
                    </div>
                  )
                })
              ) : (
                !isChartLoading && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                    No chart data available for this period.
                  </div>
                )
              )}

              {isChartLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-30">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter Modal */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#0b1221] border border-gray-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
                <h3 className="text-lg font-semibold">Filter Statistics</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-medium">Month</label>
                  <div className="relative">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      {monthsList.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-medium">Year</label>
                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      {['2023', '2024', '2025', '2026'].map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={handleApplyFilter}
                  disabled={isChartLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                >
                  {isChartLoading ? 'Loading...' : 'Apply Filter'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          {[
            {
              label: 'Total View Video',
              val: totalViewVideo,
              icon: <Video className="w-4 h-4 md:w-5 md:h-5" />,
            },
            {
              label: 'Total Watchlist',
              val: totalWatchlist,
              icon: <List className="w-4 h-4 md:w-5 md:h-5" />,
            },
            {
              label: 'Total Watching',
              val: totalWatching,
              icon: <MonitorPlay className="w-4 h-4 md:w-5 md:h-5" />,
            },
            {
              label: 'Total Favorit',
              val: totalFavorit,
              icon: <Heart className="w-4 h-4 md:w-5 md:h-5" />,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0b1221] p-4 md:p-5 rounded-xl border border-gray-800 flex flex-col justify-between h-28 md:h-32 relative overflow-hidden group hover:border-blue-900/50 transition-colors"
            >
              <div>
                <p className="text-[10px] md:text-xs text-gray-400 mb-1 truncate">
                  {stat.label}
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {stat.val}
                </h2>
              </div>
              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 text-gray-600 group-hover:text-blue-400 transition-colors">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* --- DYNAMIC HISTORY TABLE --- */}
        <div className="bg-[#0b1221] rounded-xl border border-gray-800 mb-10 overflow-hidden relative">
          
          {/* Loading Overlay */}
          {isHistoryLoading && (
            <div className="absolute inset-0 bg-[#0b1221]/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-800 bg-[#0f172a]/50">
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium text-right">Txhash</th>
                </tr>
              </thead>
              <tbody>
                {historyList.length > 0 ? (
                  historyList.map((row, idx) => (
                    <tr
                      key={row.id || idx}
                      className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-white">{row.total}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            row.status?.toUpperCase() === 'IN'
                              ? 'text-green-400 bg-green-400/10'
                              : 'text-red-400 bg-red-400/10'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">{row.dates}</td>
                      <td 
                        className="px-6 py-4 text-gray-300 text-xs max-w-xs truncate [&>a]:text-blue-400 hover:[&>a]:underline"
                        dangerouslySetInnerHTML={{ __html: row.description }}
                      />
                      <td 
                        className="px-6 py-4 text-gray-500 text-xs text-right font-mono [&>a]:text-blue-500 hover:[&>a]:underline [&>div]:inline-block"
                        dangerouslySetInnerHTML={{ __html: row.txhash }}
                      />
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">
                      {!isHistoryLoading ? 'No transaction history found.' : 'Loading...'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* HTML Pagination Footer */}
          <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs border-t border-gray-800 bg-[#0f172a]/30">
            <span className="text-gray-500">
              Showing {historyList.length} row(s) (Page {historyPage})
            </span>
            
            {/* Render Pagination HTML string provided by API */}
            {paginationHtml && (
              <div 
                className="flex items-center gap-1 [&>a]:flex [&>a]:items-center [&>a]:justify-center [&>a]:min-w-[28px] [&>a]:h-7 [&>a]:px-2 [&>a]:rounded [&>a]:border [&>a]:border-gray-700 [&>a]:bg-[#0f172a] [&>a]:text-gray-400 hover:[&>a]:text-white hover:[&>a]:border-gray-500 [&>a]:transition-colors [&>strong]:flex [&>strong]:items-center [&>strong]:justify-center [&>strong]:min-w-[28px] [&>strong]:h-7 [&>strong]:px-2 [&>strong]:rounded [&>strong]:bg-blue-600 [&>strong]:text-white"
                onClick={handlePaginationClick}
                dangerouslySetInnerHTML={{ __html: paginationHtml }}
              />
            )}
          </div>
        </div>

        {/* List Clips */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">List Clips</h2>
            <div className="flex gap-1">
              <span className="w-8 h-0.5 bg-gray-600 rounded-full" />
              <span className="w-4 h-0.5 bg-gray-800 rounded-full" />
              <span className="w-4 h-0.5 bg-gray-800 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {topItems.length > 0 ? (
              topItems.map((clip) => {
                const imageSrc =
                  clip.image_landscape || clip.image
                    ? `http://usky.ai/uploads/${clip.image_landscape || clip.image}`
                    : '/images/poster-placeholder.jpg'

                return (
                  <div
                    key={clip.id}
                    className="group relative bg-[#0b1221] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all cursor-pointer"
                  >
                    <div className="h-48 md:h-64 w-full bg-gray-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 z-10" />

                      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1 md:border-t-[8px] md:border-l-[12px] md:border-b-[8px]" />
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-20">
                        <h3 className="font-bold text-white text-sm md:text-lg mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">
                          {clip.name}
                        </h3>
                        <p className="hidden md:block text-[10px] text-gray-300 leading-relaxed line-clamp-2 mb-3">
                          {clip.description
                            ? clip.description.replace(/<[^>]*>?/gm, '')
                            : 'No description available for this clip.'}
                        </p>
                        <div className="flex justify-between items-end text-[10px] md:text-xs text-gray-400 font-medium border-t border-gray-700/50 pt-2">
                          <span>{clip.cats || 'General'}</span>
                          <span>{clip.run_time_format || '00:00'}</span>
                        </div>
                      </div>

                      <img
                        src={imageSrc}
                        alt={clip.name}
                        onError={(e) => {
                          e.currentTarget.src = '/images/poster-placeholder.jpg'
                        }}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-gray-500 text-sm col-span-2 lg:col-span-4">
                No clips available for this creator.
              </p>
            )}
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  )
}