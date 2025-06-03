import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Star, TrendingUp, Film, Laugh, Zap, Palette } from "lucide-react"

export default function Home() {
  const categories = [
    {
      name: "Comedy",
      icon: Laugh,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10 hover:bg-yellow-500/20",
      borderColor: "border-yellow-500/30 hover:border-yellow-500/50",
    },
    {
      name: "Horror",
      icon: Film,
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-500/10 hover:bg-red-500/20",
      borderColor: "border-red-500/30 hover:border-red-500/50",
    },
    {
      name: "Action",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10 hover:bg-blue-500/20",
      borderColor: "border-blue-500/30 hover:border-blue-500/50",
    },
    {
      name: "Animation",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10 hover:bg-purple-500/20",
      borderColor: "border-purple-500/30 hover:border-purple-500/50",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Cine<span className="text-red-600">Dark</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-red-500">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-red-600 hover:bg-red-700 text-white">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">Unlimited movies, TV shows, and more.</h1>
            <p className="text-xl text-gray-300">
              Watch anywhere. Cancel anytime. Stream your favorite content in high quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl shadow-red-900/20">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
            <img src="/images/backdrops/sekawanlimos1.webp" alt="Featured movie" className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6 z-20">
              <h3 className="text-2xl font-bold">Sekawan Limo</h3>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm">9.6/10</span>
                <span className="text-sm text-gray-400">2024</span>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose CineDark?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">HD Streaming</h3>
            <p className="text-gray-400">Enjoy your favorite movies and TV shows in high definition quality.</p>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Latest Releases</h3>
            <p className="text-gray-400">Get access to the latest movies and TV shows as soon as they're available.</p>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Personalized Watchlist</h3>
            <p className="text-gray-400">Create your own watchlist to keep track of what you want to watch next.</p>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container mx-auto px-4 py-20 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <div
                key={category.name}
                className={`group relative p-6 rounded-xl border transition-all duration-300 cursor-default ${category.bgColor} ${category.borderColor}`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">Explore {category.name.toLowerCase()} movies</p>
                  </div>
                </div>

                {/* Hover effect */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="text-2xl font-bold text-white">
                Cine<span className="text-red-600">Dark</span>
              </Link>
              <p className="text-gray-400 mt-2">Your ultimate movie streaming platform</p>
            </div>
            <div className="flex gap-8">
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2024 CineDark. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
