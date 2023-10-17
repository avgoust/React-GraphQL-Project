import { Link } from "react-router-dom"
import niki from "../niki.png"
import image from "../image.png"
import { Menu, MenuProps } from "antd"


function NavBar() {

    const items: MenuProps["items"] = [
        {
            label: (
                <Link to="/Users">
                    <img src={image} alt="Logo logo" width={100} height={70} className="navbar-logo"/>"
                </Link>
            ),
            key: 'logo',
        },
        {
            label: (
                <Link to="/Users">
                    <div className="navbar-item">
                        Users
                    </div>
                </Link>
            ),
            key: 'users',
        },
        {
            label: (
                <Link to="/Import">
                    <div className="navbar-item">
                        Import
                    </div>
                </Link>
            ),
            key: 'import',
        },
        {
            label: (
                <Link to="/Export">
                    <div className="navbar-item">
                        Export
                    </div>
                </Link>
            ),
            key: 'export',
        },
    ]

    return (
        <>
            <Menu className="navbar"
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={items}
            >
            </Menu>
        </>
    )
}
export default NavBar;