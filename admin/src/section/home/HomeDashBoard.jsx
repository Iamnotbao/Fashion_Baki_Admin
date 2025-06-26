import { useEffect, useState } from "react";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { exportReport, reportProductPerDate, reportProductPerMonth, reportStats } from "../../component/services/reportService";
import Dropdown from "../../component/table/Dropdown";
import ChartSucess from "../../assets/images/logo/chart-success.png";
import Wallet from "../../assets/images/logo/wallet.png";
import Man from "../../assets/images/logo/man.png";
import ChartByMonth from "../../component/table/ChartMonthlyRevenue";
import ChartByDate from "../../component/table/ChartDailyRevenue";
import "../home/HomeDashBoard.css";
import Momo from "../../assets/images/logo/momo.jpg";
import COD from "../../assets/images/logo/cod.png";

const HomeDashBoard = () => {
    const [dataByMonth, setdataByMonth] = useState([]);
    const [dataByDate, setdataByDate] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const [stompClient, setStompClient] = useState(null);
    const [discountCode, setDiscountCode] = useState('');
    const [originalPrice, setOriginalPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    const username = 'admin';
    const password = 'admin123';


    const api_url = import.meta.env.VITE_API_URL;
    const webSocket = import.meta.env.VITE_WEBSOCKET_URL;

    const url = new URL(api_url);
    url.pathname = webSocket;

    // useEffect(() => {
    //     const socket = new SockJS(webSocket);
    //     const client = new Client({
    //       webSocketFactory: () => socket,
    //       connectHeaders: {
    //         login: username,
    //         passcode: password,
    //       },
    //       debug: (str) => console.log(str),
    //       reconnectDelay: 5000,
    //       heartbeatIncoming: 4000,
    //       heartbeatOutgoing: 4000,
    //     });

    //     client.onConnect = () => {
    //       console.log('Connected to WebSocket');
    //       client.subscribe(`${api_url}/discount-codes`, (message) => {
    //         const response = JSON.parse(message.body);
    //         setOriginalPrice(response.originalPrice);
    //         setDiscountedPrice(response.discountedPrice);
    //         setMessage(response.message);
    //         setError('');
    //       });
    //     };

    //     client.onStompError = (frame) => {
    //       console.error('STOMP error:', frame);
    //       setError('WebSocket connection failed');
    //     };

    //     client.activate();
    //     setStompClient(client);

    //     return () => {
    //       if (client) {
    //         client.deactivate();
    //       }
    //     };
    //   }, []);




    const fetchReportByMonth = async () => {
        const result = await reportProductPerMonth(year);
        if (result) {
            setdataByMonth(result);
            setLoading(true);
        }
    }
    const fetchReportStats = async () => {
        const result = await reportStats();
        if (result) {
            setStats(result);
        }
    }
    const fetchReportByDate = async () => {
        const result = await reportProductPerDate(month, year);
        if (result) {
            setdataByDate(result);
            setLoading(true);
        }

    }
    const fetchExportReport = async () => {
        try {
            setIsExporting(true);
            const result = await exportReport();

        } catch (error) {
            console.error("Export failed:", error);

        } finally {
            setIsExporting(false);
        }
    };
    useEffect(() => {
        fetchReportByMonth();
        fetchReportStats();
    }, [])
    useEffect(() => {
        if (month && year) {
            fetchReportByDate();
        }
    }, [month, year])
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <div className="layout-page">
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row">
                                    <div className="col-xxl-8 mb-6 order-0">
                                        <div className="card">
                                            <div className="d-flex align-items-start row">
                                                <div className="col-sm-7">
                                                    <div className="card-body">
                                                        <h5 className="card-title text-primary mb-3">Congratulations Baki! 🎉</h5>
                                                        <p className="mb-6">
                                                            You have done 72% more sales today.<br />Check your new badge in your profile.
                                                        </p>

                                                        <a href="javascript:;" className="btn btn-sm btn-outline-primary">View Badges</a>
                                                    </div>
                                                </div>
                                                <div className="col-sm-5 text-center text-sm-left">
                                                    <div className="card-body pb-0 px-0 px-md-6">
                                                        <img
                                                            src={Man}
                                                            height="175"
                                                            className="scaleX-n1-rtl"
                                                            alt="View Badge User" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 order-1">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12 col-6 mb-6">
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                                            <div className="payments">
                                                                <img
                                                                    src={ChartSucess}
                                                                    alt="chart success"
                                                                    className="payment-method" />
                                                            </div>
                                                            <div className="dropdown">
                                                                <button
                                                                    className="btn p-0"
                                                                    type="button"
                                                                    id="cardOpt3"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false">
                                                                    <i className="bx bx-dots-vertical-rounded text-muted"></i>
                                                                </button>
                                                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                                                    <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="mb-1">Total Revenue</p>
                                                        <h4 className="card-title mb-3">${stats?.TotalRevenue?.thisMonthRevenue && (stats.TotalRevenue.thisMonthRevenue)}</h4>
                                                        <small className="text-success fw-medium"><i className="bx bx-up-arrow-alt"></i> {stats?.TotalRevenue?.percentChange && (stats.TotalRevenue.percentChange)}%</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-6 mb-6">
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                                                <div className="payments">
                                                                    <img
                                                                        src={Wallet}
                                                                        alt="wallet info"
                                                                        className="payment-method" />
                                                                </div>
                                                            <div className="dropdown">
                                                                <button
                                                                    className="btn p-0"
                                                                    type="button"
                                                                    id="cardOpt6"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false">
                                                                    <i className="bx bx-dots-vertical-rounded text-muted"></i>
                                                                </button>
                                                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                                                                    <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="mb-1">Sales</p>
                                                        <h4 className="card-title mb-3">${stats?.TotalQuantitySold?.thisMonthQuantity && (stats.TotalQuantitySold.thisMonthQuantity)}</h4>
                                                        <small className="text-success fw-medium"><i className="bx bx-up-arrow-alt"></i> {stats?.TotalQuantitySold?.percentChange && (stats.TotalQuantitySold.percentChange)}%</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-xxl-8 order-2 order-md-3 order-xxl-2 mb-6">
                                        <div className="card">
                                            <div className="row row-bordered g-0">
                                                <div className="col-lg-12">
                                                    <div className="card-header d-flex align-items-center justify-content-between">
                                                        <div className="card-title mb-0">
                                                            <h5 className="m-0 me-2">Total Revenue</h5>
                                                        </div>
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn p-0"
                                                                type="button"
                                                                id="totalRevenue"
                                                                data-bs-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="false">
                                                                <i className="bx bx-dots-vertical-rounded bx-lg text-muted"></i>
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="totalRevenue">
                                                                <a className="dropdown-item" href="javascript:void(0);">Select All</a>
                                                                <a className="dropdown-item" href="javascript:void(0);">Refresh</a>
                                                                <a
                                                                    className={`dropdown-item ${isExporting ? 'disabled' : ''}`}
                                                                    onClick={!isExporting ? fetchExportReport : undefined}
                                                                >
                                                                    {isExporting ? (
                                                                        <>
                                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                            Exporting...
                                                                        </>
                                                                    ) : (
                                                                        'Export'
                                                                    )}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="totalRevenueChart" className="px-3">
                                                        <div className="selectDate">
                                                            <Dropdown month={month} year={year} setYear={setYear} setMonth={setMonth} />
                                                        </div>
                                                        <div className="container-xxl">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    {loading ? (<ChartByMonth dataset={dataByMonth} />) : (<p>Loading....</p>)}
                                                                </div>
                                                                <div className="col-md-6">
                                                                    {loading ? (<ChartByDate dataset={dataByDate} />) : (<p>Loading....</p>)}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-8 col-lg-12 col-xxl-4 order-3 order-md-2">
                                        <div className="row">
                                            <div className="col-6 mb-6">
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                                            <div className="payments">
                                                                <img src={Momo} alt="momo" className="payment-method" />
                                                            </div>
                                                            <div className="dropdown">
                                                                <button
                                                                    className="btn p-0"
                                                                    type="button"
                                                                    id="cardOpt4"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false">
                                                                    <i className="bx bx-dots-vertical-rounded text-muted"></i>
                                                                </button>
                                                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt4">
                                                                    <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="mb-1">Payments</p>
                                                        <h4 className="card-title mb-3">${stats?.MOMO?.thisMonthRevenue && (stats.MOMO.thisMonthRevenue)}</h4>
                                                        <small className="text-danger fw-medium"><i className="bx bx-down-arrow-alt"></i> {stats?.MOMO?.percentChange && (stats.MOMO.percentChange.toFixed(2))}%</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 mb-6">
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                                            <div className="payments">
                                                                <img src={COD} alt="COD" className="payment-method" />
                                                            </div>
                                                            <div className="dropdown">
                                                                <button
                                                                    className="btn p-0"
                                                                    type="button"
                                                                    id="cardOpt1"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false">
                                                                    <i className="bx bx-dots-vertical-rounded text-muted"></i>
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                                                    <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="mb-1">Transactions</p>
                                                        <h4 className="card-title mb-3">${stats?.COD?.thisMonthRevenue && (stats.COD.thisMonthRevenue)}</h4>
                                                        <small className="text-success fw-medium"><i className="bx bx-up-arrow-alt"></i> {stats?.COD?.percentChange && (stats.COD.percentChange)}%</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 mb-6">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between align-items-center flex-sm-row flex-column gap-10">
                                                            <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                                                <div className="card-title mb-6">
                                                                    <h5 className="text-nowrap mb-1">Profile Report</h5>
                                                                    <span className="badge bg-label-warning">YEAR 2022</span>
                                                                </div>
                                                                <div className="mt-sm-auto">
                                                                    <span className="text-success text-nowrap fw-medium"
                                                                    ><i className="bx bx-up-arrow-alt"></i> 68.2%</span
                                                                    >
                                                                    <h4 className="mb-0">$84,686k</h4>
                                                                </div>
                                                            </div>
                                                            <div id="profileReportChart"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-backdrop fade"></div>
                        </div>

                    </div>

                </div>


                <div className="layout-overlay layout-menu-toggle"></div>
            </div>

        </>)

}
export default HomeDashBoard