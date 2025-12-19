"use client"

import {CheckCircle,XCircle,Clock,ExternalLink,Loader} from "lucide-react"
import {motion} from "framer-motion"
import {useState,useEffect} from "react"

const Row=({ok,label,loading,responseTime}:{ok:boolean,label:string,loading:boolean,responseTime?:number})=>(
  <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3">
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm">{label}</span>
      {!loading && responseTime !== undefined && (
        <span className="text-xs text-zinc-400">{responseTime}ms</span>
      )}
    </div>
    {loading
      ?<Loader className="w-4 h-4 text-zinc-400 animate-spin"/>
      :ok
      ?<CheckCircle className="w-4 h-4 text-emerald-500"/>
      :<XCircle className="w-4 h-4 text-red-500"/>}
  </div>
)

interface ServiceStatus{
  ok:boolean
  responseTime:number
}

interface Services{
  bliss_surf_website:ServiceStatus
  bliss_surf_discord:ServiceStatus
  zuzu_rest_website:ServiceStatus
  yuu_pm_host:ServiceStatus
}

export default function Page(){
  const [loading,setLoading]=useState(true)
  const [services,setServices]=useState<Services>({
    bliss_surf_website:{ok:false,responseTime:0},
    bliss_surf_discord:{ok:false,responseTime:0},
    zuzu_rest_website:{ok:false,responseTime:0},
    yuu_pm_host:{ok:false,responseTime:0},
  })

  useEffect(()=>{
    const fetchStatus=async()=>{
      try{
        const res=await fetch("/api/status")
        if(res.ok){
          const data=await res.json()
          setServices(data)
        }
      }catch(err){
        console.error("failed to fetch")
      }finally{
        setLoading(false)
      }
    }
    fetchStatus()
  },[])

  return(
    <motion.div
      initial={{opacity:0,y:8}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.3,ease:[0.22,1,0.36,1]}}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Status</h1>
        <p className="text-xs text-zinc-500 flex items-center gap-2">
          <Clock className="w-3 h-3"/>updated just now
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">bliss.surf</h2>
            <a href="https://bliss.surf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <ExternalLink className="w-4 h-4 text-zinc-600 dark:text-zinc-400"/>
            </a>
          </div>
          <Row ok={services.bliss_surf_website.ok} loading={loading} label="Website" responseTime={services.bliss_surf_website.responseTime}/>
          <Row ok={services.bliss_surf_discord.ok} loading={loading} label="Discord API" responseTime={services.bliss_surf_discord.responseTime}/>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">zuzu.rest</h2>
            <a href="https://zuzu.rest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <ExternalLink className="w-4 h-4 text-zinc-600 dark:text-zinc-400"/>
            </a>
          </div>
          <Row ok={services.zuzu_rest_website.ok} loading={loading} label="Website" responseTime={services.zuzu_rest_website.responseTime}/>
          <Row ok={services.yuu_pm_host.ok} loading={loading} label="Host" responseTime={services.yuu_pm_host.responseTime}/>
        </div>
      </div>
    </motion.div>
  )
}
