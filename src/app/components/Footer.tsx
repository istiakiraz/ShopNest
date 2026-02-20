import { Facebook, Github, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-indigo-200 md:rounded-t-[120px] ">
      <div className="px-4 pt-16 mx-auto w-11/12 lg:w-9/12 md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 items-center mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <div className="inline-flex -mt-16 items-center">
              <div className="lg:flex justify-center  items-end">
                <Image src='/shopnest.png' alt='shopnest_logo' width={160} height={20}/>
              </div>
            </div>
            <div className="-mt-8 lg:max-w-sm">
              <p className="text-sm text-gray-800">
               ShopNest is your ultimate online shopping destination, designed to make life easier and more stylish.
                Whether you’re looking for the latest fashion trends, premium gadgets, home essentials, or beauty products — ShopNest brings them all together under one digital roof.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-semibold tracking-wide text-gray-800">Links</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/order"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Order
                  </Link>
                </li>
                <li>
                  <Link
                    href="/checkout"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Checkout
                  </Link>
                </li>
               
              </ul>
            </div>
            <div>
              <p className="font-semibold tracking-wide text-gray-800">
                Contact Me
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    target="_blank"
                    href="mailto:istiakiraz@gmail.com"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Email me
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://istiakiraz.netlify.app/"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://thinktales.netlify.app/"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://mentilo.netlify.app/"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Mentilo 
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14598.796932347963!2d90.44081905902821!3d23.829291952152886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1749998277275!5m2!1sen!2sbd"
                width="350"
                className="mt-2 rounded-xl"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row">
          <p className="text-sm text-gray-600">
            © Copyright 2025 ShopNest Inc. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <Link target="_blank" href="https://github.com/istiakiraz">
              
              <Github size={25}></Github>
            </Link>
            <Link target="_blank" href="https://www.linkedin.com/in/istiakiraz/">
             
              <Linkedin size={25} ></Linkedin>
            </Link>
            <Link target="_blank" href="https://www.facebook.com/istiak.iraz">
            <Facebook size={25}></Facebook>
             
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
