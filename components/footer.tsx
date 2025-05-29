"use client"

import type React from "react"

import { useState } from "react"
import { Film, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-red-500" />
              <h3 className="text-xl font-bold text-white">MovieStream</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for movies and TV shows. Stream the latest releases, discover hidden gems, and
              enjoy unlimited entertainment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Popular Movies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  TV Shows
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Bollywood
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  New Releases
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Top Rated
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Genres */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Popular Genres</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Comedy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Drama
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Horror
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Sci-Fi
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
            <p className="text-gray-400 text-sm">Subscribe to get notified about new releases and updates.</p>

            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-sm"
                required
              />
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-sm" disabled={subscribed}>
                {subscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4" />
                <span>support@moviestream.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4" />
                <span>123 Movie St, Cinema City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © 2024 MovieStream. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                DMCA
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>
              Disclaimer: This website does not store any files on its server. All contents are provided by
              non-affiliated third parties.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
