import Link from "next/link"
import Navbar from "@/components/navbar"
import { Film } from "lucide-react"

const categories = [
  {
    id: "comedy",
    name: "Comedy",
    description: "Laugh out loud with our collection of comedy films",
    count: 5,
    image: "/images/backdrops/kucing1.jpg",  
  },
  {
    id: "horror",
    name: "Horror",
    description: "Spine-chilling horror movies that will keep you up at night",
    count: 3,
    image: "/images/backdrops/horror.jpg",
  },
  {
    id: "action",
    name: "Action",
    description: "Adrenaline-pumping action films with explosive sequences",
    count: 4,
    image: "/images/backdrops/action.jpg",
  },
  {
    id: "animation",
    name: "Animation",
    description: "Animated features for all ages with stunning visuals",
    count: 4,
    image: "/images/backdrops/animation.jpg", 
  },
]

export default function Categories() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Categories</h1>
          <p className="text-gray-400">Browse movies by genre</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group relative rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-10"></div>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-35 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
                    <Film className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="text-sm text-gray-400">{category.count} movies</p>
                  </div>
                </div>
                <p className="text-gray-300">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
