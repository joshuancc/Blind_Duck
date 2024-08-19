import React from 'react'
import { Link } from 'react-router-dom';

const SideBar = ({user}) => {
  return (
    <section className='SideBar'>
      <nav className="flex flex-col gap-4">
    < link href="/" className="mb-12 cursor-pointer items-center gap-2">

    </link>

      </nav>
    </section>
  )
}

export default SideBar
     /* <Image src="" width={34} height={34}/>*/
  /*    {sidebarLinks.map((item) => (
          <Link to={item.route} key={item.label} className="cursor-pointer">
            {item.label}
          </Link>
        ))} */