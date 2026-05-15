"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram } from "lucide-react";

interface InstagramPost {
  id: string;
  image: string;
  link: string;
  likes?: number;
}

interface InstagramFeedProps {
  posts: InstagramPost[];
  username?: string;
}

export function InstagramFeed({ posts, username = "onoff.vn" }: InstagramFeedProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl">Theo dõi chúng tôi</h2>
          <a
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <Instagram size={16} />
            @{username}
          </a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
          {posts.slice(0, 6).map((post, i) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group aspect-square overflow-hidden bg-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Instagram
                  size={20}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
