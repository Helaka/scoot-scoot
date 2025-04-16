"use client"

import { useState, useEffect } from "react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frequent Rider",
    location: "Bali, Indonesia",
    text: "ScootScoot made my vacation so much more enjoyable! I was able to quickly find and rent a scooter near my hotel. The digital agreement process was super simple.",
  },
  {
    name: "Michael Chen",
    role: "Shop Owner",
    location: "Phuket, Thailand",
    text: "As a rental shop owner, ScootScoot has transformed how I manage my business. The dashboard gives me real-time insights, and the automated verification system has saved us countless hours.",
  },
  {
    name: "Alex Rodriguez",
    role: "Tour Guide",
    location: "Ho Chi Minh City, Vietnam",
    text: "I run scooter tours in the city, and ScootScoot has been a game-changer. The group booking feature and the ability to track all scooters in real-time has made my job so much easier.",
  },
]

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    // Set up testimonial slider
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    // Clean up
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 to-white/30 dark:from-purple-900/30 dark:to-gray-900/50 rounded-3xl blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Slider */}
          <div className="relative overflow-hidden rounded-2xl backdrop-blur-lg bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-purple-800/30 shadow-xl p-8 md:p-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 to-yellow-400/5 z-0"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 p-[2px] flex-shrink-0">
                  <div className="h-full w-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-purple-500"
                    >
                      <circle cx="12" cy="8" r="5" />
                      <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].location} • {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>

              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute -top-2 -left-2 h-8 w-8 text-purple-300 opacity-40"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
                <p className="mb-6 pl-4 text-lg italic">{testimonials[currentTestimonial].text}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full ${
                        currentTestimonial === index ? "bg-purple-600" : "bg-purple-300 dark:bg-purple-700"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
