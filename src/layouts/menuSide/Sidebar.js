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

    return (
        <div
            className="container-bady"
        >
            <div className="sidebar" >
                <SizeAvatars />
                <ul>
                    <li>
                        <div className={`div-link ${selectedLink === 'Graves' ? 'selected-link' : ''}`}>
                            <Link
                                to="Graves"
                                onClick={() => setSelectedLink('Graves')}
                            >
                                ניהול קברים
                            </Link>
                        </div>
                        {(selectedLink === 'Graves' || selectedLink === 'Cemetery' || selectedLink === 'Block' || selectedLink === 'Plot' || selectedLink === 'AreaGrave') &&
                            <>
                                <li>
                                    <div className={`div-link-san ${selectedLink === 'Cemetery' ? 'selected-link' : ''}`}>
                                        <Link
                                            to="Cemetery"
                                            onClick={() => setSelectedLink('Cemetery')}
                                        >
                                            בתי עלמין
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={`div-link-san ${selectedLink === 'Block' ? 'selected-link' : ''}`}>
                                        <Link
                                            to="Block"
                                            onClick={() => setSelectedLink('Block')}
                                        >
                                            גושים
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={`div-link-san ${selectedLink === 'Plot' ? 'selected-link' : ''}`}>
                                        <Link
                                            to="Plot"
                                            onClick={() => setSelectedLink('Plot')}
                                        >
                                            חלקות
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={`div-link-san ${selectedLink === 'AreaGrave' ? 'selected-link' : ''}`}>
                                        <Link
                                            to="AreaGrave"
                                            onClick={() => setSelectedLink('AreaGrave')}
                                        >
                                            תאי קבורה
                                        </Link>
                                    </div>
                                </li>
                                <li className="menu-separator"></li>
                            </>
                        }
                    </li>
                    <li>
                        <div className={`div-link ${selectedLink === 'customers' ? 'selected-link' : ''}`}>
                            <Link
                                to="customers"
                                onClick={() => setSelectedLink('customers')}
                            >
                                לקוחות
                            </Link>
                        </div>
                        {(selectedLink === 'customers' || selectedLink === 'purchases' || selectedLink === 'burial') &&
                            <>
                                <li>
                                    <div className={`div-link-san ${selectedLink === 'purchases' ? 'selected-link' : ''}`}>
                                        <Link
                                            to="purchases"
                                            onClick={() => setSelectedLink('purchases')}
                                        >
                                            רכישה
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className={`div-link-san ${selectedLink === 'burial' ? 'selected-link' : ''}`}>
                                        <Link
                                            to="burial"
                                            onClick={() => setSelectedLink('burial')}
                                        >
                                            קבורה
                                        </Link>
                                    </div>
                                </li>
                                <li className="menu-separator"></li>
                            </>
                        }
                    </li>
                    <li>
                        <div className={`div-link ${selectedLink === 'reports' ? 'selected-link' : ''}`}>
                            <Link
                                to="reports"
                                onClick={() => setSelectedLink('reports')}
                            >
                                דוחות
                            </Link>
                        </div>
                        {(selectedLink === 'reports' || selectedLink === 'reports-test') &&
                            <>
                                <li>
                                    <div className={`div-link-san ${selectedLink === 'reports-test' ? 'selected-link' : ''}`}>
                                        <Link
                                            to="reports-test"
                                            onClick={() => setSelectedLink('reports-test')}
                                        >
                                            reports-test
                                        </Link>
                                    </div>
                                </li>
                            </>
                        }
                    </li>
                    <li>
                        <div className={`div-link ${selectedLink === 'home' ? 'selected-link' : ''}`}>
                            <Link
                                to="home"
                                onClick={() => setSelectedLink('home')}
                            >
                                Home
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className={`div-link ${selectedLink === 'about' ? 'selected-link' : ''}`}>
                            <Link
                                to="about"
                                onClick={() => setSelectedLink('about')}
                            >
                                About
                            </Link>
                        </div>
                    </li>
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
                            <>
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
                            </>
                        }
                    </li>
                </ul>
            </div>
            {/* כותרת */}
            <div className="content">
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
            </div>
        </div>
    )
}

export default Sidebar
