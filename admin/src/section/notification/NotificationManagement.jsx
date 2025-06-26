import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import SortTable from "../../component/table/SortTable";
import { Dialog, DialogContent } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SendNotification from "../../component/notification/SendNotification";
import { deleteNotification, getAllNotification } from "../../component/services/notificationService";
import moment from "moment";
import Delete from "../../component/action/Delete";
import Paging from "../../component/table/Paging";

const NotificationManagement = () => {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showNotificationSend, setShowNotificationSend] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(8);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const notificationColumns = [
        { key: "id", label: "No." },
        { key: "title", label: "Title" },
        { key: "content", label: "Content" },
        { key: "sentAt", label: "Send Time" },
        { key: "status", label: "Status" },
        { key: "userId", label: "To User" },

    ];
      const handlePage = (numberOfPage) => {
        setPage(numberOfPage)
  }
    const closeDetailModal = () => setShowDetailModal(false);
    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };
    const openDetailModal = () => {
        setShowDetailModal(true);
    };
    const closeDeleteModal = () => setShowDeleteModal(false);

    const handleNotificationSelect = (notification) => {
        setSelectedNotification(notification);
    };

    const openNotificationSend = () => {
        setShowNotificationSend(true);
    };
    const closeNotificationSend = () => {
        setShowNotificationSend(false);
    };
    const handleSort = (sortedArray) => {
        setNotifications(sortedArray);
    };
    const deleteNotificationData = async () => {
        try {
            const response = await deleteNotification(selectedNotification.id);
            if (response === 204) {
                toast.success("Notification deleted successfully!");
                setLoading(false);
            }
            closeDeleteModal();
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const fetchAllNotifications = async () => {
            try {
                const response = await getAllNotification(page, size);
                console.log("rev notifications", response);
                if (response) {
                    setNotifications(response.content);
                    setTotalPages(response.totalPages);
                    setLoading(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllNotifications();
    }, [loading,page])
    return (<>
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
                                        onClick={openNotificationSend}
                                        type="button"
                                        class="btn btn-primary btn-sm"
                                    >
                                        <i className="material-icons">&#xE147;</i> <span>Send</span>
                                    </button>
                            
                                </div>
                            </div>
                        </div>
                    </div>
                    <SortTable
                        products={notifications}
                        onSort={handleSort}
                        columns={notificationColumns}
                        onProductSelect={handleNotificationSelect}
                        openDetailModal={openDetailModal}
                        openDeleteModal={openDeleteModal}
                        selectedCategory={selectedNotification}
                        tableName={"notification"}
                    />
                </div>
                {totalPages > 0 ? (<Paging handlePage={handlePage} totalPages={totalPages} selectedPage={page} />) : (<p>Loading...</p>)}
            </div>
        </div>
      {showDetailModal && (
        <div
          class="modal show bd-example-modal-lg"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <table class="table table-bordered modalDetail">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>title</th>
                    <th>content</th>
                    <th>send time</th>
                    <th>status</th>
                    <th>to user</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
             
                    <td>{selectedNotification.id}</td>
                    <td>{selectedNotification.title}</td>
                    <td>{selectedNotification.content}</td>
                    <td>{moment(selectedNotification.sentAt).format('Do MMMM YYYY')}</td>
                    <td>{selectedNotification.status}</td>
                    <td>{selectedNotification.userId}</td>
                    <td>
                      <button
                        onClick={closeDetailModal}
                        class="btn btn-danger btn-sm rounded-0"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
                                    
        {showDeleteModal && (
            <Delete
                closeDeleteModal={closeDeleteModal}
                selectedProduct={selectedNotification}
                handleDeleteproduct={deleteNotificationData}
                table={"notification"}
                fullScreen={fullScreen}
            />
        )}
        {
            showNotificationSend && (
                <Dialog
                    fullScreen={fullScreen}
                    open={showNotificationSend}
                    onClose={closeNotificationSend}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        <SendNotification setIsSend={setLoading}/>
                    </DialogContent>
                </Dialog>
            )
        }
         
    </>);
}

export default NotificationManagement;