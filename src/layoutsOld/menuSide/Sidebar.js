import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Sidebar.css'
import { Box } from '@mui/material'
import User from '../../libraries/navbar_v1/plaginNavbar/user'
import Mail from '../../libraries/navbar_v1/plaginNavbar/mail'
import Notification from '../../libraries/navbar_v1/plaginNavbar/notification'
import SizeAvatars from './logo'


const Sidebar = () => {
    const [selectedLink, setSelectedLink] = useState(null)

    const linksGraves = [
        {
            title: 'ניהול קברים', url: 'Cemetery', child: [
                { title: 'בתי עלמין', url: 'Cemetery' },
                { title: 'גושים', url: 'Block' },
                { title: 'חלקות', url: 'Plot' },
                { title: 'תאי קבורה', url: 'AreaGrave' },
            ]
        }
    ]

    const linksCustomers = [
        {
            title: 'לקוחות', url: 'purchases', child: [
                { title: 'רכישה', url: 'purchases' },
                { title: 'קבורה', url: 'burial' }
            ]
        }
    ]

    const linksReports = [
        {
            title: 'דוחות', url: 'reports', child: [
                { title: 'reports', url: 'reports-test' }
            ]
        }
    ]

    const links = [
        linksGraves, linksCustomers, linksReports,
        { title: 'Home', url: 'home' },
        { title: 'About', url: 'about' },
    ]

    return (
        <div
            className="container-bady"
        >
            {/* <div className="sidebar" >
                <SizeAvatars />
                <ul>
                    {
                        links.map((link, index) => {
                            return <li key={index}>
                                {
                                    Array.isArray(link) ? (
                                        <ul>
                                            {
                                                link.map((item, i) => {
                                                    return (
                                                        <li key={i}>
                                                            <div className={`div-link ${(selectedLink === item?.url && !item?.child?.some(childItem => childItem.url === selectedLink))
                                                                ? 'selected-link' : ''}`}>
                                                                <Link
                                                                    to={item?.url}
                                                                    onClick={() => setSelectedLink(item?.url)}
                                                                >
                                                                    {item?.title}
                                                                </Link>
                                                            </div>
                                                            {
                                                                (item?.child?.some(childItem => childItem.url === selectedLink) || (item?.url === selectedLink)) &&
                                                                <ul>
                                                                    {
                                                                        item?.child.map((item, i) => {
                                                                            return (
                                                                                <li key={i}>
                                                                                    <div className={`div-link-san ${selectedLink === item?.url ? 'selected-link' : ''}`}>
                                                                                        <Link
                                                                                            to={item?.url}
                                                                                            onClick={() => setSelectedLink(item?.url)}
                                                                                        >
                                                                                            {item?.title}
                                                                                        </Link>
                                                                                    </div>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                    <li className="menu-separator"></li>
                                                                </ul>
                                                            }
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    ) : (
                                        <div className={`div-link ${selectedLink === link?.url ? 'selected-link' : ''}`}>
                                            <Link to="home" onClick={() => setSelectedLink(link?.url)}>
                                                {link?.title}
                                            </Link>
                                        </div>
                                    )
                                }
                            </li>

                        })
                    }
                    <li>
                        <div className={`div-link ${selectedLink === 'cemetery2' ? 'selected-link' : ''}`}>
                            <Link
                                to="cemetery2"
                                onClick={() => setSelectedLink('cemetery2')}
                            >
                                Old בתי עלמין
                            </Link>
                        </div>
                        {(selectedLink === 'cemetery2' || selectedLink === 'blocks2' || selectedLink === 'plot2' || selectedLink === 'burialGround2') &&
                            <ul>
                                <li>
                                    <div className={`div-link-san ${selectedLink === 'blocks2' ? 'selected-link' : ''}`}>
                                        <Link
                                            to="blocks2"
                                            onClick={() => setSelectedLink('blocks2')}
                                        >
                                            גושים
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={`div-link-san ${selectedLink === 'plot2' ? 'selected-link' : ''}`}>
                                        <Link
                                            to="plot2"
                                            onClick={() => setSelectedLink('plot2')}
                                        >
                                            חלקות
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={`div-link-san ${selectedLink === 'burialGround2' ? 'selected-link' : ''}`}>
                                        <Link
                                            to="burialGround2"
                                            onClick={() => setSelectedLink('burialGround2')}
                                        >
                                            תאי קבורה
                                        </Link>
                                    </div>
                                </li>
                                <li className="menu-separator"></li>
                            </ul>
                        }
                    </li>
                </ul>
            </div> */}
            {/* כותרת */}
            {/* <div className="content">
                <div className='title' >
                    <div className="container-nav">
                        <div className="column left">
                            <span>ברוך הבא מלכיאל</span>

                            <span>עורך</span>
                        </div>
                        <div className="column center"></div>
                        <div className="column right">

                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <Mail />
                                <Notification />
                            </Box>

                            <User />
                        </div>
                    </div>
                </div>
                <div className="content-bady">
                    <Outlet />
                </div>
            </div> */}
        </div>
    )
}

export default Sidebar
