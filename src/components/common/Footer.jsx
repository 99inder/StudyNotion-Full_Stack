import React from 'react'
import { FooterLink2 } from '../../data/footer-links'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { FaFacebook, FaYoutube } from "react-icons/fa"
import { ImGoogle3, ImTwitter } from "react-icons/im"

const Footer = () => {

  const company = [
    {
      title: 'About',
      link: '/about'
    },
    {
      title: 'Careers',
      link: '/careers'
    },
    {
      title: 'Affiliates',
      link: '/affiliates'
    },
  ]

  const resources = [
    {
      title: 'Articles',
      link: '/articles'
    },
    {
      title: 'Blog',
      link: '/blog'
    },
    {
      title: 'Chart Sheet',
      link: '/chart_sheet'
    },
    {
      title: 'Code Challenges',
      link: '/code_challenges'
    },
    {
      title: 'Docs',
      link: '/docs'
    },
    {
      title: 'Projects',
      link: '/projects'
    },
    {
      title: 'Videos',
      link: '/videos'
    },
    {
      title: 'Workspaces',
      link: '/workspaces'
    },
  ]

  const support = [{ title: "Help Center", link: "/help" }]

  const plans = [
    {
      title: "Paid Memberships",
      link: "/paid_memberships"
    },
    {
      title: "For Students",
      link: "/for_students"
    },
    {
      title: "Business Solutions",
      link: "/business_solutions"
    },
  ]

  const community = [
    {
      title: "Forums",
      link: "/forums"
    },
    {
      title: "Chapters",
      link: "/chapters"
    },
    {
      title: "Events",
      link: "/events"
    },
  ]

  return (
    <div className='w-full bg-richblack-800'>

      <div className='w-11/12 max-w-maxContent mx-auto'>

        <div className='text-richblack-400 md:flex justify-between pt-14 pb-8'>

          {/* LEFT SECTION */}
          <div className='basis-1/2 flex flex-wrap gap-20 md:gap-0 md:justify-between md:pr-[3.25rem]'>
            {/* COLUMN 1 */}
            <div className='basis-1/6'>
              <img src={Logo} alt="smalLogo.png" className=' w-40' />
              <p className='text-richblack-100 mt-3 font-semibold'>Company</p>
              <ul className='mt-3 text-sm'>
                {
                  company.map((e, i) => (
                    <li key={i} className='mt-2'>
                      <Link to={e.link}>{e.title}</Link>
                    </li>
                  ))
                }
              </ul>

              {/* SOCIAL LINKS */}
              <div className='flex gap-4 mt-5 text-xl'>
                <Link to="#">
                  <FaFacebook />
                </Link>

                <Link to="#">
                  <ImGoogle3 />
                </Link>

                <Link to="#">
                  <ImTwitter />
                </Link>

                <Link to="#">
                  <FaYoutube />
                </Link>
              </div>
            </div>

            {/* COLUMN 2 */}
            <div className='basis-1/6'>
              <div>
                <p className='text-richblack-100 font-semibold'>Resources</p>
                <ul className='mt-3 text-sm'>
                  {
                    resources.map((e, i) => (
                      <li key={i} className='mt-2'>
                        <Link to={e.link}>{e.title}</Link>
                      </li>
                    ))
                  }
                </ul>
              </div>

              <div className='mt-9'>
                <p className='text-richblack-100 font-semibold'>Support</p>
                <ul className='mt-3 text-sm'>
                  {
                    support.map((e, i) => (
                      <li key={i} className='mt-2'>
                        <Link to={e.link}>{e.title}</Link>
                      </li>
                    ))
                  }
                </ul>
              </div>

            </div>

            {/* COLUMN 3 */}
            <div className='md:basis-1/6 flex gap-20 basis-[100%] md:block'>
              <div>
                <p className='text-richblack-100 font-semibold'>Plans</p>
                <ul className='mt-3 text-sm'>
                  {
                    plans.map((e, i) => (
                      <li key={i} className='mt-2'>
                        <Link to={e.link}>{e.title}</Link>
                      </li>
                    ))
                  }
                </ul>
              </div>

              <div className='md:mt-9 ml-2 md:ml-0'>
                <p className='text-richblack-100 font-semibold'>Community</p>
                <ul className='mt-3 text-sm'>
                  {
                    community.map((e, i) => (
                      <li key={i} className='mt-2'>
                        <Link to={e.link}>{e.title}</Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className='basis-1/2 flex flex-wrap md:justify-between gap-20 md:gap-0 md:border-l-[1px] border-l-richblack-700 md:pl-[3.25rem] mt-[49px] md:mt-0'>
            {
              FooterLink2.map((e, i) => (
                <div key={i}>
                  <p className='text-richblack-100 font-semibold text-base'>{e.title}</p>
                  <ul className='mt-3 text-sm'>
                    {
                      e.links.map((e, i) => (
                        <li key={i} className='mt-2'>
                          <Link to={e.link}>{e.title}</Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className='flex flex-col md:flex-row items-center justify-between text-richblack-300 pt-8 pb-12 border-t-[1px] border-t-richblack-700 text-sm font-medium gap-y-3'>
          {/* LEFT */}
          <div className='flex gap-5'>
            <Link to="/privacy_policy">Privacy Policy</Link>
            <Link to="/cookie_policy">Cookie Policy</Link>
            <Link to="/terms">Terms</Link>
          </div>
          {/* RIGHT */}
          <div>
            <p>Made with <span className=' text-pink-200'>♥</span> © 2023 Studynotion</p>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Footer