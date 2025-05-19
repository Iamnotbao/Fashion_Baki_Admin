import { useEffect } from "react";
import { connectWebSocket, disconnectWebSocket, sendNotification } from "../../component/services/notificationService";
import { ToastContainer } from "react-toastify";
const NotificationManagement = () => {
    useEffect(() => {
        connectWebSocket('1', (notification) => {
            console.log("Notification received:", notification);
        });
        return () => {
            disconnectWebSocket();
        }
    }, []);

      const notificationColumns = [
        { key: "id", label: "No." },
        { key: "title", label: "Content" },
        { key: "sendAt", label: "Time" },
        {key:"status", label:"Status Of Message"}

    ];

    const handleSend = () => {
        sendNotification({
            userId: '4',
            title: 'Test from admin',
            content: 'Marry Christmas',
        })
    }
    return (<>
        {/* <div>
            <h2>WebSocket Notification Tester</h2>
            <button onClick={handleSend}>Send Test Notification</button>
        </div> */}

        <div className="container-xl">
            <div className="table-responsive">
                <ToastContainer />
                <h1 style={{ textAlign: "center", marginBottom: "12px" }}>
                    Notification Management
                </h1>
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6"></div>
                            <div
                                className="col-sm-6"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <div class="input-group">
                                    <input
                                        type="search"
                                        class="form-control rounded"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="search-addon"
                                    />
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        data-mdb-ripple-init
                                    >
                                        <i class="fas fa-search"></i>
                                    </button>

                                </div>
                                <div
                                    class="input-group"
                                    style={{
                                        width: "340px",
                                        display: "flex",
                                        justifyContent: "end",
                                    }}
                                >
                                    <button
                                        onClick={openAddModal}
                                        type="button"
                                        class="btn btn-primary btn-sm"
                                    >
                                        <i className="material-icons">&#xE147;</i> <span>Add</span>
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal()}
                                        type="button"
                                        class="btn btn-danger btn-sm"
                                        style={{ marginLeft: "10px" }}
                                    >
                                        <i className="material-icons">&#xE15C;</i>{" "}
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <SortTable
                        products={discounts}
                        onSort={handleSort}
                        columns={notificationColumns}
                        // changeStatus={handleChangeStatus}
                        onProductSelect={handleDiscountSelect}
                        openDeleteModal={openDeleteModal}
                        tableName={"discount"}
                        openEditModal={openEditModal}
                    /> */}
                </div>
            </div>
        </div>


    </>);
}

export default NotificationManagement;