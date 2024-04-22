import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHome } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { MdTour } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";

export default function Component() {
    const { currentUser } = useSelector(state => state.user);

    return (
        <div className="flex h-screen">
            <div className="bg-gray-900 text-white w-64 p-6 flex flex-col">
                <div className="flex items-center mb-8">
                    <MdAdminPanelSettings className="h-8 w-8 mr-2" />

                    <span className="text-xl font-bold">Admin</span>
                </div>
                <nav className="flex-1 space-y-2">
                    <Link className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800">
                        <FaHome className="h-5 w-5 mr-2" />
                        <span>Home</span>
                    </Link>
                    <Link className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800">
                        <IoMdAnalytics className="h-5 w-5 mr-2" />
                        <span>Analytics</span>
                    </Link>
                    <Link className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800">
                        <FaUsers className="h-5 w-5 mr-2" />
                        <span>Customers</span>
                    </Link>
                    <Link className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800">
                        <FaUsersGear className="h-5 w-5 mr-2" />
                        <span>Guides</span>
                    </Link>
                    <Link className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800">
                        <MdTour className="h-5 w-5 mr-2" />
                        <span>Tours</span>
                    </Link>

                </nav>
            </div>
            <div className="flex-1 bg-gray-100 p-6">
                <header className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-gray-500">Welcome, {currentUser.name}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="rounded-full" size="icon" variant="outline">
                            {/* <SignalIcon className="h-6 w-6" /> */}
                        </button>
                        <button className="rounded-full" size="icon" variant="outline">
                            <img
                                alt="Avatar"
                                className="rounded-full"
                                height="32"
                                src={currentUser.photo}
                                style={{
                                    aspectRatio: "32/32",
                                    objectFit: "cover",
                                }}
                                width="32"
                            />
                        </button>
                    </div>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Total Revenue</CardTitle>
                <DollarSignIcon className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$45,231.89</div>
                <p className="text-gray-500 text-sm">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Subscriptions</CardTitle>
                <UsersIcon className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">+2350</div>
                <p className="text-gray-500 text-sm">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Sales</CardTitle>
                <CreditCardIcon className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">+12,234</div>
                <p className="text-gray-500 text-sm">+19% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Active Now</CardTitle>
                <ActivityIcon className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">+573</div>
                <p className="text-gray-500 text-sm">+201 since last hour</p>
              </CardContent>
            </Card> */}
                </div>
            </div>
        </div>
    )
}

