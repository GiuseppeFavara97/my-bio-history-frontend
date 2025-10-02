"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardHome() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(true);


  useEffect(() => {
    let loading = true
    async function fetchData() {
      try {
        const res = await axios.get(`${API_URL}/api/auth/userID`, {
          withCredentials: true,
        });
        
        if (res.data.role === "doctor") {
        router.replace("/dashboard/doctor");
      } else if (res.data.role === "patient") {
        router.replace("/dahsboard/patient");
      }
        loading = false
      } catch (err:any) {
        if (err.status === 401) {
          router.replace("/login");
        }
      } finally {
        setLoading(false)
      }
      
    }
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return null;
}

