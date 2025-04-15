"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Movie Enthusiast",
      content:
        "This website has completely transformed how I discover new films. The recommendations are spot-on and I love the detailed information provided for each movie.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Film Student",
      content:
        "As a film student, I rely on accurate and comprehensive movie data. This platform delivers exactly that, with an intuitive interface that makes research a breeze.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Casual Viewer",
      content:
        "I used to struggle finding movies to watch on weekends. Now, I just check the trending section and always find something interesting. Great job!",
      rating: 4,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    if (!isAutoplay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoplay, testimonials.length])

  const handlePrev = () => {
    setIsAutoplay(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoplay(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="w-full py-12 md:py-24 bg-black/5 dark:bg-white/5 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover why movie enthusiasts love our platform
            </p>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-4xl">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <Card
                    key={testimonial.id}
                    className="w-full flex-shrink-0 bg-background/50 backdrop-blur-sm border-none shadow-lg"
                  >
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <blockquote className="border-l-4 border-primary pl-4 italic">
                          "{testimonial.content}"
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-12 left-0 right-0 flex justify-center space-x-2 pt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    activeIndex === index ? "w-8 bg-primary" : "bg-muted"
                  }`}
                  onClick={() => {
                    setIsAutoplay(false)
                    setActiveIndex(index)
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-background shadow-lg md:-left-6"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-background shadow-lg md:-right-6"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
